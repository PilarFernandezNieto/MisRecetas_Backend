import Receta from "../models/Receta.js";
import RecetaIngrediente from "../models/RecetaIngrediente.js";
import { validateObjectId, handleNotFoundError } from "../utils/index.js";

const creaReceta = async (request, response) => {
  const { nombre, instrucciones, ingredientes } = request.body;

  try {
    const receta = new Receta({ nombre, instrucciones });
    const recetaGuardada = await receta.save();
    const recetaIngredientes = ingredientes.map(ing => ({
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
    const recetaConIngredientes = []

    for(const receta of recetas ){
        const recetaIngredientes = await RecetaIngrediente.find({receta: receta._id}).populate("ingrediente")
               
        const ingredientes = recetaIngredientes.map(ri => ({
            nombre: ri.ingrediente.nombre,
            cantidad: ri.cantidad
        }))

        recetaConIngredientes.push({
            nombre: receta.nombre,
            instrucciones: receta.instrucciones,
            origen: receta.origen,
            ingredientes
        })
    }
   
    response.json(recetaConIngredientes)
  } catch (error) {
    console.log(error);
  }
};

const getRecetaById = async (request, response) => {
    const { id } = request.params;
    const recetaConIngredientes = []

    if (validateObjectId(id, response)) return;
  
    const receta = await Receta.findById(id);
    if (!receta) {
        return handleNotFoundError("No hay resultados", response);
      }
    const recetaIngrediente = await RecetaIngrediente.find({receta: receta._id}).populate("ingrediente")
    const ingredientes = recetaIngrediente.map(ri => ({
        nombre: ri.ingrediente.nombre,
        cantidad: ri.cantidad
    }))

    recetaConIngredientes.push({
        nombre: receta.nombre,
        instrucciones: receta.instrucciones,
        origen: receta.origen,
        ingredientes
    })

    response.json(recetaConIngredientes);
}
const getRecetaByNombre = async (request, response) => {
    const { palabra } = request.params;
    const recetaConIngredientes = []

    const recetas = await Receta.find({
        nombre: {
          $regex: palabra,
          $options: "i"
        }
    })

    for(const receta of recetas){
        const recetaIngrediente = await RecetaIngrediente.find({receta: receta._id}).populate("ingrediente")
        const ingredientes = recetaIngrediente.map(ri => ({
            nombre: ri.ingrediente.nombre,
            cantidad: ri.cantidad
        }))
    
        recetaConIngredientes.push({
            nombre: receta.nombre,
            instrucciones: receta.instrucciones,
            origen: receta.origen,
            ingredientes
        })
    }


    response.json(recetaConIngredientes);
}

export { creaReceta, getRecetas, getRecetaById, getRecetaByNombre };
