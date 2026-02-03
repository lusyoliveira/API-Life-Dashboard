import express from "express";
import AgendaController from "../controllers/agendaController.js";
import paginar from "../middlewares/paginar.js";

const rotas = express.Router();

rotas.get("/agenda", AgendaController.listarCompromissos);
rotas.get("/agenda/busca", AgendaController.listarAgendaporFiltro, paginar);
rotas.get("/agenda/:id", AgendaController.listarCompromissoPorID);
rotas.post("/agenda", AgendaController.cadastrarCompromisso);
rotas.put("/agenda/:id", AgendaController.atualizarCompromisso);
rotas.delete("/agenda/:id", AgendaController.excluirCompromisso);

export default rotas;