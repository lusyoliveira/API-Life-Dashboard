import express from "express";
import CursosController from "../controllers/cursosController.js";

const rotas = express.Router();

rotas.get("/cursos", CursosController.listarTodosRegistros);
rotas.get("/cursos/:id", CursosController.listarRegistrosPorID);
rotas.post("/cursos", CursosController.cadastrarRegistro);
rotas.put("/cursos/:id", CursosController.atualizarRegistro);
rotas.delete("/cursos/:id", CursosController.excluirRegistro);

export default rotas;