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