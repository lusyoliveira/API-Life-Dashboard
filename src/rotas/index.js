import tarefas from "./tarefasRotas.js";
import agenda from "./agendaRotas.js";

const rotas = (app) => {
    app.route("/").get((req, res) =>
        res.status(200).send("Life Dashboard")
    );

    app.use(tarefas);
    app.use(agenda);
};

export default rotas;
