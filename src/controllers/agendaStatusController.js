import status from "../models/AgendaStatus.js"

class AgendaStatusController {
    static async listarStatus(req, res) {
        try {
                const listaStatus = await status.find({});
                res.status(200).json(listaStatus);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar os status.`});
        }
    };

    static async listarStatusPorID(req, res) {
        try {
                const id = req.params.id;
                const statusEncontrado = await status.findById(id);
                res.status(200).json(statusEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar status.`});
        }
    };

    static async cadastrarStatus(req,res) {
        try {
            const novaAgendaStatus = await status.create(req.body);
            res.status(201).json({ message: "Status criado com sucesso", status: novaAgendaStatus });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao criar um status.`});
        }
    };

    static async atualizarStatus(req, res) {
        try {
                const id = req.params.id;
                await status.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Status atualizado com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar o status.`});
        }
    };

    static async excluirStatus(req, res) {
        try {
                const id = req.params.id;
                await status.findByIdAndDelete(id);
                res.status(200).json( { message: "Status excluído com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir o status.`});
        }
    };
};

export default AgendaStatusController