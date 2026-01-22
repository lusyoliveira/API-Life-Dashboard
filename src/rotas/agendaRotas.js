import express from "express";
import AgendaController from "../controllers/agendaController.js";

const rotas = express.Router();

rotas.get("/agenda", AgendaController.listarCompromissos);
rotas.get("/agenda/:id", AgendaController.listarCompromissoPorID);
rotas.get("/agenda/busca", AgendaController.listarAgendaporFiltro);
rotas.post("/agenda", AgendaController.cadastrarCompromisso);
rotas.put("/agenda/:id", AgendaController.atualizarCompromisso);
rotas.delete("/agenda/:id", AgendaController.excluirCompromisso);

export default rotas;