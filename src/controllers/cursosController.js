import NaoEncontrado from "../erros/NaoEncontrado.js";
import curso from "../models/Cursos.js"

class CursosController {
    static  listarCursos = async(req, res, next) => {
        try {
                const listaCursos = await curso.find({}).populate([
                                                                    { path: "Escola" },
                                                                    { path: "Assunto" },
                                                                    { path: "Status" }
                                                                    ]);
                if (listaCursos !== null) {
                    res.status(200).json(listaCursos);
                } else {
                    next( new NaoEncontrado("Nenhum curso encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static listarCursosPorID = async (req, res, next) => {
        try {
                const id = req.params.id;
                const cursoEncontrado = await curso.findById(id).populate([
                                                                    { path: "Escola" },
                                                                    { path: "Assunto" },
                                                                    { path: "Status" }
                                                                    ]);
                if (cursoEncontrado !== null) {
                    res.status(200).json(cursoEncontrado);
                } else {
                    next( new NaoEncontrado("Curso não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static cadastrarCurso = async (req,res,next) => {
        try {
            const novacurso = await curso.create(req.body);

            if (novacurso !== null) {
                res.status(201).json({ message: "Curso criado com sucesso", curso: novacurso });
            } else {
                next( new NaoEncontrado("Erro ao criar curso"));
            }   
        } catch (error) {
            next(error);
        }
    };

    static atualizarCurso = async (req, res, next) => {
        try {
                const id = req.params.id;
                await curso.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Curso atualizado com sucesso!"});
        } catch (error) {
            next(error);
        }
    };

    static excluirCurso = async (req, res, next) => {
        try {
                const id = req.params.id;
                await curso.findByIdAndDelete(id);
                res.status(200).json( { message: "Curso excluído com sucesso!"});
        } catch (error) {
            next(error);
        }
    };
};

export default CursosController