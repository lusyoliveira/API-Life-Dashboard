// Arquivo: servicos/catalogoService.js
import Service from './Services.js';
//import Catalogo from "../models/Catalogo.js";
import { Catalogo, Temporada, Episodio } from "../models/associacoes.js";
// Adicione a importação da conexão com o banco de dados aqui:
import sequelize from "../config/dbConexao.js";

class CatalogoServices extends Service {
    constructor() {
        super(Catalogo);
    }

    // Sobrescreve ou cria um método focado na atualização do progresso
    async atualizarProgressoEpisodios(id, assistidos) {
        // 1. Busca o registro atual para saber o total de episódios existentes
        const registro = await this.buscarPorId(id);
        if (!registro) return null;

        const totalEpisodios = registro.episodios;

        // Validação básica para evitar que o usuário assista mais episódios do que o total do catálogo
        if (assistidos > totalEpisodios) {
            throw new Error(`O número de episódios assistidos (${assistidos}) não pode ser maior que o total disponível (${totalEpisodios}).`);
        }

        // 2. Calcula a porcentagem do progresso (0 a 100)
        // Evita divisão por zero caso o total de episódios seja cadastrado como 0 por engano
        const progressoCalculado = totalEpisodios > 0 
            ? Math.round((assistidos / totalEpisodios) * 100) 
            : 0;

        // 3. Monta o objeto contendo apenas o que queremos alterar
        const dadosAtualizados = {
            assistidos: parseInt(assistidos),
            progresso: progressoCalculado
        };

        // 4. Salva no banco reutilizando a lógica base
        return await this.atualizar(id, dadosAtualizados);
    };

    // Sobrescreve o método criar para aceitar incluir as temporadas e episódios
    async criarCompleto(data) {
        const transaction = await sequelize.transaction();
        try {
            const novoCatalogo = await this.model.create(data, {
                include: [
                    {
                        model: Temporada,
                        as: 'listaTemporadas',
                        include: [
                            {
                                model: Episodio,
                                as: 'listaEpisodios'
                            }
                        ]
                    }
                ],
                transaction
            });

            await transaction.commit();
            return novoCatalogo;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    };

    async atualizarCompleto(id, data) {
        const transaction = await sequelize.transaction();
        try {
            // 1. Atualiza os dados principais do catálogo
            await this.model.update(data, { where: { id }, transaction });

            // 2. Se houver lista de temporadas atualizada no payload:
            if (data.listaTemporadas && Array.isArray(data.listaTemporadas)) {
                
                // Busca os IDs de todas as temporadas existentes deste título
                const temporadasAntigas = await Temporada.findAll({
                    where: { tituloId: id },
                    attributes: ['id'],
                    transaction
                });

                const idsTemporadasAntigas = temporadasAntigas.map(t => t.id);

                if (idsTemporadasAntigas.length > 0) {
                    // PASSO CRUCIAL: Apaga primeiro os episódios vinculados a essas temporadas
                    await Episodio.destroy({
                        where: { temporadaId: idsTemporadasAntigas },
                        transaction
                    });

                    // Agora apaga as temporadas antigas sem violar a Foreign Key
                    await Temporada.destroy({
                        where: { tituloId: id },
                        transaction
                    });
                }

                // 3. Re-insere a nova estrutura de temporadas e episódios
                for (const temp of data.listaTemporadas) {
                    const payloadTemporada = {
                        tituloId: id,
                        id_tmdb_temporada: temp.idTMDBTemporada || temp.id_tmdb_temporada,
                        numero_temporada: temp.numeroTemporada || temp.numero_temporada,
                        nome_temporada: temp.nomeTemporada || temp.nome_temporada,
                        sinopse: temp.sinopse,
                        estreia: temp.estreia ? new Date(temp.estreia) : null,
                        votos: temp.votosTemporada || temp.votos,
                        quantidade_episodios: temp.quantidadeEpisodios || temp.quantidade_episodios
                    };

                    const novaTemp = await Temporada.create(payloadTemporada, { transaction });

                    // Insere os episódios vinculados à nova temporada criada
                    if (temp.listaEpisodios && temp.listaEpisodios.length > 0) {
                        const episodiosFormatados = temp.listaEpisodios.map(ep => ({
                            temporadaId: novaTemp.id,
                            id_tmdb_episodio: ep.idTMDB || ep.id_tmdb_episodio,
                            numero_epidosio: ep.numeroEpisodio || ep.numero_epidosio,
                            assistido: ep.assistido ?? false,
                            titulo_epidosio: ep.tituloEpisodio || ep.titulo_epidosio,
                            sinopse: ep.sinopse,
                            duracao: ep.duracao,
                            estreia: ep.estreia ? new Date(ep.estreia) : null,
                            votos: ep.votos
                        }));

                        await Episodio.bulkCreate(episodiosFormatados, { transaction });
                    }
                }
            }

            await transaction.commit();
            return await this.buscarPorId(id);

        } catch (error) {
            await transaction.rollback();
            console.error("❌ Erro detalhado no backend ao atualizar catálogo:", error);
            throw error;
        }
    };
}

export default CatalogoServices;
