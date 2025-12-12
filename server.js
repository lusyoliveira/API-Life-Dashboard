import "dotenv/config";
import app from "./src/app.js"

const PORT = 3000;

const rotas = {
    "/": "curso"
};

app.listen(PORT, () =>{
    console.log("Servidor Iniciado");
    
});

//subir servidor node server.js
//localhost:3000/usuarios
//instalar extensão thunderclient
//para servidor crtl+c
//node --watch server.js reiniciar servidor
//npm run dev