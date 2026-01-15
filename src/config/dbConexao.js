import mongoose from "mongoose";

async function conectar() {
    mongoose.connect(process.env.DATABASE_URL)

    return mongoose.connection;
};

export default conectar;

