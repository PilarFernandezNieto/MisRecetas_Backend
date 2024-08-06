import mongoose from "mongoose";

const ingredientesSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: false
    }
})

const Ingrediente = mongoose.model("Ingrediente", ingredientesSchema)

export default Ingrediente