import express from "express";
import cors from "cors";
import sequelize from "./config/dbConexao.js";
import "./models/associacoes.js"; // IMPORTANTE
import rotas from "./rotas/index.js";
import manipulador404 from "./middlewares/manipulador404.js";

const app = express();

// 🔌 TESTE DE CONEXÃO (equivalente ao mongoose.connect)
async function conectarDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ Conectado ao SQLite com sucesso!");

        await sequelize.sync(); // cria tabelas automaticamente
        console.log("📦 Tabelas sincronizadas!");

    } catch (erro) {
        console.error("❌ Erro ao conectar no banco:", erro);
    }
}

// chama a conexão
await conectarDB();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

rotas(app);

app.use(manipulador404);

export default app;