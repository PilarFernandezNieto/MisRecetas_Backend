import express from "express"
import dotenv from "dotenv"
import colors from "@colors/colors"
import { db } from "./config/db.js";
import ingredientesRoutes from "./routes/ingredientesRoutes.js"

dotenv.config()

const app = express();
db()

app.use("/api/ingredientes", ingredientesRoutes)


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(colors.blue(`El servidor se está ejectuando en el puerto ${PORT}`));
});


