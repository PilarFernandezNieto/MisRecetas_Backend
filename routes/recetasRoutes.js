import express from "express";
import { getRecetas, creaReceta, getRecetaById, getRecetaByNombre } from "../controllers/recetaController.js";

const router = express.Router();

router.route("/")
    .post(creaReceta)
    .get(getRecetas);

router.route("/:id")
    .get(getRecetaById)
router.route("/byNombre/:palabra")
    .get(getRecetaByNombre)

export default router;
