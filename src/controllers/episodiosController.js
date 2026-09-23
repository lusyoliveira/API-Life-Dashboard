import Controller from "./Controller.js";
import EpisodioServices from "../servicos/episodioService.js";

const episodioService = new EpisodioServices();

class EpisodioController extends Controller {
    constructor() {
        super(episodioService);
    }

    listarPorTemporada = async (req, res, next) => {
        try {
            const { temporadaId } = req.params;
            const episodios = await this.entidadeservice.listarPorTemporadaId(temporadaId);
            return res.status(200).json(episodios);
        } catch (error) {
            next(error);
        }
    };

    marcarAssistido = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { assistido } = req.body; // boolean: true ou false

            const episodioAtualizado = await this.entidadeservice.alternarAssistido(id, assistido);
            
            if (!episodioAtualizado) {
                return res.status(404).json({ message: "Episódio não encontrado." });
            }

            return res.status(200).json({
                message: "Status do episódio atualizado com sucesso!",
                episodio: episodioAtualizado
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new EpisodioController();