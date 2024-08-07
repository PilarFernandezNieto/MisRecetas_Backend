import dotenv from "dotenv"
import colors from "@colors/colors"
import { db } from "../config/db.js"
import Recetas from "../models/Receta.js"
import {recetas} from "./recetasData.js"

dotenv.config()
await db()

async function seedDB() {
   try {
    await Recetas.insertMany(recetas)
    console.log(colors.cyan.bold('Datos insertados correctamente'));
    process.exit(0) // process es una variable global de Node.js
    
   } catch (error) {
    console.log(error);
    process.exit(1)
    
   }
    
}

async function clearDB(){
    try {
        await Recetas.deleteMany()
        console.log(colors.magenta.bold('Se eliminaron los datos'));
        process.exit(0) // process es una variable global de Node.js
        
       } catch (error) {
        console.log(error);
        process.exit(1)
        
       }
    
}

if(process.argv[2] === "--import"){
    seedDB()
} else {
    clearDB()
}
