import NaoEncontrado from "../erros/NaoEncontrado.js";
import estado from "../models/Status.js"

class StatusController {
    static listarStatus = async (req, res, next) => {
        try {
                const listaStatus = await estado.find({});
                
                if (listaStatus !== null) {
                    res.status(200).json(listaStatus);
                } else {
                    next( new NaoEncontrado("Nenhum status encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static listarStatusPorID = async (req, res, next) => {
        try {
                const id = req.params.id;
                const statusEncontrado = await estado.findById(id);
                if (statusEncontrado !== null) {
                    res.status(200).json(statusEncontrado);
                } else {
                    next( new NaoEncontrado("Status não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static cadastrarStatus = async (req,res, next) => {
        try {
            const novaAgendaStatus = await estado.create(req.body);

            if (novaAgendaStatus !== null) {
                res.status(201).json({ message: "Status criado com sucesso", status: novaAgendaStatus });
            } else {
                next( new NaoEncontrado("Erro ao criar status"));
            }
        } catch (error) {
            next(error);
        }
    };

    static atualizarStatus = async (req, res, next) => {
        try {
                const id = req.params.id;
                const statusResultado = await estado.findByIdAndUpdate(id, {$set: req.body});
                if (statusResultado !== null) {
                    res.status(200).json( { message: "Status atualizado com sucesso!"});
                } else {
                    next( new NaoEncontrado("Id do status não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static excluirStatus = async (req, res, next) => {
        try {
                const id = req.params.id;
                const statusResultado = await estado.findByIdAndDelete(id);
                if (statusResultado !== null) {
                    res.status(200).json( { message: "Status excluído com sucesso!"});
                } else {
                    next( new NaoEncontrado("Id do status não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };
};

export default StatusController