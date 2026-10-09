import Controller from "./Controller.js";
import CatalogoServices  from "../servicos/catalogoService.js";
import { urlParaBuffer } from "../utils/utils.js";

const catalogo = new CatalogoServices();

class CatalogoController extends Controller {
    constructor() {
        super(catalogo);
        // Populate Leve (Padrão para listagens/tabelas/cards)
        this.populate = [
            { association: "Tipo" },
            { association: "Plataforma" },
            { association: "Status" }
        ];

        // Populate Completo (Apenas para buscar 1 registro por ID na Modal)
        this.populateDetalhado = [
            { association: "Tipo" },
            { association: "Plataforma" },
            { association: "Status" },
            {
                association: "listaTemporadas",
                include: [
                    { association: "listaEpisodios" }
                ]
            }
        ];
    }
    
    // Sobrescreve a busca por ID para trazer a árvore completa (Título -> Temporadas -> Episódios)
    listarRegistrosPorID = async (req, res, next) => {
        try {
            const { id } = req.params;
            const registro = await this.entidadeservice.buscarPorId(id, this.populateDetalhado);

            if (registro) {
                res.status(200).json(registro);
            } else {
                res.status(404).json({ message: "Registro não encontrado" });
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    };
    
    buscarPorTitulo = async (req, res, next) => {
        try {
            // Pegamos o termo de busca e as configurações de paginação da URL
            // Se o usuário não passar limite ou pagina, o padrão será 10 e 1
            const { titulo, limite = 10, pagina = 1 } = req.query; 
            
            if (!titulo) {
                return res.status(400).json({ message: "O parâmetro 'titulo' é obrigatório para a busca." });
            }

            // Executa a busca paginada usando o serviço atualizado
            const resultado = await this.entidadeservice.buscarTodosPorCampo(
                'titulo', 
                titulo, 
                this.populate, 
                limite, 
                pagina
            );

            // Retorna os dados envelopados com informações úteis para o frontend criar a paginação visual
            res.status(200).json({
                totalRegistros: resultado.count,
                paginaAtual: parseInt(pagina),
                totalPaginas: Math.ceil(resultado.count / limite),
                dados: resultado.rows
            });

        } catch (error) {
            console.error(error);
            next(error);
        }   
    };

    // catalogoController.js - Função cadastrarRegistro
    cadastrarRegistro = async (req, res, next) => {
        try {
            const payload = req.body;

            // Conversão do poster do título principal
            if (payload.capa && payload.capa.startsWith('http')) {
            payload.poster_path = await urlParaBuffer(payload.capa);
            }

            // CORREÇÃO AQUI: Percorrer a lista de temporadas (array)
            if (payload.listaTemporadas && Array.isArray(payload.listaTemporadas)) {
                for (const temp of payload.listaTemporadas) {
                    if (
                    temp.poster &&
                    typeof temp.poster === 'string' &&
                    temp.poster.startsWith('http')
                    ) {
                    temp.poster = await urlParaBuffer(temp.poster);
                    }
                }
            }

            const novoRegistro =
            await this.entidadeservice.salvarTituloCompleto(payload);
            return res
            .status(201)
            .json({ message: 'Registro criado com sucesso', registro: novoRegistro });
        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    // Sobrescreve o atualizarRegistro do Controller base
    atualizarRegistro = async (req, res, next) => {
        try {
            const { id } = req.params;
            const payload = req.body;

            if (payload.capa) {
                payload.poster_path = await urlParaBuffer(payload.capa);
            }

            if (payload.listaTemporadas && Array.isArray(payload.listaTemporadas)) {
                for (const temporada of payload.listaTemporadas) {
                    if (
                    temporada.poster &&
                    temporada.poster.startsWith('http')
                    ) {
                    temporada.poster = await urlParaBuffer(
                        temporada.poster,
                    );
                    }
                }
            }

            const registroAtualizado = await this.entidadeservice.atualizarTituloCompleto(id, payload);
            if (registroAtualizado) {
                return res.status(200).json({ message: "Registro atualizado com sucesso!", registro: registroAtualizado });
            } else {
                return res.status(404).json({ message: "Id do registro não encontrado" });
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    atualizarProgresso = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { assistidos } = req.body;

            // Validação rápida do corpo da requisição
            if (assistidos === undefined || assistidos === null) {
                return res.status(400).json({ message: "O campo 'assistidos' é obrigatório no corpo da requisição." });
            }

            // Chama a regra de negócio que criamos no CatalogoServices
            const registroAtualizado = await this.entidadeservice.atualizarProgressoEpisodios(id, assistidos);

            if (registroAtualizado) {
                res.status(200).json({ 
                    message: "Progresso atualizado com sucesso!",
                    registro: registroAtualizado 
                });
            } else {
                res.status(404).json({ message: "Id do registro não encontrado." });
            }
        } catch (error) {
            // Se cair na nossa validação de "assistidos > totalEpisodios", devolvemos erro 400
            if (error.message.includes("não pode ser maior")) {
                return res.status(400).json({ message: error.message });
            }
            console.error(error);
            next(error);
        }
    };
};

export default new CatalogoController();