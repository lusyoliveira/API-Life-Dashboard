import NaoEncontrado from "../erros/NaoEncontrado.js";
import transacoes from "../models/Transacao.js"

class TransacoesController {
    static  listarTransacoes = async(req, res, next)  =>  {
        try {
                const listaTransacoes = await transacoes.find({}).populate([
                                                                    { path: "Categoria" },
                                                                    { path: "Conta" }
                                                                    ]);
                if (listaTransacoes !== null) {                                                    
                    res.status(200).json(listaTransacoes);
                } else {
                    res.status(404).json({ message: "Nenhuma transação encontrada"});
                }
        } catch (error) {
            next(error);
        }
    };

    static listarTransacoesPorID = async (req, res, next) => {
        try {
                const id = req.params.id;
                const transacoesEncontrado = await transacoes.findById(id).populate([
                                                                    { path: "Categoria" },
                                                                    { path: "Conta" }
                                                                    ]);

                if (transacoesEncontrado !== null) {
                    res.status(200).json(transacoesEncontrado);
                } else {
                    res.status(404).json({ message: "Transação não encontrada"});
                }
        } catch (error) {
            next(error);
        }
    };

    static cadastrarTransacao = async (req,res, next) => {
        try {
            const novaTransacao = await transacoes.create(req.body);
            
            if (novaTransacao !== null) {
                res.status(201).json({ message: "Transação criada com sucesso", transacao: novaTransacao });
            } else {
                next( new NaoEncontrado("Erro ao criar transação"));
            }
        } catch (error) {
            next(error);
        }
    };

    static atualizarTransacao = async (req, res, next) => {
        try {
                const id = req.params.id;
                const transacaoResultado = await transacoes.findByIdAndUpdate(id, {$set: req.body});
                if (transacaoResultado !== null) {
                    res.status(200).json( { message: "Transação atualizada com sucesso!"});
                } else {
                    next( new NaoEncontrado("Id da transação não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static excluirTransacao = async (req, res, next) => {
        try {
                const id = req.params.id;
                const transacaoResultado = await transacoes.findByIdAndDelete(id);
                if (transacaoResultado !== null) {
                    res.status(200).json( { message: "Transação excluída com sucesso!"});
                } else {
                    next( new NaoEncontrado("Id da transação não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };
};

export default TransacoesController