const listaJogadores = ['Lebron James', 'Kyrie Irving']
const TAMANHO_LISTA = listaJogadores.length
const listaFotoJogadores = ['./assets/imgJogador/lebronJames.png', 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6442.png']

for (posicao = 0; posicao < TAMANHO_LISTA; posicao++) {
    const jogador = listaJogadores[posicao]

    aside_mercado.innerHTML += `
    <div id="mercado_jogador${posicao}" class="div_jogador_mercado" draggable="true">
        <div class="div_img_jogador">
            <img src="${listaFotoJogadores[posicao]}" class="img_jogador">
        </div>
        <div class="div_info_jogador">
            <p>${jogador}</p>
        </div>
    </div>`
}