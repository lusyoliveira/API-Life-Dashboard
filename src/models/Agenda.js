import mongoose from "mongoose";
 
const agendaSchema = new mongoose.Schema({
    Titulo: { type: String, required: true },
    Status: {type: mongoose.Schema.Types.ObjectId, ref: 'status', required: true},
    Categoria: {type: mongoose.Schema.Types.ObjectId, ref: 'categorias', required: true},
    Tipo: {type: mongoose.Schema.Types.ObjectId, ref: 'tipos', required: true},
    Data: { type: String, required: true }
}, { versionKey: false });

const agenda = mongoose.model("agenda", agendaSchema);

export default agenda;