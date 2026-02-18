import express from "express";
import AgendaController from "../controllers/agendaController.js";
import paginar from "../middlewares/paginar.js";

const rotas = express.Router();

rotas.get("/agenda", AgendaController.listarTodosRegistros);
rotas.get("/agenda/busca", AgendaController.listarAgendaporFiltro, paginar);
rotas.get("/agenda/:id", AgendaController.listarRegistrosPorID);
rotas.post("/agenda", AgendaController.cadastrarRegistro);
rotas.put("/agenda/:id", AgendaController.atualizarRegistro);
rotas.delete("/agenda/:id", AgendaController.excluirRegistro);

export default rotas;