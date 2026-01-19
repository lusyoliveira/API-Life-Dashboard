import NaoEncontrado from "../erros/NaoEncontrado.js";
import plataforma from "../models/Plataforma.js"

class PlataformaController {
    static  listarPlataformas = async(req, res, next) => {
        try {
                const listaPlataformas = await plataforma.find({});
                
                if (listaPlataformas !== null) {
                res.status(200).json(listaPlataformas);
                } else {
                next( new NaoEncontrado("Nenhuma plataforma encontrada"));
                }
        } catch (error) {
            next(error);
        }
    };

    static listarPlataformasPorID = async (req, res, next) => {
        try {
                const id = req.params.id;
                const plataformaEncontrada = await plataforma.findById(id);
                if (plataformaEncontrada !== null) {
                    res.status(200).json(plataformaEncontrada);
                } else {
                    next( new NaoEncontrado("Plataforma não encontrada"));
                }
        } catch (error) {
            next(error);
        }
    };

    static cadastrarPlataforma = async (req,res,next) => {
        try {
            const novaPlataforma = await plataforma.create(req.body);

            if (novaPlataforma !== null) {
                res.status(201).json({ message: "Plataforma criada com sucesso", plataforma: novaPlataforma });
            } else {
            next( new NaoEncontrado("Erro ao criar plataforma"));
            }
        } catch (error) {
            next(error);
        }
    };

    static atualizarPlataforma = async (req, res, next) => {
        try {
                const id = req.params.id;
                await plataforma.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Plataforma atualizado com sucesso!"});
        } catch (error) {
            next(error);
        }
    };

    static excluirPlataforma = async (req, res, next) => {
        try {
                const id = req.params.id;
                await plataforma.findByIdAndDelete(id);
                res.status(200).json( { message: "Plataforma excluído com sucesso!"});
        } catch (error) {
            next(error);
        }
    };
};

export default PlataformaController