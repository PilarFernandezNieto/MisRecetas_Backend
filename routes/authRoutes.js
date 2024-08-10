import express from "express"
import {registro, verifyAccount, login} from "../controllers/authController.js"


const router = express.Router()

// Autenticación y registro de usuarios
router.post("/registro", registro)
router.get("/verify/:token", verifyAccount)
router.post("/login", login)



export default router