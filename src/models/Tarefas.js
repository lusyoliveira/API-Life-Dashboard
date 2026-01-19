import mongoose from "mongoose";
 
const tarefasSchema = new mongoose.Schema({
    Tarefa: { type: String, required: [true, "Tarefa é obrigatória"] },
    Adicionado: { type: String, required: [true, "Adicionado é obrigatório"] },
    Feito: { type: Boolean, required: [true, "Feito é obrigatório"] }
}, { versionKey: false });

const tarefas = mongoose.model("tarefas", tarefasSchema);

export default tarefas;