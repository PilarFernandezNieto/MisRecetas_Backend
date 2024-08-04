import mongoose from "mongoose";
import colors from "@colors/colors"

export const db = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(colors.yellow(`MongoDB se conectó correctamente: ${url}`));
        
        
    } catch (error) {
        console.log(colors.red(`Error: ${error.message}`));
        process.exit(1)
        
    }
}