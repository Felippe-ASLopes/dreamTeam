const listaJogadores = ['Lebron James', 'Kyrie Irving']
const TAMANHO_LISTA = listaJogadores.length
const listaFotoJogadores = ['./assets/imgJogador/lebronJames.png', 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6442.png']
const listaPosicaoJogadores = ['SF', 'PG']
const listaValorJogadores = [30, 15]

for (posicao = 0; posicao < TAMANHO_LISTA; posicao++) {
    const jogador = listaJogadores[posicao]

    container_jogadores_mercado.innerHTML += `
    <div id="mercado_jogador${posicao}" class="container_jogador_mercado" draggable="true">
        <div class="div_img_jogador">
            <img src="${listaFotoJogadores[posicao]}" class="img_jogador">
        </div>
        <div class="container_info_jogador">
                <div class="div_nome_jogador">
                    <span>${jogador}</span>
                </div>
                <div class="div_valor_add">
                    <div class="div_info_jogador">
                        <span>Posicao:</span>
                        <span>SF</span>
                    </div>
                    <div class="div_info_jogador">
                        <span>Valor:</span>
                        <span>$ 30</span>
                    </div>
                    <div class="div_info_jogador">
                        <div id="${posicao}" class="background_add" onclick="addJogador()">
                            <img src="./assets/img/icon_plus.png" class="icon_plus">
                        </div>
                    </div>
                </div>
            </div>
    </div>`
}