import tarefas from "./tarefasRotas.js";
import agenda from "./agendaRotas.js";
import agendaTipos from "./agendaTiposRotas.js";
import status from "./StatusRotas.js";
import agendaCategoria from "./agendaCategoriaRotas.js";
import cursos from "./cursosRotas.js";
import cursosAreas from "./cursosAreasRotas.js";
import contas from "./contasRotas.js";
import configuracoes from "./configuracoesRotas.js";
import catalogo from "./catalogoRotas.js";
import clima from "./climaRotas.js"
import transacoes from "./transacoesRotas.js"

const rotas = (app) => {
    app.route("/").get((req, res) =>
        res.status(200).send("Life Dashboard")
    );

    app.use(tarefas);
    app.use("/agenda", agendaCategoria);
    app.use("/agenda", agendaTipos);
    app.use("/agenda", agenda);
    app.use("/cursos", cursosAreas);
    app.use("/cursos", cursos);
    app.use(contas);
    app.use(configuracoes);
    app.use(catalogo);
    app.use(clima);
    app.use(transacoes);
    app.use(status);
};

export default rotas;
