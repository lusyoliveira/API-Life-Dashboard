import express from "express";
import cors from "cors";
import sequelize from "./config/dbConexao.js";
import "./models/associacoes.js"; 
import rotas from "./rotas/index.js";
import manipulador404 from "./middlewares/manipulador404.js";
import manipularErros from "./middlewares/manipuladorErros.js";

const app = express();
const path = require('path');

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

// No seu arquivo do servidor (Back-end - Porta 3000)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Libera a pasta 'assets' para ser acessível publicamente via URL
app.use('/assets', express.static(path.join(__dirname, 'assets')));

rotas(app);

app.use(manipulador404);
app.use(manipularErros);

export default app;