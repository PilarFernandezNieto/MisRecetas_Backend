import mongoose from "mongoose";

function validateObjectId(id, response){
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("El id no es válido");
        return response.status(400).json({ msg: error.message });
      }
}

function handleNotFoundError(message, response){
    const error = new Error(message);
    return response.status(404).json({ msg: error.message });
}

const uniqueId = () => Date.now().toString(32) + Math.random().toString(32).substring(2)


export {
    validateObjectId,
    handleNotFoundError,
    uniqueId
}