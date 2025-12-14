import express from "express";
import TarefaController from "../controllers/tarefaController.js";

const rotas = express.Router();

rotas.get("/tarefas", TarefaController.listarTarefas);
rotas.get("/tarefas/:id", TarefaController.listarTarefaPorID);
rotas.post("/tarefas", TarefaController.cadastrarTarefa);
rotas.put("/tarefas/:id", TarefaController.atualizarTarefa);
rotas.delete("/tarefas/:id", TarefaController.excluirTarefa);

export default rotas;