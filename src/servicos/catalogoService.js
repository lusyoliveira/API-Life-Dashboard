import Service from './Services.js';
import { Catalogo, Temporada, Episodio } from "../models/associacoes.js";
import sequelize from "../config/dbConexao.js";
import ConfiguracaoServices from './configuracoesService.js';

const configuracaoService = new ConfiguracaoServices();


class CatalogoServices extends Service {
    constructor() {
        super(Catalogo);
    }   

    // Método criar para aceitar incluir as temporadas e episódios
    async salvarTituloCompleto(data) {
        const transaction = await sequelize.transaction();
        try {
            // Normaliza e mapeia o payload das temporadas e episódios para bater com os atributos do banco
            if (data.listaTemporadas && Array.isArray(data.listaTemporadas)) {
                data.listaTemporadas = data.listaTemporadas.map(temp => ({
                    tituloId: data.id,
                    id_tmdb_temporada: temp.id_tmdb_temporada || null,
                    numero_temporada: Number(temp.numero_temporada || null),
                    nome_temporada: temp.nome_temporada || null,
                    sinopse: temp.sinopse || null,
                    estreia: (temp.estreia && !isNaN(Date.parse(temp.estreia))) ? new Date(temp.estreia) : null,
                    votos: Number(temp.votos || null),
                    quantidade_episodios: Number(temp.quantidade_episodios || (temp.listaEpisodios ? temp.listaEpisodios.length : 0)) || null,
                    poster: temp.poster || null,
                    listaEpisodios: (temp.listaEpisodios || []).map(ep => ({
                        id_tmdb_episodio: ep.id_tmdb_episodio || ep.idTMDB,
                        numero_episodio: Number(ep.numero_episodio) || null,
                        assistido: ep.assistido ?? false,
                        titulo_episodio: ep.titulo_episodio || null,
                        sinopse: ep.sinopse || null,
                        duracao: Number(ep.duracao) || null,
                        estreia: (ep.estreia && !isNaN(Date.parse(ep.estreia))) ? new Date(ep.estreia) : null,
                        votos: Number(ep.votos) || null
                    }))
                }));
            }

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
            console.error("❌ Erro detalhado no backend ao salvar título completo:", error);
            throw error;
        }
    };

    async atualizarTituloCompleto(id, data) {
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
                    // Apaga primeiro os episódios vinculados a essas temporadas
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
                        id_tmdb_temporada: temp.id_tmdb_temporada,
                        numero_temporada: temp.numero_temporada,
                        nome_temporada: temp.nome_temporada,
                        sinopse: temp.sinopse,
                        estreia: temp.estreia ? new Date(temp.estreia) : null,
                        votos: temp.votos,
                        quantidade_episodios: temp.quantidade_episodios
                    };

                    const novaTemp = await Temporada.create(payloadTemporada, { transaction });

