
import Controller from "./Controller.js";
import AgendaServices  from "../servicos/agendaService.js";

const agendaServices = new AgendaServices();

class AgendaController extends Controller {
    constructor() {
        super(agendaServices);
        this.populate = [
            { path: "Tipo" },
            { path: "Categoria" },
            { path: "Status" }
        ];
    }

    listarAgendaporFiltro = async (req, res, next) => {
      try {
          const busca = await this.entidadeservice.buscarporFiltro(req.query);

          if (busca === null) {
              return res.status(200).json([]);
          }

          const resultado = await this.entidadeservice.model
              .find(busca)
              .populate(this.populate);

          res.status(200).json(resultado);

      } catch (erro) {
          next(erro);
      }
    };
}

export default new AgendaController();