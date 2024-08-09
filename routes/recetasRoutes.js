import express from "express";
import { getRecetas, creaReceta, getRecetaById, getRecetaByNombre, updateReceta, deleteReceta } from "../controllers/recetaController.js";

const router = express.Router();

router.route("/")
    .post(creaReceta)
    .get(getRecetas);

router.route("/:id")
    .get(getRecetaById)
    .put(updateReceta)
    .delete(deleteReceta)
    
router.route("/byNombre/:palabra")
    .get(getRecetaByNombre)

export default router;
