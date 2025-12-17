import configuracoes from "../models/Configuracoes.js"

class ConfiguracoesController {
    static async listarConfiguracoes(req, res) {
        try {
                const listaConfiguracoes = await configuracoes.find({});
                res.status(200).json(listaConfiguracoes);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar os Configuração.`});
        }
    };

    static async listarConfiguracoesPorID(req, res) {
        try {
                const id = req.params.id;
                const ConfiguracoesEncontrado = await configuracoes.findById(id);
                res.status(200).json(ConfiguracoesEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consulta o Configurações.`});
        }
    };

    static async cadastrarConfiguracoes(req,res) {
        try {
            const novaConfiguracoes = await configuracoes.create(req.body);
            res.status(201).json({ message: "Configurações criado com sucesso", configuracoes: novaConfiguracoes });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao criar um Configurações.`});
        }
    };

    static async atualizarConfiguracoes(req, res) {
        try {
                const id = req.params.id;
                await configuracoes.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Configurações atualizado com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar o Configurações.`});
        }
    };

    static async excluirConfiguracoes(req, res) {
        try {
                const id = req.params.id;
                await configuracoes.findByIdAndDelete(id);
                res.status(200).json( { message: "Configurações excluído com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir o Configurações.`});
        }
    };
};

export default ConfiguracoesController