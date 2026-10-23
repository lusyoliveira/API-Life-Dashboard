import Service from './Services.js';
import { Catalogo, Temporada, Episodio } from "../models/associacoes.js";
import sequelize from "../config/dbConexao.js";
import ConfiguracaoServices from './configuracoesService.js';
import { urlParaBuffer, processarDownloadPosterBackend } from "../utils/utils.js";

const configuracaoService = new ConfiguracaoServices();

class CatalogoServices extends Service {
    constructor() {
        super(Catalogo);
    }   

    // Método criar para aceitar incluir as temporadas e episódios
    async salvarTituloCompleto(data) {
        const transaction = await sequelize.transaction();
        try {
            // 1. Trata o pôster do título principal (capa -> poster_path)
            if (data.capa) {
                data.poster_path = await this.verificarPoster(data.capa, data.titulo);
            }

            // 2. Normaliza, mapeia e trata os pôsters das temporadas e episódios
            if (data.listaTemporadas && Array.isArray(data.listaTemporadas)) {
                for (const temp of data.listaTemporadas) {
                    // Se a temporada tiver poster em URL, aplica a verificação
                    if (temp.poster && typeof temp.poster === 'string' && temp.poster.startsWith('http')) {
                        temp.poster = await this.verificarPoster(temp.poster, `${data.titulo} - Temp ${temp.numero_temporada}`);
                    }
                }

                data.listaTemporadas = data.listaTemporadas.map(temp => ({
                    tituloId: data.id,
                    id_tmdb_temporada: temp.id_tmdb_temporada || null,
                    numero_temporada: Number(temp.numero_temporada || null),
                    nome_temporada: temp.nome_temporada || null,
                    sinopse: temp.sinopse || null,
                    estreia: (temp.estreia && !isNaN(Date.parse(temp.estreia))) ? new Date(temp.estreia) : null,
                    votos: Number(temp.votos || null),
                    quantidade_episodios: Number(temp.quantidade_episodios || (temp.listaEpisodios ? temp.listaEpisodios.length : 0)) || null,
                    poster: temp.poster || null, // Já vem tratado com buffer ou caminho local acima
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
            // 1. Trata e atualiza o pôster do título principal apenas se necessário
            if (data.capa) {
                data.poster_path = await this.verificarPoster(data.capa, data.titulo);
            }

            // Atualiza os dados principais do catálogo
            await this.model.update(data, { where: { id }, transaction });

            // 2. Se houver lista de temporadas no payload, fazemos o gerenciamento sem apagar tudo
            if (data.listaTemporadas && Array.isArray(data.listaTemporadas)) {
                
                // Busca as temporadas que já existem no banco para este título
                const temporadasAntigas = await Temporada.findAll({
                    where: { tituloId: id },
                    include: [{ model: Episodio, as: 'listaEpisodios' }],
                    transaction
                });

                // Mapeia as temporadas antigas por ID ou Número/TMDB para facilitar a localização
                const mapaTemporadasAntigas = new Map();
                temporadasAntigas.forEach(t => {
                    // Chave principal por ID, ou fallback por número da temporada
                    if (t.id) mapaTemporadasAntigas.set(String(t.id), t);
                    mapaTemporadasAntigas.set(`num_${t.numero_temporada}`, t);
                });

                const idsTemporadasRecebidas = new Set();

                for (const temp of data.listaTemporadas) {
                    // Tenta achar a temporada existente pelo ID enviado ou pelo número dela
                    let temporadaExistente = null;
                    if (temp.id && mapaTemporadasAntigas.has(String(temp.id))) {
                        temporadaExistente = mapaTemporadasAntigas.get(String(temp.id));
                    } else if (temp.numero_temporada && mapaTemporadasAntigas.has(`num_${temp.numero_temporada}`)) {
                        temporadaExistente = mapaTemporadasAntigas.get(`num_${temp.numero_temporada}`);
                    }

                    let temporadaIdFinal;

                    if (temporadaExistente) {
                        //Mantém estritamente o pôster antigo que já estava no banco, ignorando qualquer alteração de pôster na temporada
                         temporadaIdFinal = temporadaExistente.id;
                        idsTemporadasRecebidas.add(temporadaIdFinal);

                        await Temporada.update({
                            tituloId: id,
                            id_tmdb_temporada: temp.id_tmdb_temporada || temporadaExistente.id_tmdb_temporada,
                            numero_temporada: temp.numero_temporada ?? temporadaExistente.numero_temporada,
                            nome_temporada: temp.nome_temporada || temporadaExistente.nome_temporada,
                            sinopse: temp.sinopse || temporadaExistente.sinopse,
                            estreia: (temp.estreia && !isNaN(Date.parse(temp.estreia))) ? new Date(temp.estreia) : temporadaExistente.estreia,
                            votos: temp.votos ?? temporadaExistente.votos,
                            quantidade_episodios: temp.quantidade_episodios ?? temporadaExistente.quantidade_episodios,
                            poster: temporadaExistente.poster 
                        }, {
                            where: { id: temporadaIdFinal },
                            transaction
                        });

                    } else {
                        // Se for uma temporada totalmente nova adicionada depois, criamos ela (com o pôster que veio, se houver)
                        let posterNovoTemp = temp.poster;
                        if (posterNovoTemp && typeof posterNovoTemp === 'string' && posterNovoTemp.startsWith('http')) {
                            posterNovoTemp = await this.verificarPoster(posterNovoTemp, `${data.titulo} - Temp ${temp.numero_temporada}`);
                        }

                        const novaTemp = await Temporada.create({
                            tituloId: id,
                            id_tmdb_temporada: temp.id_tmdb_temporada || null,
                            numero_temporada: Number(temp.numero_temporada) || null,
                            nome_temporada: temp.nome_temporada || null,
                            sinopse: temp.sinopse || null,
                            estreia: (temp.estreia && !isNaN(Date.parse(temp.estreia))) ? new Date(temp.estreia) : null,
                            votos: Number(temp.votos) || null,
                            quantidade_episodios: Number(temp.quantidade_episodios) || null,
                            poster: posterNovoTemp || null
                        }, { transaction });

                        temporadaIdFinal = novaTemp.id;
                        idsTemporadasRecebidas.add(temporadaIdFinal);
                    }

                    // 3. Gerenciamento dos episódios da temporada
                    if (temp.listaEpisodios && Array.isArray(temp.listaEpisodios)) {
                        // Busca episódios já existentes dessa temporada no banco
                        const episodiosAntigos = await Episodio.findAll({
                            where: { temporadaId: temporadaIdFinal },
                            transaction
                        });

                        const mapaEpisodiosAntigos = new Map();
                        episodiosAntigos.forEach(ep => {
                            if (ep.id) mapaEpisodiosAntigos.set(String(ep.id), ep);
                            mapaEpisodiosAntigos.set(`num_${ep.numero_episodio}`, ep);
                        });

                        const idsEpisodiosRecebidos = new Set();

                        for (const ep of temp.listaEpisodios) {
                            let episodioExistente = null;
                            if (ep.id && mapaEpisodiosAntigos.has(String(ep.id))) {
                                episodioExistente = mapaEpisodiosAntigos.get(String(ep.id));
                            } else if (ep.numero_episodio && mapaEpisodiosAntigos.has(`num_${ep.numero_episodio}`)) {
                                episodioExistente = mapaEpisodiosAntigos.get(`num_${ep.numero_episodio}`);
                            }

                            if (episodioExistente) {
                                idsEpisodiosRecebidos.add(episodioExistente.id);
                                await Episodio.update({
                                    id_tmdb_episodio: ep.id_tmdb_episodio || episodioExistente.id_tmdb_episodio,
                                    numero_episodio: ep.numero_episodio ?? episodioExistente.numero_episodio,
                                    assistido: ep.assistido ?? episodioExistente.assistido,
                                    titulo_episodio: ep.titulo_episodio || episodioExistente.titulo_episodio,
                                    sinopse: ep.sinopse || episodioExistente.sinopse,
                                    duracao: ep.duracao ?? episodioExistente.duracao,
                                    estreia: (ep.estreia && !isNaN(Date.parse(ep.estreia))) ? new Date(ep.estreia) : episodioExistente.estreia,
                                    votos: ep.votos ?? episodioExistente.votos
                                }, {
                                    where: { id: episodioExistente.id },
                                    transaction
                                });
                            } else {
                                // Cria episódio novo se não existia
                                const novoEp = await Episodio.create({
                                    temporadaId: temporadaIdFinal,
                                    id_tmdb_episodio: ep.id_tmdb_episodio || null,
                                    numero_episodio: Number(ep.numero_episodio) || null,
                                    assistido: ep.assistido ?? false,
                                    titulo_episodio: ep.titulo_episodio || null,
                                    sinopse: ep.sinopse || null,
                                    duracao: Number(ep.duracao) || null,
                                    estreia: (ep.estreia && !isNaN(Date.parse(ep.estreia))) ? new Date(ep.estreia) : null,
                                    votos: Number(ep.votos) || null
                                }, { transaction });
                                idsEpisodiosRecebidos.add(novoEp.id);
                            }
                        }

                        // Opcional: Remove apenas episódios que foram explicitamente removidos da lista
                        const idsEpisodiosParaRemover = episodiosAntigos
                            .map(e => e.id)
                            .filter(dbId => !idsEpisodiosRecebidos.has(dbId));

                        if (idsEpisodiosParaRemover.length > 0) {
                            await Episodio.destroy({
                                where: { id: idsEpisodiosParaRemover },
                                transaction
                            });
                        }
                    }
                }

                //Remove temporadas antigas que deixaram de existir no payload
                const idsTemporadasParaRemover = temporadasAntigas
                    .map(t => t.id)
                    .filter(dbId => !idsTemporadasRecebidas.has(dbId));

                if (idsTemporadasParaRemover.length > 0) {
                    await Episodio.destroy({ where: { temporadaId: idsTemporadasParaRemover }, transaction });
                    await Temporada.destroy({ where: { id: idsTemporadasParaRemover }, transaction });
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
        const config = await configuracaoService.buscarPorId(1);
 
        if (!config?.ativaTMDB) {
            console.log("Integração do TMDB não está ativa. Favor verificar.");
            return { atualizados: 0, erros: 0, mensagem: "Integração do TMDB desativada nas configurações." };
        } 

        const apikey = config?.chaveTMDB;

        if (!apikey) {
            throw new Error("Chave API do TMDB não configurada!");
        }
    
        try {  
            // Busca apenas títulos que possuem id_tmdb válido cadastrado
            const titulosComTMDB = await Catalogo.findAll({
                where: {
                    id_tmdb: {
                        [Op.and]: [
                            [Op.ne], null,
                            { [Op.gt]: 0 }
                        ]
                    }
                }
            });
    
            if (titulosComTMDB.length === 0) {
                return { atualizados: 0, erros: 0, mensagem: "Nenhum título com ID TMDB encontrado." };
            }
    
            console.log(`🎬 Encontrados ${titulosComTMDB.length} títulos. Iniciando reconciliação...`);
    
            let atualizados = 0;
            let erros = 0;
            const logs = [];
    
            for (const item of titulosComTMDB) {
                const deparTipo = (item.tipoId === 6) ? 'movie' : 'tv';
                
                // Se não possuir função de limpeza de nome, usa o título original
                const tituloLimpo = typeof limparNomeSerie === 'function' ? limparNomeSerie(item.titulo) : item.titulo;
                const usaBuscaPorId = !isNaN(item.id_tmdb) && item.id_tmdb > 0;
                const urlFinal = usaBuscaPorId
                    ? `https://api.themoviedb.org/3/${deparTipo}/${item.id_tmdb}?api_key=${apikey}&language=pt-BR`
                    : `https://api.themoviedb.org/3/search/${deparTipo}?api_key=${apikey}&query=${encodeURIComponent(tituloLimpo)}&language=pt-BR`;
    
                try {
                    const resposta = await fetch(urlFinal);
                    
                    if (!resposta.ok) {
                        throw new Error(`Resposta HTTP inválida: ${resposta.status}`);
                    }
                    
                    const dadosJson = await resposta.json();
                    
                    const dadosMidia = usaBuscaPorId 
                        ? dadosJson 
                        : (dadosJson.results && dadosJson.results.length > 0 ? dadosJson.results[0] : null);
    
                    if (dadosMidia && dadosMidia.poster_path) {
                        // Correção: Uso correto do await para processar o buffer/download do pôster
                        const bufferImagem = await this.verificarPoster(dadosMidia.poster_path, dadosMidia.title || dadosMidia.name);
                        
                        // Extração correta do ano de lançamento
                        const dataLancamento = dadosMidia.release_date || dadosMidia.first_air_date;
                        const anoLancamento = dataLancamento ? new Date(dataLancamento).getFullYear() : null;

                        // Atualiza o registro no banco
                        await Catalogo.update(
                            { 
                                capa: dadosMidia.poster_path,
                                id_tmdb: dadosMidia.id, 
                                original_name: dadosMidia.original_name || dadosMidia.original_title,
                                overview: dadosMidia.overview,
                                poster_path: bufferImagem,
                                popularity: dadosMidia.popularity,
                                first_air_date: dataLancamento ? new Date(dataLancamento) : null,
                                year: anoLancamento, 
                                vote_average: dadosMidia.vote_average,
                            },
                            { where: { id: item.id } }
                        );
    
                        atualizados++;
                        logs.push(`✅ [${atualizados}] Sincronizado: "${item.titulo}"`);
                    } else {
                        erros++;
                        logs.push(`⚠️ Pôster não localizado no TMDB para: "${item.titulo}"`);
                    }
    
                    // Pausa de 200ms para evitar rate limit da API do TMDB
                    await new Promise(resolve => setTimeout(resolve, 200));
    
                } catch (err) {
                    erros++;
                    logs.push(`❌ Erro no título ID ${item.id} ("${item.titulo}"): ${err.message}`);
                }
            }
    
            console.log(`\n🏁 Fim da execução! Sincronizados: ${atualizados} | Falhas: ${erros}`);
            return { atualizados, erros, logs };
    
        } catch (error) {
            console.error("🔴 Ocorreu um erro crítico ao atualizar catálogo com TMDB:", error);
            throw error;
        }
    };

    // Método de regra de negócio para tratar o pôster
   async verificarPoster(urlCapa, tituloNome) {
        // Se a capa estiver vazia ou não for uma URL válida, retorna ela mesma
        if (!urlCapa || !urlCapa.startsWith('http')) return urlCapa;

        try {
            const config = await configuracaoService.buscarPorId(1); 
            
            // Tratamento robusto para aceitar 1, true, '1' como verdadeiro e 0, false, '0' como falso
            const valorConfig = config?.salvarImagemCatalogo;
            const salvarNoBanco = valorConfig === 1 || valorConfig === true || valorConfig === '1';

            if (salvarNoBanco) {
                // Se configurado para salvar no banco, converte para Buffer
                return await urlParaBuffer(urlCapa); 
            } else {
                // Se configurado para 0 (desativado no banco), baixa na pasta local assets/img/catalogo/
                return await processarDownloadPosterBackend(urlCapa, tituloNome); 
            }
        } catch (error) {
            console.error("❌ Erro ao tratar o pôster na configuração:", error);
            return urlCapa;
        }
    }
}

export default CatalogoServices;
