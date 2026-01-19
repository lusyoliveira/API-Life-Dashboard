import NaoEncontrado from "../erros/NaoEncontrado.js";
import transacoes from "../models/Transacao.js"

class TransacoesController {
    static  listarTransacoes = async(req, res, next)  =>  {
        try {
                const listaTransacoes = await transacoes.find({}).populate([
                                                                    { path: "Categoria" }
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
                                                                    { path: "Categoria" }
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
                await transacoes.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Transação atualizada com sucesso!"});
        } catch (error) {
            next(error);
        }
    };

    static excluirTransacao = async (req, res, next) => {
        try {
                const id = req.params.id;
                await transacoes.findByIdAndDelete(id);
                res.status(200).json( { message: "Transação excluída com sucesso!"});
        } catch (error) {
            next(error);
        }
    };
};

export default TransacoesController