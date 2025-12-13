import express from "express";
import TarefaController from "../controllers/tarefaController.js";

const rotas = express.Router();

rotas.get("/tarefas", TarefaController.listarTarefas);
rotas.get("/tarefas/:codigo", TarefaController.listarTarefaPorID);
rotas.post("/tarefas", TarefaController.cadastrarTarefa);
rotas.put("/tarefas/:codigo", TarefaController.atualizarTarefa);
rotas.delete("/tarefas/:codigo", TarefaController.excluirTarefa);

export default rotas;