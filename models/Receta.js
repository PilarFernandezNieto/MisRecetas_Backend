import mongoose from "mongoose";

const recetasSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  instrucciones: {
    type: String,
    required: true
  },
  origen: {
    type: String,
    required: false
  },
  imagen: {
    type: String,
    required: false
  }
});

const Receta = mongoose.model("Receta", recetasSchema);

export default Receta;
