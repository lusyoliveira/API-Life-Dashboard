import mongoose from "mongoose";
 
const statusSchema = new mongoose.Schema({
    descricao: { type: String, required: true }
}, { versionKey: false });

const status = mongoose.model("status", statusSchema);

export default status;