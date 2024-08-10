import express from "express"
import {registro} from "../controllers/authController.js"


const router = express.Router()

// Autenticación y registro de usuarios
router.post("/registro", registro)



export default router