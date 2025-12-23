import express from "express";
import AgendaStatusController from "../controllers/agendaStatusController.js";

const rotas = express.Router();

rotas.get("/status", AgendaStatusController.listarStatus);
rotas.get("/status/:id", AgendaStatusController.listarStatusPorID);
rotas.post("/status/", AgendaStatusController.cadastrarStatus);
rotas.put("/status/:id", AgendaStatusController.atualizarStatus);
rotas.delete("/status/:id", AgendaStatusController.excluirStatus);

export default rotas;