import tarefa from "../models/Tarefas.js"

class TarefaController {
    static async listarTarefas(req, res) {
        try {
                const listaTarefas = await tarefa.find({});
                res.status(200).json(listaTarefas);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar as tarefas.`});
        }
    };

    static async listarTarefaPorID(req, res) {
        try {
                const id = req.params.id;
                const tarefaEncontrada = await tarefa.findById(id);
                res.status(200).json(tarefaEncontrada);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar a tarefa.`});
        }
    };

    static async cadastrarTarefa(req,res) {
        try {
            const novaTarefa = await tarefa.create(req.body);
            res.status(201).json({ message: "Tarefa criado com sucesso", tarefa: novaTarefa });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao criar a tarefa.`});
        }
    };

    static async atualizarTarefa(req, res) {
        try {
                const id = req.params.id;
                await tarefa.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Tarefa atualizada com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar a tarefa.`});
        }
    };

    static async excluirTarefa(req, res) {
        try {
                const id = req.params.id;
                await tarefa.findByIdAndDelete(id);
                res.status(200).json( { message: "Tarefa excluída com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir a tarefa.`});
        }
    };
};

export default TarefaController