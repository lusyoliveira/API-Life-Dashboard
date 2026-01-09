import categoria from "../models/Categoria.js"

class CategoriasController {
    static async listarCategorias(req, res) {
        try {
                const listaCategorias = await categoria.find({});
                res.status(200).json(listaCategorias);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar os categorias.`});
        }
    };

    static async listarCategoriasPorID(req, res) {
        try {
                const id = req.params.id;
                const categoriaEncontrada = await categoria.findById(id);
                res.status(200).json(categoriaEncontrada);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar categoria.`});
        }
    };

    static async cadastrarCategoria(req,res) {
        try {
            const novaAgendaCategorias = await categoria.create(req.body);
            res.status(201).json({ message: "Categoria criado com sucesso", categoria: novaAgendaCategorias });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao criar um categoria.`});
        }
    };

    static async atualizarCategoria(req, res) {
        try {
                const id = req.params.id;
                await categoria.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Categoria atualizado com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar o categoria.`});
        }
    };

    static async excluirCategoria(req, res) {
        try {
                const id = req.params.id;
                await categoria.findByIdAndDelete(id);
                res.status(200).json( { message: "Categoria excluído com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir o categoria.`});
        }
    };
};

export default CategoriasController