import express from "express";
import TarefaController from "../controllers/tarefaController.js";

const rotas = express.Router();

rotas.get("/tarefas", TarefaController.listarTodosRegistros);
rotas.get("/tarefas/:id", TarefaController.listarRegistrosPorID);
rotas.post("/tarefas", TarefaController.cadastrarRegistro);
rotas.put("/tarefas/:id", TarefaController.atualizarRegistro);
rotas.delete("/tarefas/:id", TarefaController.excluirRegistro);

export default rotas;