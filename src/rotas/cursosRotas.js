import express from "express";
import CursosController from "../controllers/cursosController.js";

const rotas = express.Router();

rotas.get("/cursos", CursosController.listarCursos);
rotas.get("/cursos/:id", CursosController.listarCursosPorID);
rotas.post("/cursos", CursosController.cadastrarCurso);
rotas.put("/cursos/:id", CursosController.atualizarCurso);
rotas.delete("/cursos/:id", CursosController.excluirCurso);

export default rotas;