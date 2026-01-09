import areas from "../models/Areas.js"

class AreasController {
    static async listarAreas(req, res) {
        try {
                const listaAreas = await areas.find({});
                res.status(200).json(listaAreas);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar as areas.`});
        }
    };

    static async listarAreasPorID(req, res) {
        try {
                const id = req.params.id;
                const areaEncontrado = await areas.findById(id);
                res.status(200).json(areaEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar area.`});
        }
    };

    static async cadastrarAreas(req,res) {
        try {
            const novaAgendaAreas = await areas.create(req.body);
            res.status(201).json({ message: "Area criada com sucesso", area: novaAgendaAreas });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao criar uma area.`});
        }
    };

    static async atualizarAreas(req, res) {
        try {
                const id = req.params.id;
                await areas.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Area atualizada com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar a area.`});
        }
    };

    static async excluirAreas(req, res) {
        try {
                const id = req.params.id;
                await areas.findByIdAndDelete(id);
                res.status(200).json( { message: "Area excluída com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir a area.`});
        }
    };
};

export default AreasController