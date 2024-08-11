import Receta from "../models/Receta.js";
import RecetaIngrediente from "../models/RecetaIngrediente.js";
import { validateObjectId, handleNotFoundError } from "../utils/index.js";

const creaReceta = async (request, response) => {
  const { nombre, instrucciones, ingredientes } = request.body;
  const archivo = request.file; // El archivo subido estará en req.file

  try {
    const receta = new Receta({
      nombre,
      instrucciones,
      imagen: archivo ? archivo.filename : null // Guarda el nombre del archivo en la base de datos, si existe
    });
    const ingredientesParsed = JSON.parse(ingredientes);

    const recetaGuardada = await receta.save();
    const recetaIngredientes = ingredientesParsed.map(ing => ({
      receta: recetaGuardada._id,
      ingrediente: ing.id,
      cantidad: ing.cantidad
    }));
    await RecetaIngrediente.insertMany(recetaIngredientes);
    response.json(recetaGuardada);
  } catch (error) {
    console.log(error);
  }
};

const getRecetas = async (request, response) => {
  try {
    const recetas = await Receta.find();
    const recetaConIngredientes = [];

    for (const receta of recetas) {
      const recetaIngredientes = await RecetaIngrediente.find({ receta: receta._id }).populate({
        path: "ingrediente",
        select: "nombre"
      });
      // const recetaIngrediente = await RecetaIngrediente.find({ receta: receta._id }).populate("ingrediente");

      const ingredientes = recetaIngredientes.map(ri => ({
        nombre: ri.ingrediente.nombre,
        cantidad: ri.cantidad
      }));

      recetaConIngredientes.push({
        nombre: receta.nombre,
        instrucciones: receta.instrucciones,
        origen: receta.origen,
        imagen: receta.imagen,
        ingredientes
      });
    }

    response.json(recetaConIngredientes);
  } catch (error) {
    console.log(error);
  }
};

const getRecetaById = async (request, response) => {
  const { id } = request.params;
  const recetaConIngredientes = [];

  if (validateObjectId(id, response)) return;

  const receta = await Receta.findById(id);
  if (!receta) {
    return handleNotFoundError("No hay resultados", response);
  }
  const recetaIngredientes = await RecetaIngrediente.find({ receta: receta._id }).populate({
    path: "ingrediente",
    select: "nombre"
  });

  const ingredientes = recetaIngredientes.map(ri => ({
    nombre: ri.ingrediente.nombre,
    cantidad: ri.cantidad
  }));

  recetaConIngredientes.push({
    nombre: receta.nombre,
    instrucciones: receta.instrucciones,
    origen: receta.origen,
    imagen: receta.imagen,
    ingredientes
  });

  response.json(recetaConIngredientes);
};
const getRecetaByNombre = async (request, response) => {
  const { palabra } = request.params;
  const recetaConIngredientes = [];

  const recetas = await Receta.find({
    nombre: {
      $regex: palabra,
      $options: "i"
    }
  });

  for (const receta of recetas) {
    const recetaIngredientes = await RecetaIngrediente.find({ receta: receta._id }).populate({
      path: "ingrediente",
      select: "nombre"
    });
    const ingredientes = recetaIngredientes.map(ri => ({
      nombre: ri.ingrediente.nombre,
      cantidad: ri.cantidad
    }));

    recetaConIngredientes.push({
      nombre: receta.nombre,
      instrucciones: receta.instrucciones,
      origen: receta.origen,
      imagen: receta.imagen,
      ingredientes
    });
  }

  response.json(recetaConIngredientes);
};

/* updateReceta */
const updateReceta = async (request, response) => {
  const { id } = request.params;

  const recetaConIngredientes = [];

  if (validateObjectId(id, response)) return;

  const receta = await Receta.findById(id);
  if (!receta) {
    return handleNotFoundError("No existe esa receta", response);
  }
  const recetaIngredientes = await RecetaIngrediente.find({ receta: receta._id }).populate({
    path: "ingrediente",
    select: "nombre"
  });

  const ingredientes = recetaIngredientes.map(ri => ({
    nombre: ri.ingrediente.nombre,
    cantidad: ri.cantidad
  }));

  recetaConIngredientes.push({
    nombre: request.body.nombre || receta.nombre,
    instrucciones: request.body.instrucciones || receta.instrucciones,
    origen: request.body.origen || receta.origen,
    imagen: request.body.imagen || receta.imagen,
    ingredientes: request.body.ingredientes || ingredientes
  });

  try {
    await receta.save();
    response.json({ msg: "Receta actualizada correctamente" });
  } catch (error) {
    console.log(error);
  }
};
const deleteReceta = async (request, response) => {
  const { id } = request.params;

  if (validateObjectId(id, response)) return;

  const receta = await Receta.findById(id);
  if (!receta) {
    return handleNotFoundError("La receta no existe", response);
  }
  const recetaIngrediente = await RecetaIngrediente.find({ receta: receta._id }).populate("ingrediente");
  console.log(recetaIngrediente);

  try {
    await RecetaIngrediente.deleteMany({ receta: receta._id });
    await receta.deleteOne();
    response.json({ msg: "La receta se ha eliminado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export { creaReceta, getRecetas, getRecetaById, getRecetaByNombre, updateReceta, deleteReceta };
