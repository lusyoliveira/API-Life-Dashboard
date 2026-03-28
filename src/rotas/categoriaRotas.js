import express from "express";
import CategoriasController from "../controllers/categoriasController.js";

const rotas = express.Router();

rotas.get("/categorias", CategoriasController.listarTodosRegistros);
rotas.get("/categorias/:id", CategoriasController.listarRegistrosPorID);
rotas.post("/categorias/", CategoriasController.cadastrarRegistro);
rotas.put("/categorias/:id", CategoriasController.atualizarRegistro);
rotas.delete("/categorias/:id", CategoriasController.excluirRegistro);

export default rotas;