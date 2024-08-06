import { ingredientes } from "../data/ingredientes.js";
import mongoose from "mongoose";
import Ingrediente from "../models/Ingrediente.js";

const creaIngrediente = async (request, response) => {
  const { nombre } = request.body;
  if (!nombre) {
    const error = new Error("El nombre del ingrediente es obligatorio");
    return response.status(400).json({
      msg: error.message
    });
  }
  try {
    const ingrediente = new Ingrediente(request.body)
    const result = await ingrediente.save()

    response.json({
        msg: "Ingrediente creado correctamente"
    })
    
    
  } catch (error) {
    if(error.code === 11000){
  
     return response.status(400).json({
      msg: error.errmsg
    });
} else {
    res.status(500).json({ msg: error.message });
}
    
  }
};

const getIngredientes = (request, response) => {
  response.json(ingredientes);
};

/* getIngredienteById*/ 
const getIngredienteById = async  (request, response) => {
    const { id } =  request.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error("El id no es válido")
        return response.status(400).json({msg: error.message})
    }
    const ingrediente = await Ingrediente.findById(id)
    if(!ingrediente){
      const error = new Error("El ingrediente no existe")
      return response.status(404).json({msg: error.message})
    }
    response.json(ingrediente)
    
   
}


/* getIngredienteByNombre */
const getIngredienteByNombre = async (request, response) => {
    const { palabra } = request.params

    try {
    const ingredientes = await Ingrediente.find({
        nombre: {
            $regex: palabra,
            $options: "i"
        }
    })
    if(ingredientes.length === 0){
      const error = new Error("No hay resultados")
      return response.status(404).json({msg: error.message})
    }
    response.json(ingredientes)
  
} catch(error){
    console.log(error.message);
    
}
    
}

/* updateIngrediente */
const updateIngrediente = async (request, response) => {
 
  
}

export { creaIngrediente, getIngredientes, getIngredienteById, getIngredienteByNombre, updateIngrediente };
