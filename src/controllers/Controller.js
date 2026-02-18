import NaoEncontrado from "../erros/NaoEncontrado.js";

class Controller {
    constructor(entidadeservice) {
        this.entidadeservice = entidadeservice;
    }

    listarTodosRegistros = async(req, res, next)  =>  {
        try {
            const lista = await this.entidadeservice.buscarTodos(this.populate);
            if (lista !== null) {                                                    
                res.status(200).json(lista);
            } else {
                res.status(404).json({ message: "Nenhuma registro encontrado"});
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    };
    
    listarRegistrosPorID = async (req, res, next) => {
        try {
                const id = req.params.id;
                const transacoesEncontrado = await this.entidadeservice.buscarPorId(id,this.populate);

                if (transacoesEncontrado !== null) {
                    res.status(200).json(transacoesEncontrado);
                } else {
                    res.status(404).json({ message: "Registro não encontrado"});
                }
        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    cadastrarRegistro = async (req,res, next) => {
        try {
            const novaTransacao = await this.entidadeservice.criar(req.body);
            
            if (novaTransacao !== null) {
                res.status(201).json({ message: "Registro criado com sucesso", transacao: novaTransacao });
            } else {
                next( new NaoEncontrado("Erro ao criar registro"));
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    atualizarRegistro = async (req, res, next) => {
        try {
                const id = req.params.id;
                const transacaoResultado = await this.entidadeservice.atualizar(id, req.body);
                if (transacaoResultado !== null) {
                    res.status(200).json( { message: "Registro atualizado com sucesso!"});
                } else {
                    next( new NaoEncontrado("Id do registro não encontrado"));
                }
        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    excluirRegistro = async (req, res, next) => {
        try {
                const id = req.params.id;
                const transacaoResultado = await this.entidadeservice.deletar(id);
                if (transacaoResultado !== null) {
                    res.status(200).json( { message: "Registro excluído com sucesso!"});
                } else {
                    next( new NaoEncontrado("Id do registro não encontrado"));
                }
        } catch (error) {
            console.error(error);
            next(error);
        }
    };
}

export default Controller;