import Ingrediente from "../models/Ingrediente.js";
import { validateObjectId, handleNotFoundError } from "../utils/index.js";

const creaIngrediente = async (request, response) => {
  const { nombre } = request.body;
  if (!nombre) {
    const error = new Error("El nombre del ingrediente es obligatorio");
    return response.status(400).json({
      msg: error.message
    });
  }
  try {
    const ingrediente = new Ingrediente(request.body);
    const result = await ingrediente.save();

    response.json({
      msg: "Ingrediente creado correctamente"
    });
  } catch (error) {
    if (error.code === 11000) {
      return response.status(400).json({
        msg: "El ingrediente ya existe"
      });
    } else {
      res.status(500).json({ msg: error.message });
    }
  }
};

const getIngredientes = async (request, response) => {
  try {
    const ingredientes = await Ingrediente.find()
    response.json(ingredientes)
  } catch (error) {
    console.log(error);
    
  }
};

/* getIngredienteById*/
const getIngredienteById = async (request, response) => {
  const { id } = request.params;

  if (validateObjectId(id, response)) return;

  const ingrediente = await Ingrediente.findById(id);

  if (!ingrediente) {
    return handleNotFoundError("El ingrediente no existe", response);
  }
  response.json(ingrediente);
};

/* getIngredienteByNombre */
const getIngredienteByNombre = async (request, response) => {
  const { palabra } = request.params;

  try {
    const ingredientes = await Ingrediente.find({
      nombre: {
        $regex: palabra,
        $options: "i"
      }
    });
    if (ingredientes.length === 0) {
      const error = new Error("No hay resultados");
      return response.status(404).json({ msg: error.message });
    }
    response.json(ingredientes);
  } catch (error) {
    console.log(error.message);
  }
};

/* updateIngrediente */
const updateIngrediente = async (request, response) => {
  const { id } = request.params;

  if (validateObjectId(id, response)) return;

  const ingrediente = await Ingrediente.findById(id);
  if (!ingrediente) {
    return handleNotFoundError("El ingrediente no existe", response);
  }

  ingrediente.nombre = request.body.nombre || ingrediente.nombre;
  ingrediente.descripcion = request.body.descripcion || ingrediente.descripcion;

  try {
    await ingrediente.save();
    response.json({ msg: "Ingrediente actualizado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const deleteIngrediente = async (request, response) => {
  const { id } = request.params;

  if (validateObjectId(id, response)) return;

  const ingrediente = await Ingrediente.findById(id);
  if (!ingrediente) {
    return handleNotFoundError("El ingrediente no existe", response);
  }
  try {
    await ingrediente.deleteOne()
    response.json({msg: "Ingrediente eliminado correctamente"})
  } catch (error) {
    console.log(error);
    
  }
  
}

export { creaIngrediente, getIngredientes, getIngredienteById, getIngredienteByNombre, updateIngrediente, deleteIngrediente };
