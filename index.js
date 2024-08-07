import express from "express"
import dotenv from "dotenv"
import colors from "@colors/colors"
import { db } from "./config/db.js";
import ingredientesRoutes from "./routes/ingredientesRoutes.js"
import recetasRoutes from "./routes/recetasRoutes.js"

dotenv.config()

const app = express();

app.use(express.json())

db()

app.use("/api/ingredientes", ingredientesRoutes)
app.use("/api/recetas", recetasRoutes)


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(colors.blue(`El servidor se está ejectuando en el puerto ${PORT}`));
});


