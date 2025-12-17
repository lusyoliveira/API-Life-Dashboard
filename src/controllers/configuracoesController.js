import Configuracoes from "../models/Configuracoes.js"

class ConfiguracoesController {
    static async listarConfiguracoes(req, res) {
        try {
                const listaConfiguracoes = await Configuracoes.find({});
                res.status(200).json(listaConfiguracoes);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar os Configuração.`});
        }
    };

    static async listarConfiguracoesPorID(req, res) {
        try {
                const id = req.params.id;
                const ConfiguracoesEncontrado = await Configuracoes.findById(id);
                res.status(200).json(ConfiguracoesEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consulta o Configurações.`});
        }
    };

    static async cadastrarConfiguracoes(req,res) {
        try {
            const novaConfiguracoes = await Configuracoes.create(req.body);
            res.status(201).json({ message: "Configurações criado com sucesso", Configuracoes: novaConfiguracoes });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao criar um Configurações.`});
        }
    };

    static async atualizarConfiguracoes(req, res) {
        try {
                const id = req.params.id;
                await Configuracoes.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Configurações atualizado com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar o Configurações.`});
        }
    };

    static async excluirConfiguracoes(req, res) {
        try {
                const id = req.params.id;
                await Configuracoes.findByIdAndDelete(id);
                res.status(200).json( { message: "Configurações excluído com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir o Configurações.`});
        }
    };
};

export default ConfiguracoesController