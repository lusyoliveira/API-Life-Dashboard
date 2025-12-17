import express from "express";
import CatalogoController from "../controllers/catalogoController.js";

const rotas = express.Router();

rotas.get("/catalogo", CatalogoController.listarCatalogo);
rotas.get("/catalogo/:id", CatalogoController.listarCatalogoPorID);
rotas.post("/catalogo", CatalogoController.cadastrarCatalogo);
rotas.put("/catalogo/:id", CatalogoController.atualizarCatalogo);
rotas.delete("/catalogo/:id", CatalogoController.excluirCatalogo);

export default rotas;