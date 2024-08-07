import express from "express"
import { creaIngrediente, getIngredientes, getIngredienteById, getIngredienteByNombre, updateIngrediente, deleteIngrediente } from "../controllers/ingredientesController.js";

const router = express.Router()



router.route("/")
  .post(creaIngrediente)
  .get(getIngredientes)


router.route("/:id")
  .get(getIngredienteById)
  .put(updateIngrediente)
  .delete(deleteIngrediente)

router.route("/byNombre/:palabra")
  .get(getIngredienteByNombre )


  export default router