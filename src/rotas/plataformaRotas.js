import express from "express";
import PlataformaController from "../controllers/plataformasController.js";

const rotas = express.Router();

rotas.get("/plataformas", PlataformaController.listarTodosRegistros);
rotas.get("/plataformas/:id", PlataformaController.listarRegistrosPorID);
rotas.post("/plataformas/", PlataformaController.cadastrarRegistro);
rotas.put("/plataformas/:id", PlataformaController.atualizarRegistro);
rotas.delete("/plataformas/:id", PlataformaController.excluirRegistro);

export default rotas;