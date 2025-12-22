import express from "express";
import AgendaController from "../controllers/agendaController.js";

const rotas = express.Router();

rotas.get("/", AgendaController.listarCompromissos);
rotas.get("/:id", AgendaController.listarCompromissoPorID);
rotas.post("/", AgendaController.cadastrarCompromisso);
rotas.put("/:id", AgendaController.atualizarCompromisso);
rotas.delete("/:id", AgendaController.excluirCompromisso);

export default rotas;