import "dotenv/config";

const PORT = 3000;

async function start() {
    const { default: app } = await import("./src/app.js");
    
    app.listen(PORT, () => {
        console.log("🚀 Servidor iniciado na porta 3000");
    });
}

start();