                    // Insere os episódios vinculados à nova temporada criada
                    if (temp.listaEpisodios && temp.listaEpisodios.length > 0) {
                        const episodiosFormatados = temp.listaEpisodios.map(ep => ({
                            temporadaId: novaTemp.id,
                            id_tmdb_episodio: ep.id_tmdb_episodio,
                            numero_episodio: ep.numero_episodio,
                            assistido: ep.assistido ?? false,
                            titulo_episodio: ep.titulo_episodio,
                            sinopse: ep.sinopse,
                            duracao: ep.duracao,
                            estreia: ep.estreia ? new Date(ep.estreia) : null,
                            poster: ep.poster,
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

    // Método focado na atualização do progresso
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

    // Atualiza todo catalogo do banco de dados com dados do TMDB
    async atualizarCatalogoTMDB() {
        const apikey =  await configuracaoService.buscarPorId(1);
        //Necessário implementar login para obter o id do usuário e pesquisar as configurações do banco por este id

        // Validação de segurança da chave
        if (!apikey) {
            console.error("🔴 Erro: Você esquecer de preencher a sua chave 'TMDB_API_KEY' no topo do arquivo!");
            process.exit(1);
        }
    
        try {
            console.log("⏳ Buscando registros que possuem ID do TMDB preenchido...");
    
            const titulosComTMDB = await Catalogo.findAll({
                where: {
                    id_tmdb: {
                        [Op.and]: [
                            { [Op.ne]: null },
                            { [Op.ne]: "" },
                            { [Op.ne]: "null" }
                        ]
                    }
                }
            });
    
            if (titulosComTMDB.length === 0) {
                console.log("✅ Nenhum título com ID TMDB encontrado no banco de dados.");
                return;
            }
    
            console.log(`🎬 Encontrados ${titulosComTMDB.length} títulos. Iniciando reconciliação...`);
    
            let atualizados = 0;
            let erros = 0;
    
            for (const item of titulosComTMDB) {
                // Identifica se é Filme ou Série com base no seu banco
                const stringTipo = typeof item.tipoId === 'object' ? item.tipoId.descricao : item.tipoId;
                const deparTipo = (item.media_type === 'movie' || stringTipo === 'Filme' || item.tipoId === 6) ? 'movie' : 'tv';
                
                // Tratamento do nome utilizando a nossa nova função Regex
                const tituloLimpo = limparNomeSerie(item.titulo);
                
                // 💡 Se o item já tiver o ID numérico correto do TMDB salvo, nós buscamos diretamente pelo ID!
                // Caso contrário, usamos a URL de busca por texto limpo
                const usaBuscaPorId = !isNaN(item.id_tmdb);
    
                // O bloco de URL construído seguindo a exata estrutura do seu método funcional:
                const urlFinal = usaBuscaPorId
                    ? `https://api.themoviedb.org/3/${deparTipo}/${item.id_tmdb}?api_key=${apikey}&language=pt-BR`
                    : `https://api.themoviedb.org/3/search${deparTipo}?api_key=${apikey}&query=${encodeURIComponent(tituloLimpo)}&language=pt-BR`;
    
                try {
                    const resposta = await fetch(urlFinal);
                    
                    if (!resposta.ok) {
                        throw new Error(`Resposta HTTP inválida: ${resposta.status}`);
                    }
                    
                    const dadosJson = await resposta.json();
                    
                    // Se foi busca por texto, pegamos o primeiro resultado do array. Se foi por ID, pegamos o objeto direto.
                    // Captura o objeto correto do primeiro resultado [0] se for uma pesquisa por texto
                    const dadosMidia = usaBuscaPorId 
                        ? dadosJson 
                        : (dadosJson.results && dadosJson.results.length > 0 ? dadosJson.results[0] : null);
    
    
                    if (dadosMidia && dadosMidia.poster_path) {
                        const urlPosterOficial = `https://image.tmdb.org/t/p/w500${dadosMidia.poster_path}`;
    
                        // Faz o download binário do poster pelo backend
                        const respostaImagem = await fetch(urlPosterOficial);
                        if (!respostaImagem.ok) throw new Error(`Falha ao baixar imagem do poster: HTTP ${respostaImagem.status}`);
                        
                        const arrayBuffer = await respostaImagem.arrayBuffer();
                        const bufferImagem = Buffer.from(arrayBuffer);
    
                        // Atualiza o registro no banco
                        await Catalogo.update(
                            { 
                                poster_path: bufferImagem,
                                capa: urlPosterOficial 
                            },
                            { where: { id: item.id } }
                        );
    
                        console.log(`✅ [${++atualizados}] Sincronizado: "${item.titulo}" (Buscado como: "${tituloLimpo}")`);
                    } else {
                        console.log(`⚠️ Pôster não localizado no TMDB para: "${item.titulo}"`);
                        erros++;
                    }
    
                    // Pequena pausa para evitar bloqueios de taxa de requisição
                    await new Promise(resolve => setTimeout(resolve, 200));
    
                } catch (err) {
                    console.error(`❌ Erro no título ID ${item.id} ("${item.titulo}"):`, err.message);
                    erros++;
                }
            }
    
            console.log(`\n🏁 Fim da execução! Sincronizados: ${atualizados} | Falhas: ${erros}`);
    
        } catch (error) {
            console.error("🔴 Ocorreu um erro crítico no banco ou na leitura dos arquivos:", error);
        } finally {
            process.exit(0);
        }
    }
}

export default CatalogoServices;
