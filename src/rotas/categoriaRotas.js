import express from "express";
import CategoriasController from "../controllers/categoriasController.js";

const rotas = express.Router();

rotas.get("/categorias", CategoriasController.listarCategorias);
rotas.get("/categorias/:id", CategoriasController.listarCategoriasPorID);
rotas.post("/categorias/", CategoriasController.cadastrarCategoria);
rotas.put("/categorias/:id", CategoriasController.atualizarCategoria);
rotas.delete("/categorias/:id", CategoriasController.excluirCategoria);

export default rotas;