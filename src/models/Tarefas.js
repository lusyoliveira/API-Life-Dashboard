import mongoose from "mongoose";
 
const tarefasSchema = new mongoose.Schema({
    Tarefa: { type: String, required: true },
    Adicionado: { type: String, required: true },
    Feito: { type: Boolean, required: true }
}, { versionKey: false });

const tarefas = mongoose.model("tarefas", tarefasSchema);

export default tarefas;