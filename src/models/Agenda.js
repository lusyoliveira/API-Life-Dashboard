import mongoose from "mongoose";
 
const agendaSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectID },
    Titulo: { type: String, required: true },
    Status: { type: String, required: true },
    Categoria: { type: String, required: true },
    Tipo: { type: String, required: true },
    Data: { type: String, required: true }
}, { versionKey: false });

const agenda = mongoose.model("agenda", agendaSchema);

export default agenda;