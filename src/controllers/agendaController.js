import agenda from "../models/Agenda.js"

class AgendaController {
    static listarCompromissos = async (req, res, next) => {
        try {
                const listaCompromissos = await agenda.find({}).populate([
                                                                    { path: "Tipo" },
                                                                    { path: "Categoria" },
                                                                    { path: "Status" }
                                                                    ]);
                res.status(200).json(listaCompromissos);
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
                res.status(404).send({ message: "Compromisso não encontrado."});    
            }
        } catch (error) {
           next(error);
        }
    }

    static cadastrarCompromisso = async (req,res,next) => {
        try {
            const novaAgenda = await agenda.create(req.body);
            res.status(201).json({ message: "Compromisso criado com sucesso", agenda: novaAgenda });
        } catch (error) {
            next(error);
        }
    };

    static atualizarCompromisso = async (req, res, next) => {
        try {
                const id = req.params.id;
                await agenda.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Compromisso atualizado com sucesso!"});
        } catch (error) {
            next(error);
        }
    };

    static excluirCompromisso = async (req, res, next) => {
        try {
                const id = req.params.id;
                await agenda.findByIdAndDelete(id);
                res.status(200).json( { message: "Compromisso excluído com sucesso!"});
        } catch (error) {
            next(error);
        }
    };
};

export default AgendaController