import clima from "../models/Clima.js"

class ClimaController {
    static async listarClima(req, res) {
        try {
                const listaclima = await clima.find({});
                res.status(200).json(listaclima);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar as clima.`});
        }
    };

    static async listarClimaPorID(req, res) {
        try {
                const id = req.params.id;
                const climaEncontrado = await clima.findById(id);
                res.status(200).json(climaEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consulta o clima.`});
        }
    };

    static async cadastrarClima(req,res) {
        try {
            const novaclima = await clima.create(req.body);
            res.status(201).json({ message: "Clima criado com sucesso", clima: novaclima });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao criar um clima.`});
        }
    };

    static async atualizarClima(req, res) {
        try {
                const id = req.params.id;
                await clima.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Clima atualizado com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar o clima.`});
        }
    };

    static async excluirClima(req, res) {
        try {
                const id = req.params.id;
                await clima.findByIdAndDelete(id);
                res.status(200).json( { message: "Clima excluída com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir o clima.`});
        }
    };
};

export default ClimaController