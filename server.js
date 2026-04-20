import "dotenv/config";

const PORT = 3000;

async function start() {
    const { default: app } = await import("./src/app.js");
    
    app.listen(PORT, () => {
        console.log("🚀 Servidor iniciado na porta 3000");
    });
}

start();

//subir servidor npm run dev
//localhost:3000/usuarios
//instalar extensão thunderclient
//para servidor crtl+c
//node --watch server.js reiniciar servidor
//_id: { type: mongoose.Schema.Types.ObjectID },