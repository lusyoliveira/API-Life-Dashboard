import agenda from "./agendaRotas.js";
import areas from "./areasRotas.js";
import catalogo from "./catalogoRotas.js";
import cursos from "./cursosRotas.js";
import contas from "./contasRotas.js";
import configuracoes from "./configuracoesRotas.js";
import categoria from "./categoriaRotas.js";
import clima from "./climaRotas.js"
import episodios from "./episodioRotas.js"
import plataformas from "./plataformaRotas.js"
import status from "./statusRotas.js";
import tarefas from "./tarefasRotas.js";
import temporada from "./temporadaRotas.js"
import tipos from "./tiposRotas.js";
import transacoes from "./transacoesRotas.js"
import swaggerUi from "swagger-ui-express";
import fs from "fs";
const swaggerJson = JSON.parse(fs.readFileSync("./src/swagger.json", "utf8"));

const rotas = (app) => {
    app.route("/").get((req, res) =>
        res.status(200).send("Life Dashboard")
    );
    app.use("/life-dashboard-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
    app.use(agenda);
    app.use(areas);
    app.use(catalogo);
    app.use(categoria);
    app.use(cursos);
    app.use(contas);
    app.use(configuracoes);
    app.use(clima);
    app.use(episodios);
    app.use(plataformas);
    app.use(status);
    app.use(tarefas);
    app.use(temporada);
    app.use(transacoes);
    app.use(tipos);
};

export default rotas;
