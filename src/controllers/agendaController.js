import NaoEncontrado from "../erros/NaoEncontrado.js";
import agenda from "../models/Agenda.js"
//import Categoria from "../models/Categoria.js";

class AgendaController {
    static listarCompromissos = async (req, res, next) => {
        try {
                const listaCompromissos = await agenda.find({}).populate([
                                                                    { path: "Tipo" },
                                                                    { path: "Categoria" },
                                                                    { path: "Status" }
                                                                    ]);
                if (listaCompromissos !== null) {                                                    
                    res.status(200).json(listaCompromissos);
                } else {
                    next( new NaoEncontrado("Nenhum compromisso encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static listarCompromissoPorID = async (req, res,next) => {
        try {
            const id = req.params.id;
            const agendaEncontrada = await agenda.findById(id).populate([
                                                                { path: "Tipo" },
                                                                { path: "Categoria" },
                                                                { path: "Status" }
                                                                ]);
            if (agendaEncontrada !== null) {
                res.status(200).send(agendaEncontrada);
            } else {
                next( new NaoEncontrado("Compromisso não encontrado"));    
            }
        } catch (error) {
           next(error);
        }
    };

    static cadastrarCompromisso = async (req,res,next) => {
        try {
            const novaAgenda = await agenda.create(req.body);

            if (novaAgenda !== null) {
            res.status(201).json({ message: "Compromisso criado com sucesso", agenda: novaAgenda });
            } else {
            next( new NaoEncontrado("Erro ao criar compromisso"));
            }
        } catch (error) {
            next(error);
        }
    };

    static atualizarCompromisso = async (req, res, next) => {
        try {
                const id = req.params.id;

                const agendaResultado = await agenda.findByIdAndUpdate(id, {$set: req.body});
                    
                if (agendaResultado !== null) {
                res.status(200).json( { message: "Compromisso atualizado com sucesso!"});
                } else {
                next( new NaoEncontrado("Id do compromisso não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static excluirCompromisso = async (req, res, next) => {
        try {
                const id = req.params.id;
                const agendaResultado = await agenda.findByIdAndDelete(id);
                if (agendaResultado !== null) {
                    res.status(200).json( { message: "Compromisso excluído com sucesso!"});
                } else {
                    next( new NaoEncontrado("Id do compromisso não encontrado"));
                }
        } catch (error) {
            next(error);
        }
    };

    static listarAgendaporFiltro = async (req, res, next) => {
        try {
            const busca = await processaBusca(req.query);

            if (busca !== null) {
                const agendaFiltrada = await agenda
                    .find(busca)
                    .populate([
                    { path: "Tipo" },
                    { path: "Categoria" },
                    { path: "Status" }
                ]); 
                res.status(200).json(agendaFiltrada);
            } else {
                res.status(200).json([]); 
            }
        } catch (error) {
            next(error);
        }
    };
    
}
async function processaBusca(parametros){
    const { Titulo, nomeCategoria } = parametros;
    let busca = {};

    if (Titulo)  busca.Titulo = { $regex: Titulo, $options: "i" };

    if (nomeCategoria) {
        const Categoria = await Categoria.findOne({ Nome: nomeCategoria });
        
        if (Categoria !== null) {                
            busca.Categoria = Categoria._id;
        } else {
            busca = null;
        }
    }
    return busca;
}

export default AgendaController