import express from "express";
import EpisodiosController from "../controllers/episodiosController.js";

const rotas = express.Router();

rotas.get("/catalogo/temporadas/:temporadaId/episodios", EpisodiosController.listarTodosRegistros);
rotas.get("/catalogo/temporadas/episodios/:id", EpisodiosController.listarRegistrosPorID);
rotas.post("/catalogo/temporadas/:temporadaId/episodios", EpisodiosController.cadastrarRegistro);
rotas.put("/catalogo/temporadas/episodios/:id", EpisodiosController.atualizarRegistro);
rotas.delete("/catalogo/temporadas/episodios/:id", EpisodiosController.excluirRegistro);

export default rotas;