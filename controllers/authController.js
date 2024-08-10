import User from "../models/User.js";
import { sendEmailVerification } from "../emails/authEmailService.js";

const registro = async (request, response) => {
  if (Object.values(request.body).includes("")) {
    const error = new Error("Todos los campos son obligatorios");
    return response.status(400).json({ msg: error.message });
  }

  const { email, password, name } = request.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("Usuario ya registrado");
    return response.status(400).json({ msg: error.message });
  }

  const MIN_PASSWORD_LENGTH = 8;
  if (password.trim().length < MIN_PASSWORD_LENGTH) {
    const error = new Error(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`);
    return response.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(request.body);
    const result = await user.save();

    console.log(result);
    const { nombre, email, token } = result;
    sendEmailVerification({ nombre, email, token });

    response.status(400).json({ msg: "Usuario creado correctamente. Revisa tu email" });
  } catch (error) {
    if (error.code === 11000) {
      return response.status(400).json({
        msg: "El usuario ya existe"
      });
    } else {
      res.status(500).json({ msg: error.message });
    }
  }
};

const verifyAccount = async (request, response) => {
  const { token } = request.params;
  const user = await User.findOne({ token });

  if (!user) {
    const error = new Error("Hubo un error. Token no válido");
    return response.status(401).json({ msg: error.message });
  }
  try {
    user.verified = true;
    user.token = "";
    await user.save();
    response.json({ msg: "Usuario confirmado correctamete" });
  } catch (error) {
    console.log(error);
  }
};

const login = async (request, response) => {
  const { email, password } = request.body;
  // 1. Revisar que el usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");
    return response.status(401).json({ msg: error.message });
  }
  // 2. Revisar que ha confirmado su cuenta
  if(!user.verified){
    const error = new Error("Tu cuenta todavía no ha sido confirmada");
    return response.status(401).json({ msg: error.message });
  }
  // 3. Comprobar password (en el Modelo)
  if(await user.checkPassword(password)){
    
    response.json({msg: "Usuario autenticado"})

  } else {
    const error = new Error("Password incorrecto");
    return response.status(401).json({ msg: error.message });
  }
};

export { registro, verifyAccount, login };
