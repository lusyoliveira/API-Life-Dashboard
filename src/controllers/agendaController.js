import Controller from "./Controller.js";
import AgendaServices from "../servicos/agendaService.js";

const agendaServices = new AgendaServices();

class AgendaController extends Controller {
    constructor() {
        super(agendaServices);

        this.populate = [
            { association: "Tipo" },
            { association: "Categoria" },
            { association: "Status" }
        ];
    }

    listarAgendaporFiltro = async (req, res, next) => {
        try {
            const where = await this.entidadeservice.buscarporFiltro(req.query);

            if (where === null) {
                return res.status(200).json([]);
            }

            const resultado = await this.entidadeservice.model.findAll({
                where,
                include: this.populate
            });

            res.status(200).json(resultado);

        } catch (erro) {
            next(erro);
        }
    };
}

export default new AgendaController();