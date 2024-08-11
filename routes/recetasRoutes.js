import express from "express";
import { upload } from "../config/multer.js";
import { getRecetas, creaReceta, getRecetaById, getRecetaByNombre, updateReceta, deleteReceta } from "../controllers/recetaController.js";

const router = express.Router();

router.route("/").post(upload.single("imagen"), creaReceta).get(getRecetas);

router.route("/:id").get(getRecetaById).put(updateReceta).delete(deleteReceta);

router.route("/byNombre/:palabra").get(getRecetaByNombre);

export default router;
