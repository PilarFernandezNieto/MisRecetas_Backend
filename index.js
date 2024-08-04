import express from "express"

const app = express();

app.get("/", (request, response) => {
  const receta = {
    id: 1,
    nombre: "Lentejas con chorizo",
    ingredientes: [
        { 
            id: 1, 
            nombre: "Lentejas", 
            cantidad: "200gr" },
        {
            id: 2,
            nombre: "Chorizo",
            cantidad: "100gr"
        }
    ]
  };
  response.json(receta);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`El servidor se está ejectuando en el puerto ${PORT}`);
});
