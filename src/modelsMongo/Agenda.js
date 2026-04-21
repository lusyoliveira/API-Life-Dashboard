import mongoose from "mongoose";
 
const agendaSchema = new mongoose.Schema({
    Titulo: { type: String, 
        required: [true, "Título é obrigatório"] },
    Status: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'status', 
        required: [true, "Status é obrigatório"]},
    Categoria: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'categorias', 
        required: [true, "Categoria é obrigatória"]},
    Tipo: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'tipos', 
        required: [true, "Tipo é obrigatório"]},
    Data: { type: String, 
        required: [true, "Data é obrigatória"] }
}, { versionKey: false });

const agenda = mongoose.model("agenda", agendaSchema);

export default agenda;