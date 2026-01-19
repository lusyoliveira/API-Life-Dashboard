import NaoEncontrado from "../erros/NaoEncontrado.js";
import contas from "../models/Contas.js"

class ContasController {
    static listarContas = async(req, res, next) => {
        try {
                const listaContas = await contas.find({});
                
                if (listaContas !== null) {
                res.status(200).json(listaContas);
                } else {
                next( new NaoEncontrado("Nenhuma conta encontrada"));
                }
        } catch (error) {
            next(error);
        }
    };

    static listarContasPorID = async (req, res, next) => {
        try {
                const id = req.params.id;
                const contasEncontrado = await contas.findById(id);
                
                if (contasEncontrado !== null) {
                res.status(200).json(contasEncontrado);
                } else {
                next( new NaoEncontrado("Conta não encontrada"));
                }
        } catch (error) {
            next(error);
        }
    };

    static cadastrarConta = async (req,res,next) => {
        try {
            const novacontas = await contas.create(req.body);

            if (novacontas !== null) {
                res.status(201).json({ message: "Conta criada com sucesso", conta: novacontas });
            } else {
            next( new NaoEncontrado("Erro ao criar conta"));
            }
        } catch (error) {
            next(error);
        }
    };

    static atualizarConta = async (req, res, next) => {
        try {
                const id = req.params.id;
                await contas.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Conta atualizada com sucesso!"});
        } catch (error) {
            next(error);
        }
    };

    static excluirConta = async (req, res, next) => {
        try {
                const id = req.params.id;
                await contas.findByIdAndDelete(id);
                res.status(200).json( { message: "Conta excluída com sucesso!"});
        } catch (error) {
            next(error);
        }
    };
};

export default ContasController