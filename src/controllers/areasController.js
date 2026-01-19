import NaoEncontrado from "../erros/NaoEncontrado.js";
import areas from "../models/Areas.js"

class AreasController {
    static listarAreas = async (req, res, next) => {
        try {
                const listaAreas = await areas.find({});

                if (listaAreas !== null) {
                res.status(200).json(listaAreas);
                } else {
                next( new NaoEncontrado("Nenhuma area encontrada"));
                }
        } catch (error) {
            next(error);
        }
    };

    static listarAreasPorID = async (req, res, next) => {
        try {
            const id = req.params.id;
            const areaEncontrado = await areas.findById(id);

            if (areaEncontrado !== null) {
                res.status(200).json(areaEncontrado);
            } else {
                next( new NaoEncontrado("Area não encontrada"));
            }
        } catch (error) {
            next(error);
        }
    };

    static cadastrarAreas = async (req, res, next) =>    {
        try {
            const novaAgendaAreas = await areas.create(req.body);

            if (novaAgendaAreas !== null) {
                res.status(201).json({ message: "Area criada com sucesso", area: novaAgendaAreas });
            } else {
            next( new NaoEncontrado("Erro ao criar area"));
            }
        } catch (error) {
            next(error);
        }
    };

    static atualizarAreas = async (req, res, next) => {
        try {
                const id = req.params.id;
                
                await areas.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Area atualizada com sucesso!"});
        } catch (error) {
            next(error);
        }
    };

    static excluirAreas = async (req, res, next) => {
        try {
                const id = req.params.id;
                await areas.findByIdAndDelete(id);
                res.status(200).json( { message: "Area excluída com sucesso!"});
        } catch (error) {
            next(error);
        }
    };
};

export default AreasController