import agenda from "../models/Agenda.js"

class AgendaController {
    static async listarCompromissos(req, res) {
        try {
                const listaCompromissos = await agenda.find({}).populate([
                                                                    { path: "Tipo" },
                                                                    { path: "Categoria" },
                                                                    { path: "Status" }
                                                                    ]);
                res.status(200).json(listaCompromissos);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar a agenda.`});
        }
    };

    static async listarCompromissoPorID(req, res) {
        try {
                const id = req.params.id;
                const agendaEncontrada = await agenda.findById(id);
                res.status(200).json(agendaEncontrada);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consulta compromisso.`});
        }
    };

    static async cadastrarCompromisso(req,res) {
        try {
            const novaAgenda = await agenda.create(req.body);
            res.status(201).json({ message: "Compromisso criado com sucesso", agenda: novaAgenda });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao criar um compromisso.`});
        }
    };

    static async atualizarCompromisso(req, res) {
        try {
                const id = req.params.id;
                await agenda.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Compromisso atualizado com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar o compromisso.`});
        }
    };

    static async excluirCompromisso(req, res) {
        try {
                const id = req.params.id;
                await agenda.findByIdAndDelete(id);
                res.status(200).json( { message: "Compromisso excluído com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir o compromisso.`});
        }
    };
};

export default AgendaController