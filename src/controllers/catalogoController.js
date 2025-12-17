import catalogo from "../models/Catalogo.js"

class CatalogoController {
    static async listarCatalogo(req, res) {
        try {
                const listaCatalogo = await catalogo.find({});
                res.status(200).json(listaCatalogo);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar o catalogo.`});
        }
    };

    static async listarCatalogoPorID(req, res) {
        try {
                const id = req.params.id;
                const catalogoEncontrado = await catalogo.findById(id);
                res.status(200).json(catalogoEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar um item do catalogo.`});
        }
    };

    static async cadastrarCatalogo(req,res) {
        try {
            const novacatalogo = await catalogo.create(req.body);
            res.status(201).json({ message: "Item criado com sucesso", catalogo: novacatalogo });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao criar um item no catalogo.`});
        }
    };

    static async atualizarCatalogo(req, res) {
        try {
                const id = req.params.id;
                await catalogo.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Item atualizada com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar o item no catalogo.`});
        }
    };

    static async excluirCatalogo(req, res) {
        try {
                const id = req.params.id;
                await catalogo.findByIdAndDelete(id);
                res.status(200).json( { message: "Item excluído com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir o item no catalogo.`});
        }
    };
};

export default CatalogoController