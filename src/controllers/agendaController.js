import NaoEncontrado from "../erros/NaoEncontrado.js";
import agenda from "../models/Agenda.js"

class AgendaController {
    static listarCompromissos = async (req, res, next) => {
        try {
                const listaCompromissos = await agenda.find({}).populate([
                                                                    { path: "Tipo" },
                                                                    { path: "Categoria" },
                                                                    { path: "Status" }
                                                                    ]);
                if (listaCompromissos !== null) {                                                    
                    res.status(200).json(listaCompromissos);
                } else {
                    next( new NaoEncontrado("Nenhum compromisso encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static listarCompromissoPorID = async (req, res,next) => {
        try {
            const id = req.params.id;
            const agendaEncontrada = await agenda.findById(id).populate([
                                                                { path: "Tipo" },
                                                                { path: "Categoria" },
                                                                { path: "Status" }
                                                                ]);
            if (agendaEncontrada !== null) {
                res.status(200).send(agendaEncontrada);
            } else {
                next( new NaoEncontrado("Compromisso não encontrado"));    
            }
        } catch (error) {
           next(error);
        }
    };

    static listarAgendaporFiltro = async (req, res, next) => {
        try {
            const { titulo } = req.query;
            const agendaFiltrada = await agenda.find({
                titulo: titulo
            }).populate([
                { path: "Tipo" },
                { path: "Categoria" },
                { path: "Status" }
            ]);
            if (agendaFiltrada !== null) {
                res.status(200).json(agendaFiltrada);
            } else {
                next(new NaoEncontrado("Nenhum compromisso encontrado"));
            }
        } catch (error) {
            next(error);
        }
    };

    static cadastrarCompromisso = async (req,res,next) => {
        try {
            const novaAgenda = await agenda.create(req.body);

            if (novaAgenda !== null) {
            res.status(201).json({ message: "Compromisso criado com sucesso", agenda: novaAgenda });
            } else {
            next( new NaoEncontrado("Erro ao criar compromisso"));
            }
        } catch (error) {
            next(error);
        }
    };

    static atualizarCompromisso = async (req, res, next) => {
        try {
                const id = req.params.id;

                const agendaResultado = await agenda.findByIdAndUpdate(id, {$set: req.body});
                    
                if (agendaResultado !== null) {
                res.status(200).json( { message: "Compromisso atualizado com sucesso!"});
                } else {
                next( new NaoEncontrado("Id do compromisso não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static excluirCompromisso = async (req, res, next) => {
        try {
                const id = req.params.id;
                const agendaResultado = await agenda.findByIdAndDelete(id);
                if (agendaResultado !== null) {
                    res.status(200).json( { message: "Compromisso excluído com sucesso!"});
                } else {
                    next( new NaoEncontrado("Id do compromisso não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };
};

export default AgendaController