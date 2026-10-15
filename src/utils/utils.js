const fs = require('fs');
const path = require('path');

// Função para converter imagem dem base64
export async function urlParaBuffer(urlImagem) {
    if (!urlImagem || urlImagem.includes("placeholder")) return null;

    try {
        const resposta = await fetch(urlImagem);
        if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);

        const arrayBuffer = await resposta.arrayBuffer();
        // Retorna o Buffer binário puro, não a string Base64
        return Buffer.from(arrayBuffer);
    } catch (erro) {
        console.error("Erro ao converter imagem em Buffer:", erro.message);
        return null;
    }
};

// Função auxiliar para limpar os nomes das temporadas e deixar apenas o título base
export function limparNomeSerie(nomeBruto) {
    if (!nomeBruto) return "";
    
    return nomeBruto
        .replace(/\d+ª?\s*e?\s*\d*ª?\s*Temporada/i, '') // Limpa "8ª Temporada", "11ª e 12ª Temporada"
        .replace(/\d+ª?\s*á\s*\d+ª?\s*Temporada/i, '')  // Limpa "1ª á 4ª Temporada"
        .replace(/\d+ª?\s*a\s*\d+ª?\s*Temporada/i, '')  // Limpa "1ª a 5ª Temporada"
        .replace(/temporada\s*\d+/i, '')
        .replace(/season\s*\d+/i, '')
        .replace(/\s+s\d+/i, '')
        .replace(/\d+ª?\s*temp/i, '')
        .trim();
};

// Função auxiliar para processar o download da imagem
async function processarDownloadPosterBackend(urlCapa, tituloNome) {
  // Se não houver capa ou se já for um caminho local salvo, retorna o que já está lá
  if (!urlCapa || !urlCapa.startsWith('http')) {
    return urlCapa;
  }

  try {
    // Aponta para a pasta correta dentro da estrutura do backend: assets/img/catalogo
    const pastaDestino = path.join(__dirname, '..', 'assets', 'img', 'catalogo');

    // Verifica se a pasta existe; se não existir, cria de forma recursiva
    if (!fs.existsSync(pastaDestino)) {
      fs.mkdirSync(pastaDestino, { recursive: true });
    }

    // Cria um nome de arquivo limpo baseado no título + timestamp para evitar conflitos
    const nomeLimpo = tituloNome ? tituloNome.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'poster';
    const nomeArquivo = `${nomeLimpo}_${Date.now()}.jpg`;
    const caminhoCompletoFisico = path.join(pastaDestino, nomeArquivo);

    // Faz o download da imagem da URL do TMDB usando o fetch nativo do Node.js
    const response = await fetch(urlCapa);
    if (!response.ok) throw new Error(`Falha ao baixar imagem: ${response.statusText}`);
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Salva o arquivo fisicamente na pasta local do backend
    fs.writeFileSync(caminhoCompletoFisico, buffer);

    // Retorna o caminho relativo que será salvo no banco de dados SQLite
    return `assets/img/catalogo/${nomeArquivo}`;
  } catch (error) {
    console.error("Erro ao baixar poster no backend:", error);
    return urlCapa; // Retorna a URL original caso ocorra algum imprevisto no download
  }
};