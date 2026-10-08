import express from "express";

const rotas = express.Router();

rotas.post("/api/converter-imagem", async (req, res) => {
    const { urlImagem } = req.body;
    
    if (!urlImagem) {
        return res.status(400).json({ erro: "URL da imagem é obrigatória." });
    }

    const base64 = await converterUrlParaBase64Backend(urlImagem);
    
    if (!base64) {
        return res.status(500).json({ erro: "Erro ao processar imagem." });
    }

    return res.json({ base64 });
});

export default rotas;