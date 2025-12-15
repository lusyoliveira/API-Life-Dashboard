import mongoose from "mongoose";
 
const agendaSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectID },
    Titulo: { type: String },
    Status: { type: String },
    Categoria: { type: String},
    Tipo: { type: String },
    Data: { type: String }
}, { versionKey: false });

const agenda = mongoose.model("agenda", agendaSchema);

export default agenda;