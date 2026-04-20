import { Op } from "sequelize";

class Services {
    constructor(model) {
        this.model = model;
    }

    async buscarTodos(include = []) {
        return await this.model.findAll({ include });
    }

    async buscarPorId(id, include = []) {
        return await this.model.findByPk(id, { include });
    }

    async buscarUm(where, include = []) {
        return await this.model.findOne({ where, include });
    }

    async criar(data) {
        return await this.model.create(data);
    }

    async atualizar(id, data) {
        const [updated] = await this.model.update(data, {
            where: { id }
        });

        if (updated) {
            return await this.buscarPorId(id);
        }

        return null;
    }

    async deletar(id) {
        const deleted = await this.model.destroy({
            where: { id }
        });

        return deleted ? true : null;
    }
}

export default Services;