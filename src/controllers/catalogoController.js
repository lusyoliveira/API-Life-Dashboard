import Controller from "./Controller.js";
import CatalogoServices  from "../servicos/catalogoService.js";

const catalogo = new CatalogoServices();

class CatalogoController extends Controller {
    constructor() {
        super(catalogo);
        this.populate = [
            { association: "Tipo" },
            { association: "Plataforma" },
            { association: "Status" }
        ];
    }
    
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