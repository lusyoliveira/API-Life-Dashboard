class Services {
    constructor(model) {
        this.model = model;
    }
    async buscarTodos(populate = []) {
        return await this.model.find({}).populate(populate);
    };
    
    async buscarPorId(id, populate = [] ){
        return await this.model.findById(id).populate(populate);
    };

    async buscarUm(busca, populate = []) {
        return await this.model.findOne(busca).populate(populate);
    };

    async criar(data) {
        return await this.model.create(data);
    };

    async atualizar(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    };

    async deletar(id) {
        return await this.model.findByIdAndDelete(id);
    };
}

export default Services;