import Service from './Services.js';
import Categoria from "../models/Categoria.js";
import Status from "../models/Status.js";
import Tipo from "../models/Tipo.js";
import Agenda from "../models/Agenda.js";
import { Op } from "sequelize";

class AgendaServices extends Service {
    constructor() {
        super(Agenda);
    }

    async buscarporFiltro(parametros) {
        const { titulo, categoria, status, tipo } = parametros;

        let where = {};

        // 🔍 LIKE (substitui regex)
        if (titulo) {
            where.Titulo = {
                [Op.like]: `%${titulo}%`
            };
        }

        // 🔗 Categoria
        if (categoria) {
            const categoriaEncontrada = await Categoria.findOne({
                where: { descricao: categoria }
            });

            if (!categoriaEncontrada) return null;

            where.CategoriaId = categoriaEncontrada.id;
        }

        // 🔗 Status
        if (status) {
            const statusEncontrado = await Status.findOne({
                where: { descricao: status }
            });

            if (!statusEncontrado) return null;

            where.StatusId = statusEncontrado.id;
        }

        // 🔗 Tipo
        if (tipo) {
            const tipoEncontrado = await Tipo.findOne({
                where: { descricao: tipo }
            });

            if (!tipoEncontrado) return null;

            where.TipoId = tipoEncontrado.id;
        }

        return where;
    }
}

export default AgendaServices;