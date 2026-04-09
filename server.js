import dns from 'node:dns';
import "dotenv/config";

// Configura o DNS primeiro!
dns.setServers(['8.8.8.8', '1.1.1.1']);

const PORT = 3000;

// Agora importa o app somente após o DNS estar pronto
async function start() {
    const { default: app } = await import("./src/app.js");
    
    app.listen(PORT, () => {
        console.log("Servidor Iniciado com DNS customizado");
    });
}

start();

//subir servidor npm run dev
//localhost:3000/usuarios
//instalar extensão thunderclient
//para servidor crtl+c
//node --watch server.js reiniciar servidor
//_id: { type: mongoose.Schema.Types.ObjectID },