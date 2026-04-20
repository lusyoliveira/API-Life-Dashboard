import NaoEncontrado from "../erros/NaoEncontrado.js";

class Controller {
    constructor(entidadeservice) {
        this.entidadeservice = entidadeservice;
    }

    listarTodosRegistros = async(req, res, next)  =>  {
        try {
            const lista = await this.entidadeservice.buscarTodos(this.populate);
            if (lista && lista.length > 0) {                                                    
                res.status(200).json(lista);
            } else {
                res.status(200).json([]); 
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    };
    
    listarRegistrosPorID = async (req, res, next) => {
        try {
                const id = req.params.id;
                const registro = await this.entidadeservice.buscarPorId(id,this.populate);

                if (registro) {
                    res.status(200).json(registro);
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
            const novoRegistro = await this.entidadeservice.criar(req.body);
            
            if (novoRegistro !== null) {
                res.status(201).json({ message: "Registro criado com sucesso", registro: novoRegistro });
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
                const registroAtualizado = await this.entidadeservice.atualizar(id, req.body);
                if (registroAtualizado) {
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
                const registroExcluido = await this.entidadeservice.deletar(id);
                if (registroExcluido) {
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