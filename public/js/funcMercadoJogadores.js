const listaJogadores = ['Lebron James', 'Kyrie Irving']
const TAMANHO_LISTA = listaJogadores.length

for (posicao = 0; posicao < TAMANHO_LISTA; posicao++) {
    const jogador = listaJogadores[posicao]

    aside_mercado.innerHTML += `
    <div id="mercado_jogador${posicao}" class="div_jogador">
        <p>${jogador}</p>
    </div>`
}