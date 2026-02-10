class Services {
    constructor(model) {
        this.model = model;
    }

    async criar(data) {
        return await this.model.create(data);
    };

    async buscarTodos() {
        return await this.model.find({});
    };

    async buscarPorId(id) {
        return await this.model.findById(id);
    };

    async atualizar(id, data) {
        return await this.model.findByIdAndUpdate(id, data);
    };

    async deletar(id) {
        return await this.model.findByIdAndDelete(id);
    };
}

export default Services;