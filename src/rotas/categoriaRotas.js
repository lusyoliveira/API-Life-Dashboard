import express from "express";
import AgendaCategoriasController from "../controllers/categoriasController.js";

const rotas = express.Router();

rotas.get("/categorias", AgendaCategoriasController.listarCategorias);
rotas.get("/categorias/:id", AgendaCategoriasController.listarCategoriasPorID);
rotas.post("/categorias/", AgendaCategoriasController.cadastrarCategoria);
rotas.put("/categorias/:id", AgendaCategoriasController.atualizarCategoria);
rotas.delete("/categorias/:id", AgendaCategoriasController.excluirCategoria);

export default rotas;