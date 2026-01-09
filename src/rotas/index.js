import tarefas from "./tarefasRotas.js";
import agenda from "./agendaRotas.js";
import tipos from "./tiposRotas.js";
import status from "./statusRotas.js";
import categoria from "./categoriaRotas.js";
import cursos from "./cursosRotas.js";
import areas from "./areasRotas.js";
import contas from "./contasRotas.js";
import configuracoes from "./configuracoesRotas.js";
import catalogo from "./catalogoRotas.js";
import clima from "./climaRotas.js"
import transacoes from "./transacoesRotas.js"
import plataformas from "./plataformaRotas.js"

const rotas = (app) => {
    app.route("/").get((req, res) =>
        res.status(200).send("Life Dashboard")
    );
 
    app.use(agenda);
    app.use(areas);
    app.use(catalogo);
    app.use(categoria);
    app.use(cursos);
    app.use(contas);
    app.use(configuracoes);
    app.use(clima);
    app.use(plataformas);
    app.use(status);
    app.use(tarefas);
    app.use(transacoes);
    app.use(tipos);
};

export default rotas;
