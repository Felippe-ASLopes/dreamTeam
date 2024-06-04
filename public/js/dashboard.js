let rodada = []
let jogadoresDashboard = []
let estatisticasJogadoresDashboard = []
let usuarios = []

function obterRodadaDashboard() {
    fetch("/rodada/obterRodadaDashboard", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                rodada = json
                console.log('Rodada:', rodada)
                obterJogadores()
                div_titulo_jogadores.innerHTML = `<span>Maiores pontuadores da ${rodada[0].idRodada - 1}° rodada</span>`
                div_titulo_time.innerHTML = `<span>Melhores times da ${rodada[0].idRodada - 1}° rodada</span>`
            });
        } else {
            console.log("Houve um erro ao tentar obter a rodada!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log("Erro na requisição:", erro);
    });
}

function obterJogadores() {
    fetch("/jogadores/obter", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                jogadoresDashboard = json
                console.log("Jogadores:", jogadoresDashboard);
                obterEstatisticaDashboard()
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

function obterEstatisticaDashboard() {
    fetch("/rodada/obterEstatisticaDashboard")
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    console.log('Estatisticas:', json);
                    estatisticasJogadoresDashboard = json
                    obterUsuariosDashboard()
                });
            } else {
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        })
        .catch(function (erro) {
            console.log(erro);
        });
}

function obterUsuariosDashboard() {
    const rodadaAnterior = rodada[0].idRodada - 1

    fetch(`/admin/obterUsuariosDashboard/${rodadaAnterior}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                if (json.length > 0) {
                    usuarios = json
                    console.log("Usuários:", usuarios);
                    exibirJogadoresDashboard()
                }
            });
        } else {
            console.log("Houve um erro ao tentar obter os times dos usuários!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log("Erro na requisição:", erro);
    });
}

function exibirJogadoresDashboard() {
    for (let posicao = 0; posicao < estatisticasJogadoresDashboard.length; posicao++) {
        if (posicao == 0) {
            img_melhor_jogador1.innerHTML = `<img src="${jogadoresDashboard[posicao].urlImagem}" class="ajustar_img_jogador">`
            div_nome_melhor_jogador1.innerHTML = `<span>#1 ${jogadoresDashboard[posicao].nomeJogador} ${jogadoresDashboard[posicao].sobrenome} - ${estatisticasJogadoresDashboard[posicao].pontuacaoJogador}</span>`
        }
        else if (posicao == 1) {
            img_melhor_jogador2.innerHTML = `<img src="${jogadoresDashboard[posicao].urlImagem}" class="ajustar_img_jogador">`
            div_nome_melhor_jogador2.innerHTML = `<span>#2 ${jogadoresDashboard[posicao].nomeJogador} ${jogadoresDashboard[posicao].sobrenome} - ${estatisticasJogadoresDashboard[posicao].pontuacaoJogador}</span>`
        }
        else if (posicao == 2) {
            img_melhor_jogador3.innerHTML = `<img src="${jogadoresDashboard[posicao].urlImagem}" class="ajustar_img_jogador">`
            div_nome_melhor_jogador3.innerHTML = `<span>#3 ${jogadoresDashboard[posicao].nomeJogador} ${jogadoresDashboard[posicao].sobrenome} - ${estatisticasJogadoresDashboard[posicao].pontuacaoJogador}</span>`
        }

        div_lista_jogadores.innerHTML += `
        <div class="div_itens">
            <div class="container_img_info_jogador">
                <div class="div_img_jogadores">
                    <img src="${jogadoresDashboard[posicao].urlImagem}" class="ajustar_img_jogador">
                </div>
                <div class="div_info_jogador">
                    <div class="div_nome_jogador">
                        <span>${jogadoresDashboard[posicao].nomeJogador} ${jogadoresDashboard[posicao].sobrenome}</span>
                    </div>
                    <div class="container_posicao_valor_jogador">
                        <div class="div_posicao_valor_jogador">
                            <span>Posicao:</span>
                            <span>${jogadoresDashboard[posicao].sigla}</span>
                        </div>
                        <div class="div_posicao_valor_jogador">
                            <span>Preco:</span>
                            <span>$ ${jogadoresDashboard[posicao].preco}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="div_estatistica_jogador">
                <span>${estatisticasJogadoresDashboard[posicao].ponto}</span>
            </div>
            <div class="div_estatistica_jogador">
                <span>${estatisticasJogadoresDashboard[posicao].assistencia}</span>
            </div>
            <div class="div_estatistica_jogador">
                <span>${estatisticasJogadoresDashboard[posicao].rebote}</span>
            </div>
            <div class="div_estatistica_jogador">
                <span>${estatisticasJogadoresDashboard[posicao].bloqueio}</span>
            </div>
            <div class="div_estatistica_jogador">
                <span>${estatisticasJogadoresDashboard[posicao].roubo}</span>
            </div>
            <div class="div_estatistica_jogador">
                <span>${estatisticasJogadoresDashboard[posicao].turnOver}</span>
            </div>
            <div class="div_estatistica_jogador">
                <span>${estatisticasJogadoresDashboard[posicao].falta}</span>
            </div>
            <div class="div_estatistica_jogador ultima_estatistica">
                <span>${estatisticasJogadoresDashboard[posicao].pontuacaoJogador}</span>
            </div>
        </div>`
    }
    exibirUsuariosDashboard()
}

