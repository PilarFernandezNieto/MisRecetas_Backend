import express from "express"
import { creaIngrediente, getIngredientes, getIngredienteById, getIngredienteByNombre, updateIngrediente, deleteIngrediente } from "../controllers/ingredientesController.js";

const router = express.Router()

router.post("/", creaIngrediente);
router.get("/", getIngredientes);
router.get("/:id", getIngredienteById)
router.get("/byNombre/:palabra", getIngredienteByNombre )
router.put("/:id", updateIngrediente)
router.delete("/:id", deleteIngrediente)

  export default router