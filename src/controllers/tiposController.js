import NaoEncontrado from "../erros/NaoEncontrado.js";
import tipo from "../models/Tipos.js"

class TiposController {
    static  listarTipos = async(req, res, next) => {
        try {
                const listaTipos = await tipo.find({});
                
                if (listaTipos !== null) {
                res.status(200).json(listaTipos);
                } else {
                next( new NaoEncontrado("Nenhum tipo encontrado"));
                }   
        } catch (error) {
            next(error);
        }
    };

    static listarTiposPorID = async (req, res, next) => {
        try {
                const id = req.params.id;
                const tipoEncontrado = await tipo.findById(id);
                if (tipoEncontrado !== null) {
                    res.status(200).json(tipoEncontrado);
                } else {
                    next( new NaoEncontrado("Tipo não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static cadastrarTipo = async (req,res, next) => {
        try {
            const novaAgendaTipos = await tipo.create(req.body);
            
            if (novaAgendaTipos !== null) {
                res.status(201).json({ message: "Tipo criado com sucesso", tipo: novaAgendaTipos });
            } else {
            next( new NaoEncontrado("Erro ao criar tipo"));
            }
        } catch (error) {
            next(error);
        }
    };

    static atualizarTipo = async (req, res, next) => {
        try {
                const id = req.params.id;
                const tipoResultado = await tipo.findByIdAndUpdate(id, {$set: req.body});
                if (tipoResultado !== null) {
                    res.status(200).json( { message: "Tipo atualizado com sucesso!"});
                } else {
                    next( new NaoEncontrado("Id do tipo não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static excluirTipo = async (req, res, next) => {
        try {
                const id = req.params.id;
                const tipoResultado = await tipo.findByIdAndDelete(id);
                if (tipoResultado !== null) {
                    res.status(200).json( { message: "Tipo excluído com sucesso!"});
                } else {
                    next( new NaoEncontrado("Id do tipo não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };
};

export default TiposController