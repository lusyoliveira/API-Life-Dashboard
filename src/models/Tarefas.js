import mongoose from "mongoose";
 
const tarefasSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectID },
    id: { type: Number, required: true},
    Tarefa: { type: String},
    Adicionado: { type: String},
    Feito: { type: Boolean}
}, { versionKey: false });

const tarefas = mongoose.model("tarefas", tarefasSchema);

export default tarefas;