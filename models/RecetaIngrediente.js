import mongoose from "mongoose";

const recetaIngredientesSchema = mongoose.Schema({
    receta: {
        type: Schema.Types.ObjectId,
        ref: 'Receta',
        required: true
    },
    ingrediente: {
        type: Schema.Types.ObjectId,
        ref: 'Ingrediente',
        required: true
    },
    cantidad: {
        type: String,
        required: true
    }
})

const RecetaIngrediente = mongoose.model("RecetaIngrediente", recetasSchema)

export default RecetaIngrediente