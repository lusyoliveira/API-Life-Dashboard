import NaoEncontrado from "../erros/NaoEncontrado.js";
import tarefa from "../models/Tarefas.js"

class TarefaController {
    static  listarTarefas = async(req, res, next) => {
        try {
                const listaTarefas = await tarefa.find({});
                
                if (listaTarefas !== null) {
                res.status(200).json(listaTarefas);
                } else {
                next( new NaoEncontrado("Nenhuma tarefa encontrada"));
                }
        } catch (error) {
            next(error);
        }
    };

    static listarTarefaPorID = async (req, res, next) => {
        try {
                const id = req.params.id;
                const tarefaEncontrada = await tarefa.findById(id);
                if (tarefaEncontrada !== null) {
                    res.status(200).json(tarefaEncontrada);
                } else {
                    next( new NaoEncontrado("Tarefa não encontrada"));
                }
        } catch (error) {
            next(error);
        }
    };

    static cadastrarTarefa = async (req,res, next) => {
        try {
            const novaTarefa = await tarefa.create(req.body);

            if (novaTarefa !== null) {
                res.status(201).json({ message: "Tarefa criada com sucesso", tarefa: novaTarefa });
            } else {
            next( new NaoEncontrado("Erro ao criar tarefa"));
            }   
        } catch (error) {
            next(error);
        }
    };

    static atualizarTarefa = async (req, res, next) => {
        try {
                const id = req.params.id;
                await tarefa.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Tarefa atualizada com sucesso!"});
        } catch (error) {
            next(error);
        }
    };

    static excluirTarefa = async (req, res, next) => {
        try {
                const id = req.params.id;
                await tarefa.findByIdAndDelete(id);
                res.status(200).json( { message: "Tarefa excluída com sucesso!"});
        } catch (error) {
            next(error);
        }
    };
};

export default TarefaController