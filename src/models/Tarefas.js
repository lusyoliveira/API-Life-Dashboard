import mongoose from "mongoose";
 
const tarefasSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectID },
    Tarefa: { type: String, required: true },
    Adicionado: { type: String, required: true },
    Feito: { type: Boolean, required: true }
}, { versionKey: false });

const tarefas = mongoose.model("tarefas", tarefasSchema);

export default tarefas;