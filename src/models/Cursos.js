import mongoose from "mongoose";
 
const cursoSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectID },
    Capa: { type: String },
    Escola: { type: String },
    Aulas: { type: Number },
    Assistido: { type: Number },
    Horas: { type: Number },
    Name: { type: String },
    Professor:{ type: String },
    Assunto: { type: String },
    Comprado: { type: Number },
    Valor: { type: Number },
    Status: { type: String },
    Certificado: { type: Boolean },
    Progresso: { type: Number }
}, { versionKey: false });

const curso = mongoose.model("curso", cursoSchema);

export default curso;