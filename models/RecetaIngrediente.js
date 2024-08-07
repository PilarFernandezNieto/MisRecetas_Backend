import mongoose from "mongoose";

const recetaIngredientesSchema = mongoose.Schema({
    receta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Receta',
        required: true
    },
    ingrediente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingrediente',
        required: true
    },
    cantidad: {
        type: String,
        required: true
    }
})

const RecetaIngrediente = mongoose.model("RecetaIngrediente", recetaIngredientesSchema)

export default RecetaIngrediente