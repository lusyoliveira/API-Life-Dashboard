import "dotenv/config";
import app from "./src/app.js"

const PORT = 3000;

app.listen(PORT, () =>{
    console.log("Servidor Iniciado");    
});

//subir servidor npm run dev
//localhost:3000/usuarios
//instalar extensão thunderclient
//para servidor crtl+c
//node --watch server.js reiniciar servidor
//_id: { type: mongoose.Schema.Types.ObjectID },