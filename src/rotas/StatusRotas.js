import express from "express";
import StatusController from "../controllers/statusController.js";

const rotas = express.Router();

rotas.get("/status", StatusController.listarStatus);
rotas.get("/status/:id", StatusController.listarStatusPorID);
rotas.post("/status/", StatusController.cadastrarStatus);
rotas.put("/status/:id", StatusController.atualizarStatus);
rotas.delete("/status/:id", StatusController.excluirStatus);

export default rotas;