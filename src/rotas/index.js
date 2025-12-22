import tarefas from "./tarefasRotas.js";
import agenda from "./agendaRotas.js";
import cursos from "./cursosRotas.js";
import contas from "./contasRotas.js";
import configuracoes from "./configuracoesRotas.js";
import catalogo from "./catalogoRotas.js";
import clima from "./climaRotas.js"
import transacoes from "./transacoesRotas.js"
import agendaTipos from "./agendaTiposRotas.js";

const rotas = (app) => {
    app.route("/").get((req, res) =>
        res.status(200).send("Life Dashboard")
    );

    app.use(tarefas);
    app.use("/agenda", agendaTipos);
    app.use("/agenda", agenda);
    app.use(cursos);
    app.use(contas);
    app.use(configuracoes);
    app.use(catalogo);
    app.use(clima);
    app.use(transacoes);
};

export default rotas;
