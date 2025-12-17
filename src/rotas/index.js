import tarefas from "./tarefasRotas.js";
import agenda from "./agendaRotas.js";
import cursos from "./cursosRotas.js";
import contas from "./contasRotas.js";
import configuracoes from "./configuracoesRotas.js";

const rotas = (app) => {
    app.route("/").get((req, res) =>
        res.status(200).send("Life Dashboard")
    );

    app.use(tarefas);
    app.use(agenda);
    app.use(cursos);
    app.use(contas);
    app.use(configuracoes);
};

export default rotas;
