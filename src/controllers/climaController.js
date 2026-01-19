import NaoEncontrado from "../erros/NaoEncontrado.js";
import clima from "../models/Clima.js"

class ClimaController {
    static  listarClima = async (req, res, next) => {
        try {
                const listaclima = await clima.find({});

                if (listaclima !== null) {
                    res.status(200).json(listaclima);
                } else {
                    next( new NaoEncontrado("Nenhum clima encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static listarClimaPorID = async (req, res, next) => {
        try {
                const id = req.params.id;
                const climaEncontrado = await clima.findById(id);

                if (climaEncontrado !== null) {
                    res.status(200).json(climaEncontrado);
                } else {
                    next( new NaoEncontrado("Clima não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static cadastrarClima = async (req,res,next) => {
        try {
            const novoclima = await clima.create(req.body);

            if (novoclima !== null) {
                res.status(201).json({ message: "Clima criado com sucesso", clima: novoclima });
            } else {
                next( new NaoEncontrado("Erro ao criar clima"));
            }
        } catch (error) {
            next(error);
        }
    };

    static atualizarClima = async (req, res, next) => {
        try {
                const id = req.params.id;
                await clima.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Clima atualizado com sucesso!"});
        } catch (error) {
            next(error);
        }
    };

    static excluirClima = async (req, res, next) => {
        try {
                const id = req.params.id;
                await clima.findByIdAndDelete(id);
                res.status(200).json( { message: "Clima excluída com sucesso!"});
        } catch (error) {
            next(error);}
    };
};

export default ClimaController