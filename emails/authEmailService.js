import {createTransport} from "../config/nodemailer.js"

export async function sendEmailVerification({ nombre, email, token }){
   const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
   )

   const info = await transporter.sendMail({
    from: "MisRecetas <apreilmc@gmail.com>",
    to: email,
    subject: "MisRecetas - Confirma tu cuenta",
    text: "MisRecetas - Confirma tu cuenta",
    html: `
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div class="md:flex">
            <div class="p-8">
                <div class="uppercase tracking-wide text-sm text-amber-500 font-semibold">Hola, ${nombre}</div>
                    <p class="block mt-1 text-lg leading-tight font-medium text-black">Confirma tu cuenta en MisRecetas</p>
                    <p class="mt-2 text-gray-500">Gracias por registrarte en MisRecetas. Por favor, confirma tu cuenta haciendo click en el siguiente enlace:</p>
                    <a href="http://localhost:4000/api/auth/verify/${token}" class="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                        Confirmar Cuenta
                    </a>
                    <p class
                </div>
            </div>
        </div>
    </div>
`
   })
   console.log('Mensaje enviado', info.messageId);
   
    
}