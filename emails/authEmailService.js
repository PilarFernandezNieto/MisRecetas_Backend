import {createTransport} from "../config/nodemailer.js"
import fs from "fs"

// Leer el archivo HTML
let htmlContent;
try {
    htmlContent = fs.readFileSync('../email-template.html', 'utf-8');
} catch (err) {
    console.error('Error al leer el archivo HTML:', err);
    throw new Error('No se pudo leer el archivo HTML');
}

// Verifica que htmlContent no esté vacío o undefined
if (!htmlContent) {
    throw new Error('El contenido del HTML es undefined o vacío.');
}



export async function sendEmailVerification({ nombre, email, token }){
   const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
   )
// Reemplaza las variables en el HTML
    const html = htmlContent.replace('${nombre}', nombre).replace('${token}', token);
    const info = await transporter.sendMail({
    from: "MisRecetas <apreilmc@gmail.com>",
    to: email,
    subject: "MisRecetas - Confirma tu cuenta",
    text: "MisRecetas - Confirma tu cuenta",
    html: html
   })
   console.log('Mensaje enviado', info.messageId);
   
    
}