function exibirUsuariosDashboard() {
    for (let posicao = 0; posicao < usuarios.length; posicao++) {
        const nomeTime = usuarios[posicao].nomeTime
        const valorTime = usuarios[posicao].valor
        const pontuacaoTime = usuarios[posicao].pontuacao
        const idJogador1 = usuarios[posicao].fkJogador1
        const idJogador2 = usuarios[posicao].fkJogador2
        const idJogador3 = usuarios[posicao].fkJogador3
        const idJogador4 = usuarios[posicao].fkJogador4
        const idJogador5 = usuarios[posicao].fkJogador5
        const imgJogador1 = jogadoresDashboard[idJogador1 - 1].urlImagem
        const imgJogador2 = jogadoresDashboard[idJogador2 - 1].urlImagem
        const imgJogador3 = jogadoresDashboard[idJogador3 - 1].urlImagem
        const imgJogador4 = jogadoresDashboard[idJogador4 - 1].urlImagem
        const imgJogador5 = jogadoresDashboard[idJogador5 - 1].urlImagem
        const nomeJogador1 = `${jogadoresDashboard[idJogador1 - 1].nomeJogador}<br>${jogadoresDashboard[idJogador1 - 1].sobrenome}`
        const nomeJogador2 = `${jogadoresDashboard[idJogador2 - 1].nomeJogador}<br>${jogadoresDashboard[idJogador2 - 1].sobrenome}`
        const nomeJogador3 = `${jogadoresDashboard[idJogador3 - 1].nomeJogador}<br>${jogadoresDashboard[idJogador3 - 1].sobrenome}`
        const nomeJogador4 = `${jogadoresDashboard[idJogador4 - 1].nomeJogador}<br>${jogadoresDashboard[idJogador4 - 1].sobrenome}`
        const nomeJogador5 = `${jogadoresDashboard[idJogador5 - 1].nomeJogador}<br>${jogadoresDashboard[idJogador5 - 1].sobrenome}`

        div_lista_times.innerHTML += `
        <div class="div_itens">
            <div class="container_nome_time">
                <span>${nomeTime}</span>
            </div>
            <div class="div_time_jogadores">
                <div class="div_nome_jogador_time">
                    <span>${nomeJogador1}</span>
                </div>
                <div class="div_img_jogadores_time">
                    <img src="${imgJogador1}" class="ajustar_img_jogador">
                </div>
            </div>
            <div class="div_time_jogadores">
                <div class="div_nome_jogador_time">
                    <span>${nomeJogador2}</span>
                </div>
                <div class="div_img_jogadores_time">
                    <img src="${imgJogador2}" class="ajustar_img_jogador">
                </div>
            </div>
            <div class="div_time_jogadores">
                <div class="div_nome_jogador_time">
                    <span>${nomeJogador3}</span>
                </div>
                <div class="div_img_jogadores_time">
                    <img src="${imgJogador3}" class="ajustar_img_jogador">
                </div>
            </div>
            <div class="div_time_jogadores">
                <div class="div_nome_jogador_time">
                    <span>${nomeJogador4}</span>
                </div>
                <div class="div_img_jogadores_time">
                    <img src="${imgJogador4}" class="ajustar_img_jogador">
                </div>
            </div>
            <div class="div_time_jogadores">
                <div class="div_nome_jogador_time">
                    <span>${nomeJogador5}</span>
                </div>
                <div class="div_img_jogadores_time">
                    <img src="${imgJogador5}" class="ajustar_img_jogador">
                </div>
            </div>
            <div class="div_estatistica_time">
                <span>$ ${valorTime}</span>
            </div>
            <div class="div_estatistica_time ultima_legenda_time">
                <span>${pontuacaoTime}</span>
            </div>
        </div>`
    }
}