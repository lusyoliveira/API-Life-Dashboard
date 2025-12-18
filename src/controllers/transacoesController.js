import transacoes from "../models/Transacao.js"

class TransacoesController {
    static async listarTransacoes(req, res) {
        try {
                const listaTransacoes = await transacoes.find({});
                res.status(200).json(listaTransacoes);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar as transacoes.`});
        }
    };

    static async listarTransacoesPorID(req, res) {
        try {
                const id = req.params.id;
                const transacoesEncontrado = await transacoes.findById(id);
                res.status(200).json(transacoesEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consulta a transação.`});
        }
    };

    static async cadastrarTransacao(req,res) {
        try {
            const novaTransacao = await transacoes.create(req.body);
            res.status(201).json({ message: "Transação criado com sucesso", transacoes: novaTransacao });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao criar uma transação.`});
        }
    };

    static async atualizarTransacao(req, res) {
        try {
                const id = req.params.id;
                await transacoes.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Transação atualizada com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar a transação.`});
        }
    };

    static async excluirTransacao(req, res) {
        try {
                const id = req.params.id;
                await transacoes.findByIdAndDelete(id);
                res.status(200).json( { message: "Transação excluída com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir a transação.`});
        }
    };
};

export default TransacoesController