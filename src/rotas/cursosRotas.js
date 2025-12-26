import express from "express";
import CursosController from "../controllers/cursosController.js";

const rotas = express.Router();

rotas.get("/", CursosController.listarCursos);
rotas.get("/:id", CursosController.listarCursosPorID);
rotas.post("/", CursosController.cadastrarCurso);
rotas.put("/:id", CursosController.atualizarCurso);
rotas.delete("/:id", CursosController.excluirCurso);

export default rotas;