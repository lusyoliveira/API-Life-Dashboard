import estado from "../models/Status.js"

class StatusController {
    static async listarStatus(req, res) {
        try {
                const listaStatus = await estado.find({});
                res.status(200).json(listaStatus);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar os status.`});
        }
    };

    static async listarStatusPorID(req, res) {
        try {
                const id = req.params.id;
                const statusEncontrado = await estado.findById(id);
                res.status(200).json(statusEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar status.`});
        }
    };

    static async cadastrarStatus(req,res) {
        try {
            const novaAgendaStatus = await estado.create(req.body);
            res.status(201).json({ message: "Status criado com sucesso", status: novaAgendaStatus });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao criar um status.`});
        }
    };

    static async atualizarStatus(req, res) {
        try {
                const id = req.params.id;
                await estado.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Status atualizado com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar o status.`});
        }
    };

    static async excluirStatus(req, res) {
        try {
                const id = req.params.id;
                await estado.findByIdAndDelete(id);
                res.status(200).json( { message: "Status excluído com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir o status.`});
        }
    };
};

export default StatusController