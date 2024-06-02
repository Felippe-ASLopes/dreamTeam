let jogadores = []

function obterJogadores() {
    fetch("/jogadores/obter", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                jogadores = json
                console.log("Jogadores:", jogadores);
                exibirJogadores()
            });
        } else {
            console.log("Houve um erro ao tentar obter os jogadores!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log("Erro na requisição:", erro);
    });
}

function exibirJogadores() {
    for (let posicao = 0; posicao < jogadores.length; posicao++) {
        const idJogador = jogadores[posicao].idJogador
        const nome = jogadores[posicao].nomeJogador
        const sobrenome = jogadores[posicao].sobrenome
        const posicaoJogador = jogadores[posicao].sigla
        const valor = Number(jogadores[posicao].preco)
        const img = jogadores[posicao].urlImagem
        const pontosJogador = pontuacao[posicao]

        container_jogadores_mercado.innerHTML += `
            <div id="mercado_jogador${idJogador}" class="container_jogador_mercado">
                <div class="div_img_jogador">
                    <img src="${img}" class="img_jogador">
                </div>
                <div class="container_info_jogador">
                    <div class="div_nome_jogador">
                        <span>${nome} ${sobrenome} - ${posicaoJogador}</span>
                    </div>
                    <div class="div_valor_add">
                        <div class="div_info_jogador">
                            <span>Ultima<br>pontuação:</span>
                            <span>${pontosJogador}</span>
                        </div>
                        <div class="div_info_jogador">
                            <span>Valor:</span>
                            <span>$ ${valor}</span>
                        </div>
                        <div class="div_add_jogador">
                            <div id="${idJogador}" class="background_add" onclick="addJogador(${idJogador})">
                                <img src="./assets/img/icon_plus.png" class="icon_plus">
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}