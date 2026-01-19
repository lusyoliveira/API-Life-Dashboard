import NaoEncontrado from "../erros/NaoEncontrado.js";
import configuracoes from "../models/Configuracoes.js"

class ConfiguracoesController {
    static listarConfiguracoes = async (req, res, next) => {
        try {
                const listaConfiguracoes = await configuracoes.find({});
                
                if (listaConfiguracoes !== null) {
                res.status(200).json(listaConfiguracoes);
                } else {
                next( new NaoEncontrado("Nenhum Configurações encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static listarConfiguracoesPorID = async (req, res, next) => {
        try {
                const id = req.params.id;
                const ConfiguracoesEncontrado = await configuracoes.findById(id);
               
                if (ConfiguracoesEncontrado !== null) {
                    res.status(200).json(ConfiguracoesEncontrado);
                } else {
                    next( new NaoEncontrado("Configurações não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static cadastrarConfiguracoes = async (req,res,next) => {
        try {
            const novaConfiguracoes = await configuracoes.create(req.body);

            if (novaConfiguracoes !== null) {
                res.status(201).json({ message: "Configurações criado com sucesso", configuracoes: novaConfiguracoes });
            } else {
                next( new NaoEncontrado("Erro ao criar o Configurações"));
            }
        } catch (error) {
            next(error);
        }
    };

    static atualizarConfiguracoes = async (req, res, next) => {
        try {
                const id = req.params.id;
                await configuracoes.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Configurações atualizado com sucesso!"});
        } catch (error) {
            next(error);
        }
    };

    static excluirConfiguracoes = async (req, res, next) => {
        try {
                const id = req.params.id;
                await configuracoes.findByIdAndDelete(id);
                res.status(200).json( { message: "Configurações excluído com sucesso!"});
        } catch (error) {
            next(error);
        }
    };
};

export default ConfiguracoesController