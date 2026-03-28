import Service from './Services.js';
import Categoria from "../models/Categoria.js";
import Status from "../models/Status.js";
import Tipo from "../models/Tipos.js";
import Agenda from "../models/Agenda.js";

class AgendaServices extends Service {
    constructor() {
        super(Agenda);
    }

    async buscarporFiltro(parametros) {
        const { titulo, categoria, status, tipo } = parametros;

        let busca = {};

        if (titulo) {
            busca.Titulo = { $regex: titulo, $options: "i" };
        }

        if (categoria) {
            const categoriaEncontrada = await Categoria.findOne({
                descricao: categoria
            });

            if (!categoriaEncontrada) {
            return null;
            }

            busca.Categoria = categoriaEncontrada._id;
        }

        if (status) {
            const statusEncontrado = await Status.findOne({
                descricao: status
            });

            if (!statusEncontrado) {
            return null;
            }

            busca.Status = statusEncontrado._id;
        }

        if (tipo) {
            const tipoEncontrado = await Tipo.findOne({
                descricao: tipo
            });

            if (!tipoEncontrado) {
            return null;
            }

            busca.Tipo = tipoEncontrado._id;
        }

        return busca;
    };

}

export default AgendaServices;