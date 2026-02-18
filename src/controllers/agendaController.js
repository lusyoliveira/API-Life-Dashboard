//import NaoEncontrado from "../erros/NaoEncontrado.js";
//import agenda from "../models/Agenda.js"
// import Categoria from "../models/Categoria.js";
// import Status from "../models/Status.js";
// import Tipo from "../models/Tipos.js";
import Controller from "./Controller.js";
import AgendaServices  from "../servicos/agendaServices.js";

const agendaServices = new AgendaServices();

class AgendaController extends Controller {
    constructor() {
        super(agendaServices);
        this.populate = [
            { path: "Tipo" },
            { path: "Categoria" },
            { path: "Status" }
        ];
    }

    listarAgendaporFiltro = async (req, res, next) => {
      try {
          const busca = await this.entidadeservice.buscarporFiltro(req.query);

          if (busca === null) {
              return res.status(200).json([]);
          }

          const resultado = await this.entidadeservice.model
              .find(busca)
              .populate(this.populate);

          res.status(200).json(resultado);

      } catch (erro) {
          next(erro);
      }
    };


  //   static listarCompromissos = async (req, res, next) => {
  //       try {
  //               const listaCompromissos = await agenda.find({}).populate([
  //                                                                   { path: "Tipo" },
  //                                                                   { path: "Categoria" },
  //                                                                   { path: "Status" }
  //                                                                   ]);
  //               if (listaCompromissos !== null) {                                                    
  //                   res.status(200).json(listaCompromissos);
  //               } else {
  //                   next( new NaoEncontrado("Nenhum compromisso encontrado"));
  //               }
  //       } catch (error) {
  //           next(error);
  //       }
  //   };

  //   static listarCompromissoPorID = async (req, res,next) => {
  //       try {
  //           const id = req.params.id;
  //           const agendaEncontrada = await agenda.findById(id).populate([
  //                                                               { path: "Tipo" },
  //                                                               { path: "Categoria" },
  //                                                               { path: "Status" }
  //                                                               ]);
  //           if (agendaEncontrada !== null) {
  //               res.status(200).send(agendaEncontrada);
  //           } else {
  //               next( new NaoEncontrado("Compromisso não encontrado"));    
  //           }
  //       } catch (error) {
  //          next(error);
  //       }
  //   };

  //   static cadastrarCompromisso = async (req,res,next) => {
  //       try {
  //           const novaAgenda = await agenda.create(req.body);

  //           if (novaAgenda !== null) {
  //           res.status(201).json({ message: "Compromisso criado com sucesso", agenda: novaAgenda });
  //           } else {
  //           next( new NaoEncontrado("Erro ao criar compromisso"));
  //           }
  //       } catch (error) {
  //           next(error);
  //       }
  //   };

  //   static atualizarCompromisso = async (req, res, next) => {
  //       try {
  //               const id = req.params.id;

  //               const agendaResultado = await agenda.findByIdAndUpdate(id, {$set: req.body});
                    
  //               if (agendaResultado !== null) {
  //               res.status(200).json( { message: "Compromisso atualizado com sucesso!"});
  //               } else {
  //               next( new NaoEncontrado("Id do compromisso não encontrado"));
  //               }
  //       } catch (error) {
  //           next(error);
  //       }
  //   };

  //   static excluirCompromisso = async (req, res, next) => {
  //       try {
  //               const id = req.params.id;
  //               const agendaResultado = await agenda.findByIdAndDelete(id);
  //               if (agendaResultado !== null) {
  //                   res.status(200).json( { message: "Compromisso excluído com sucesso!"});
  //               } else {
  //                   next( new NaoEncontrado("Id do compromisso não encontrado"));
  //               }
  //       } catch (error) {
  //           next(error);
  //       }
  //   };

  //   static listarAgendaporFiltro = async (req, res, next) => {
  //   try {
  //     const busca = await processaBusca(req.query);

  //     if (busca !== null) {
  //       const livrosResultado = agenda
  //         .find(busca)
  //         .populate("Categoria")
  //         .populate("Status")
  //         .populate("Tipo");

  //       req.resultado = livrosResultado;

  //       next();
  //     } else {
  //       res.status(200).send([]);
  //     }
  //   } catch (erro) {
  //     next(erro);
  //   }
  // };
}

// async function processaBusca(parametros) {
//   const { titulo, categoria, status, tipo } = parametros;

//   let busca = {};

//   if (titulo) {
//     busca.Titulo = { $regex: titulo, $options: "i" };
//   }

//   if (categoria) {
//     const categoriaEncontrada = await Categoria.findOne({
//         descricao: categoria
//     });

//     if (!categoriaEncontrada) {
//       return null;
//     }

//     busca.Categoria = categoriaEncontrada._id;
//   }

//   if (status) {
//     const statusEncontrado = await Status.findOne({
//         descricao: status
//     });

//     if (!statusEncontrado) {
//       return null;
//     }

//     busca.Status = statusEncontrado._id;
//   }

//   if (tipo) {
//     const tipoEncontrado = await Tipo.findOne({
//         descricao: tipo
//     });

//     if (!tipoEncontrado) {
//       return null;
//     }

//     busca.Tipo = tipoEncontrado._id;
//   }

//   return busca;
// }

export default new AgendaController();