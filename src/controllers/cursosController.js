import curso from "../models/Cursos.js"

class CursosController {
    static async listarCursos(req, res) {
        try {
                const listaCursos = await curso.find({});
                res.status(200).json(listaCursos);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consultar os cursos.`});
        }
    };

    static async listarCursosPorID(req, res) {
        try {
                const id = req.params.id;
                const cursoEncontrado = await curso.findById(id);
                res.status(200).json(cursoEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao consulta o curso.`});
        }
    };

    static async cadastrarCurso(req,res) {
        try {
            const novacurso = await curso.create(req.body);
            res.status(201).json({ message: "Curso criado com sucesso", curso: novacurso });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao criar um curso.`});
        }
    };

    static async atualizarCurso(req, res) {
        try {
                const id = req.params.id;
                await curso.findByIdAndUpdate(id, req.body);
                res.status(200).json( { message: "Curso atualizado com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar o Curso.`});
        }
    };

    static async excluirCurso(req, res) {
        try {
                const id = req.params.id;
                await curso.findByIdAndDelete(id);
                res.status(200).json( { message: "Curso excluído com sucesso!"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir o Curso.`});
        }
    };
};

export default CursosController