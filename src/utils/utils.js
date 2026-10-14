// utils/imageUtils.js
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
}

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
}