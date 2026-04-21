import mongoose from "mongoose";
 
const cursoSchema = new mongoose.Schema({
    Capa: { type: String },
    Escola: { type: mongoose.Schema.Types.ObjectId, ref: 'plataformas', required: true },
    Aulas: { type: Number, required: true },
    Assistido: { type: Number },
    Horas: { type: Number },
    Name: { type: String, required: [true, "Nome é obrigatório"] },
    Professor:{ type: String, required: [true, "Professor é obrigatório"] },
    Assunto: { type: mongoose.Schema.Types.ObjectId, ref: 'areas', required: [true, "Assunto é obrigatório"] },
    Comprado: { type: String },
    Valor: { type: Number, required: [true, "Valor é obrigatório"] },
    Status: {type: mongoose.Schema.Types.ObjectId, ref: 'status', required: [true, "Status é obrigatório"]},
    Certificado: { type: Boolean },
    Progresso: { type: Number }
}, { versionKey: false });

const curso = mongoose.model("curso", cursoSchema);

export default curso;