import express from "express";
import PlataformaController from "../controllers/plataformasController.js";

const rotas = express.Router();

rotas.get("/plataformas", PlataformaController.listarPlataformas);
rotas.get("/plataformas/:id", PlataformaController.listarPlataformasPorID);
rotas.post("/plataformas/", PlataformaController.cadastrarPlataforma);
rotas.put("/plataformas/:id", PlataformaController.atualizarPlataforma);
rotas.delete("/plataformas/:id", PlataformaController.excluirPlataforma);

export default rotas;