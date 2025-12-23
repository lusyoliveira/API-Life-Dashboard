import mongoose from "mongoose";
 
const agendastatusSchema = new mongoose.Schema({
    descricao: { type: String, required: true }
}, { versionKey: false });

const agendaStatus = mongoose.model("agendastatus", agendastatusSchema);

export default agendaStatus;