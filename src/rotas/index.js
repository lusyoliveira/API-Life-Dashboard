import express from "express";
import tarefas from "./tarefasRotas.js"

const rotas = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Life Dashboard"));

    app.use(express.json(), tarefas);
};

export default rotas;