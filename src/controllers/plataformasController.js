import plataforma from "../models/Plataforma.js"

class PlataformaController {
    static async listarPlataformas(req, res) {
        try {
                const listaPlataformas = await plataforma.find({});
                res.status(200).json(listaPlataformas);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar os plataformas.`});
        }
    };

    static async listarPlataformasPorID(req, res) {
        try {
                const id = req.params.id;
                const plataformaEncontrada = await plataforma.findById(id);
                res.status(200).json(plataformaEncontrada);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar plataforma.`});
        }
    };

    static async cadastrarPlataforma(req,res) {
        try {
            const novaPlataforma = await plataforma.create(req.body);
            res.status(201).json({ message: "Plataforma criado com sucesso", plataforma: novaPlataforma });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao criar um plataforma.`});
        }
    };

    static async atualizarPlataforma(req, res) {
        try {
                const id = req.params.id;
                await plataforma.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Plataforma atualizado com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar o plataforma.`});
        }
    };

    static async excluirPlataforma(req, res) {
        try {
                const id = req.params.id;
                await plataforma.findByIdAndDelete(id);
                res.status(200).json( { message: "Plataforma excluído com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir o plataforma.`});
        }
    };
};

export default PlataformaController