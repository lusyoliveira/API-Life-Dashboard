import contas from "../models/Contas.js"

class ContasController {
    static async listarContas(req, res) {
        try {
                const listaContas = await contas.find({});
                res.status(200).json(listaContas);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar as contas.`});
        }
    };

    static async listarContasPorID(req, res) {
        try {
                const id = req.params.id;
                const contasEncontrado = await contas.findById(id);
                res.status(200).json(contasEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consulta a conta.`});
        }
    };

    static async cadastrarConta(req,res) {
        try {
            const novacontas = await contas.create(req.body);
            res.status(201).json({ message: "Conta criado com sucesso", contas: novacontas });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao criar um contas.`});
        }
    };

    static async atualizarConta(req, res) {
        try {
                const id = req.params.id;
                await contas.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Conta atualizada com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar o Conta.`});
        }
    };

    static async excluirConta(req, res) {
        try {
                const id = req.params.id;
                await contas.findByIdAndDelete(id);
                res.status(200).json( { message: "Conta excluída com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir o Conta.`});
        }
    };
};

export default ContasController