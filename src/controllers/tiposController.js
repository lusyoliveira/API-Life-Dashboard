import tipo from "../models/Tipos.js"

class TiposController {
    static async listarTipos(req, res) {
        try {
                const listaTipos = await tipo.find({});
                res.status(200).json(listaTipos);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar os tipos.`});
        }
    };

    static async listarTiposPorID(req, res) {
        try {
                const id = req.params.id;
                const tipoEncontrado = await tipo.findById(id);
                res.status(200).json(tipoEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar tipo.`});
        }
    };

    static async cadastrarTipo(req,res) {
        try {
            const novaAgendaTipos = await tipo.create(req.body);
            res.status(201).json({ message: "Tipo criado com sucesso", tipo: novaAgendaTipos });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao criar um tipo.`});
        }
    };

    static async atualizarTipo(req, res) {
        try {
                const id = req.params.id;
                await tipo.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Tipo atualizado com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar o tipo.`});
        }
    };

    static async excluirTipo(req, res) {
        try {
                const id = req.params.id;
                await tipo.findByIdAndDelete(id);
                res.status(200).json( { message: "Tipo excluído com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir o tipo.`});
        }
    };
};

export default TiposController