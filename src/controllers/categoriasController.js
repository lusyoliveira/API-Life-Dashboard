import NaoEncontrado from "../erros/NaoEncontrado.js";
import categoria from "../models/Categoria.js"

class CategoriasController {
    static listarCategorias = async (req, res, next) => {
        try {
                const listaCategorias = await categoria.find({});

                if (listaCategorias !== null) {
                    res.status(200).json(listaCategorias);
                } else {
                    next( new NaoEncontrado("Nenhum categoria encontrado"));
                }               
                    
        } catch (error) {
            next(error);
        }
    };

    static listarCategoriasPorID = async (req, res, next) => {
        try {
                const id = req.params.id;
                const categoriaEncontrada = await categoria.findById(id);
                
                if (categoriaEncontrada !== null) {
                    res.status(200).json(categoriaEncontrada);
                } else {
                    next( new NaoEncontrado("Categoria não encontrada"));
                }
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar categoria.`});
        }
    };

    static cadastrarCategoria = async (req,res,next) => {
        try {
            const novaCategoria = await categoria.create(req.body);
           
            if (novaCategoria !== null) {
                res.status(201).json({ message: "Categoria criada com sucesso", categoria: novaCategoria });
            } else {
                next( new NaoEncontrado("Erro ao criar categoria"));
            }
        } catch (error) {
            next(error);
        }
    };

    static async atualizarCategoria(req, res, next) {
        try {
                const id = req.params.id;
                const categoriaResultado = await categoria.findByIdAndUpdate(id, {$set: req.body});
                if (categoriaResultado !== null) {
                res.status(200).json( { message: "Categoria atualizada com sucesso!"});
                } else {
                next( new NaoEncontrado("Id da categoria não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static async excluirCategoria(req, res, next) {
        try {
                const id = req.params.id;
                const categoriaResultado = await categoria.findByIdAndDelete(id);
                if (categoriaResultado !== null) {
                    res.status(200).json( { message: "Categoria excluída com sucesso!"});
                } else {
                    next( new NaoEncontrado("Id da categoria não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };
};

export default CategoriasController