import NaoEncontrado from "../erros/NaoEncontrado.js";
import catalogo from "../models/Catalogo.js"

class CatalogoController {
    static listarCatalogo = async (req, res, next) => {
        try {
                const listaCatalogo = await catalogo.find({}).populate([
                                                                    { path: "Tipo" },
                                                                    { path: "Onde" },
                                                                    { path: "Status" }
                                                                    ]);
                if (listaCatalogo !== null) {                                                    
                    res.status(200).json(listaCatalogo);
                } else {
                    next( new NaoEncontrado("Nenhum item encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static listarCatalogoPorID = async (req, res, next) => {
        try {
                const id = req.params.id;
                const catalogoEncontrado = await catalogo.findById(id).populate([
                                                                    { path: "Tipo" },
                                                                    { path: "Onde" },
                                                                    { path: "Status" }
                                                                    ]);
                if (catalogoEncontrado !== null) {                                                   
                 res.status(200).json(catalogoEncontrado);
                } else {
                 next( new NaoEncontrado("Item não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static cadastrarCatalogo = async (req,res,next) => {
        try {
            const novacatalogo = await catalogo.create(req.body);
            
            if (novacatalogo !== null) {
                res.status(201).json({ message: "Item criado com sucesso", catalogo: novacatalogo });
            } else {
                next( new NaoEncontrado("Erro ao criar item"));
            }
        } catch (error) {
            next(error);
        }
    };

    static atualizarCatalogo = async (req, res, next) => {
        try {
                const id = req.params.id;
                await catalogo.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Item atualizada com sucesso!"});
        } catch (error) {
            next(error);
        }
    };

    static excluirCatalogo = async (req, res, next) => {
        try {
                const id = req.params.id;
                await catalogo.findByIdAndDelete(id);
                res.status(200).json( { message: "Item excluído com sucesso!"});
        } catch (error) {
            next(error);
        }
    };
};

export default CatalogoController