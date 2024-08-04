import express from "express"
import { ingredientes } from "../data/ingredientes.js";

const router = express.Router()

router.get("/", (request, response) => {
  
    response.json(ingredientes);
  });

  export default router