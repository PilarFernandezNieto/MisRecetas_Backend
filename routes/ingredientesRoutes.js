import express from "express"
import { creaIngrediente, getIngredientes, getIngredienteById, getIngredienteByNombre, updateIngrediente } from "../controllers/ingredientesController.js";

const router = express.Router()

router.post("/", creaIngrediente);
router.get("/", getIngredientes);
router.get("/:id", getIngredienteById)
router.get("/byNombre/:palabra", getIngredienteByNombre )
router.put("/:id", updateIngrediente)

  export default router