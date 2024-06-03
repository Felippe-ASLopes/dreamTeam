const timeUser = ['', '', '', '', '']
let dinheiroUser = 0
let valorTime = 0
let dinheiroRestante = 0
let timePodeInserir = true
let podeLimparTime = false

function obterTimeUsuario() {
    const idUsuario = sessionStorage.ID_USUARIO

    fetch(`/usuarios/obterTimeUsuario/${idUsuario}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                if (json.length > 0) {
                    timeUser[0] = json[0].fkJogador1
                    timeUser[1] = json[0].fkJogador2
                    timeUser[2] = json[0].fkJogador3
                    timeUser[3] = json[0].fkJogador4
                    timeUser[4] = json[0].fkJogador5
                    valorTime = Number(json[0].valor)
                    console.log("Time do Usuário:", json);
                    exibirTimeUser()
                }
                exibirNomeTimeUser()
            });
        } else {
            console.log("Houve um erro ao tentar obter o time do usuário!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log("Erro na requisição:", erro);
    });
}

function exibirNomeTimeUser() {
    dinheiroUser = Number(sessionStorage.DINHEIRO_USUARIO)
    div_nome_time.innerHTML = `
    <span>${sessionStorage.NOME_USUARIO}</span>`

    atualizarDinheiroUser()
}

function atualizarDinheiroUser() {
    dinheiroRestante = (dinheiroUser - valorTime).toFixed(2)

    dinheiro_total.innerHTML = `
    $ ${dinheiroRestante}`

    valor_time.innerHTML = `
    $ ${valorTime.toFixed(2)}`
}

function exibirTimeUser() {
    if (timeUser[0] != '' &&
        timeUser[1] != '' &&
        timeUser[2] != '' &&
        timeUser[3] != '' &&
        timeUser[4] != '') {
        timePodeInserir = false

        for (let posicao = 0; posicao < timeUser.length; posicao++) {
            const jogador = timeUser[posicao]

            const nomeJogadorAdd = jogadores[jogador - 1].nomeJogador
            const sobrenomeJogadorAdd = jogadores[jogador - 1].sobrenome
            const posicaoJogadorAdd = jogadores[jogador - 1].sigla
            const valorJogadorAdd = Number(jogadores[jogador - 1].preco)
            const imgJogadorAdd = jogadores[jogador - 1].urlImagem
            let pontosJogador = 0

            if (estatisticas.length > 0) {
                pontosJogador = Number(estatisticas[posicao].pontuacaoJogador)
            }

            const divAlterarTime = document.getElementById(`jogador${posicao}`)
            divAlterarTime.innerHTML = `
            <div class="div_img_jogador">
                <img src="${imgJogadorAdd}" class="img_jogador">
            </div>
            <div class="container_info_jogador">
                <div class="div_nome_jogador">
                    <span>${nomeJogadorAdd} ${sobrenomeJogadorAdd} - ${posicaoJogadorAdd}</span>
                </div>
                <div class="div_valor_add">
                    <div class="div_info_jogador">
                        <span>Ultima<br>pontuação:</span>
                        <span>${pontosJogador}</span>
                    </div>
                    <div class="div_info_jogador">
                        <span>Valor:</span>
                        <span>$ ${valorJogadorAdd}</span>
                    </div>
                    <div class="div_add_jogador">
                        <div class="background_remove" onclick="removerJogador(${jogador})">
                            <img src="./assets/img/icon_minus.png" class="icon_minus">
                        </div>
                    </div>
                </div>
            </div>`

            // ADICIONA NO CAMPO
            const imgAlterar = document.getElementById(`img_jogador${posicao}`)
            imgAlterar.src = imgJogadorAdd
            imgAlterar.classList.remove('icon_plus')
            imgAlterar.classList.add('ajustar_foto_jogador')
            const spanAlterar = document.getElementById(`span_nome_jogador${posicao}`)
            spanAlterar.innerHTML = `${nomeJogadorAdd} ${sobrenomeJogadorAdd}`


            // REMOVE DO MERCADO
            const divAlterarMercado = document.getElementById(`mercado_jogador${jogador}`)
            divAlterarMercado.style.display = 'none'
        }

        div_text_enviar_time.innerHTML = `
        <span>Atualizar Time</span>
        `
        // avisoTimeCarregado()
    }
}


// ADICIONAR O INNERHTML COM OPACITY 0 E EXECUTAR UMA FUNC DPS DE 0.3S PARAR MUDAR A OPACITTY PARA 1

function addJogador() {
    if (mercadoAberto) {
        const elemento = event.target.closest('.background_add');
        const idJogadorAdd = elemento.id;
        const valorJogadorAdd = Number(jogadores[idJogadorAdd - 1].preco)

        if (valorJogadorAdd <= dinheiroRestante) {
            const nomeJogadorAdd = jogadores[idJogadorAdd - 1].nomeJogador
            const sobrenomeJogadorAdd = jogadores[idJogadorAdd - 1].sobrenome
            const posicaoJogadorAdd = jogadores[idJogadorAdd - 1].sigla
            const imgJogadorAdd = jogadores[idJogadorAdd - 1].urlImagem
            let pontosJogador = 0

            
            if ((posicaoJogadorAdd == 'PG' || posicaoJogadorAdd == 'SG') &&
            (timeUser[0] == '' || timeUser[1] == '' || timeUser[2] == '')) {
                for (let posicao = 0; posicao <= 2; posicao++) {
                    if (timeUser[posicao] == '') {
                        // ATUALIZA O VETOR timeUser
                        timeUser[posicao] = idJogadorAdd
                        
                        // ATULIZA VALOR TIME
                        valorTime += valorJogadorAdd
                        atualizarDinheiroUser()
                        
                        if (estatisticas.length > 0) {
                            pontosJogador = Number(estatisticas[posicao].pontuacaoJogador)
                        }

                        // ADICIONA NO TIMEUSER
                        const divAlterarTime = document.getElementById(`jogador${posicao}`)
                        divAlterarTime.innerHTML = `
                        <div class="div_img_jogador">
                            <img src="${imgJogadorAdd}" class="img_jogador">
                        </div>
                        <div class="container_info_jogador">
                            <div class="div_nome_jogador">
                                <span>${nomeJogadorAdd} ${sobrenomeJogadorAdd} - ${posicaoJogadorAdd}</span>
                            </div>
                            <div class="div_valor_add">
                                <div class="div_info_jogador">
                                    <span>Ultima<br>pontuação:</span>
                                    <span>${pontosJogador}</span>
                                </div>
                                <div class="div_info_jogador">
                                    <span>Valor:</span>
                                    <span>$ ${valorJogadorAdd}</span>
                                </div>
                                <div class="div_add_jogador">
                                    <div class="background_remove" onclick="removerJogador(${idJogadorAdd})">
                                        <img src="./assets/img/icon_minus.png" class="icon_minus">
                                    </div>
                                </div>
                            </div>
                        </div>`

                        // ADICIONA NO CAMPO
                        const imgAlterar = document.getElementById(`img_jogador${posicao}`)
                        imgAlterar.src = imgJogadorAdd
                        imgAlterar.classList.remove('icon_plus')
                        imgAlterar.classList.add('ajustar_foto_jogador')

                        const spanAlterar = document.getElementById(`span_nome_jogador${posicao}`)
                        spanAlterar.innerHTML = `${nomeJogadorAdd} ${sobrenomeJogadorAdd}`


                        // REMOVE DO MERCADO
                        const divAlterarMercado = document.getElementById(`mercado_jogador${idJogadorAdd}`)
                        divAlterarMercado.style.display = 'none'

                        break
                    }
                }
            }
            else if ((posicaoJogadorAdd == 'SF' || posicaoJogadorAdd == 'PF' || posicaoJogadorAdd == 'C') && (timeUser[2] == '' || timeUser[3] == '' || timeUser[4] == '')) {
                for (let posicao = 2; posicao <= 4; posicao++) {
                    if (timeUser[posicao] == '' && valorJogadorAdd <= dinheiroRestante) {
                        // ATUALIZA O VETOR timeUser
                        timeUser[posicao] = idJogadorAdd

                        // ATULIZA VALOR TIME
                        valorTime += valorJogadorAdd
                        atualizarDinheiroUser()

                        if (estatisticas.length > 0) {
                            pontosJogador = Number(estatisticas[posicao].pontuacaoJogador)
                        }
                        
                        // ADICIONA NO TIMEUSER
                        const divAlterarTime = document.getElementById(`jogador${posicao}`)
                        divAlterarTime.innerHTML = `
                        <div class="div_img_jogador">
                            <img src="${imgJogadorAdd}" class="img_jogador">
                        </div>
                        <div class="container_info_jogador">
                            <div class="div_nome_jogador">
                                <span>${nomeJogadorAdd} ${sobrenomeJogadorAdd} - ${posicaoJogadorAdd}</span>
                            </div>
                            <div class="div_valor_add">
                                <div class="div_info_jogador">
                                    <span>Ultima<br>pontuação:</span>
                                    <span>${pontosJogador}</span>
                                </div>
                                <div class="div_info_jogador">
                                    <span>Valor:</span>
                                    <span>$ ${valorJogadorAdd}</span>
                                </div>
                                <div class="div_add_jogador">
                                    <div class="background_remove" onclick="removerJogador(${idJogadorAdd})">
                                        <img src="./assets/img/icon_minus.png" class="icon_minus">
                                    </div>
                                </div>
                            </div>
                        </div>`

                        // ADICIONA NO CAMPO
                        const imgAlterar = document.getElementById(`img_jogador${posicao}`)
                        imgAlterar.src = imgJogadorAdd
                        imgAlterar.classList.remove('icon_plus')
                        imgAlterar.classList.add('ajustar_foto_jogador')

                        const spanAlterar = document.getElementById(`span_nome_jogador${posicao}`)
                        spanAlterar.innerHTML = `${nomeJogadorAdd} ${sobrenomeJogadorAdd}`


                        // REMOVE DO MERCADO
                        const divAlterarMercado = document.getElementById(`mercado_jogador${idJogadorAdd}`)
                        divAlterarMercado.style.display = 'none'

                        break
                    }
                }
            }
            else {
                AvisoTimeCheio()
            }
        }
        else {
            avisoSemDinheiro()
        }
    }
    else {
        AvisoMercadoFechado()
    }
}

function removerJogador(idJogadorAdd) {
    if (mercadoAberto) {
        const idJogadorRemover = idJogadorAdd
        const valorJogadorRemover = Number(jogadores[idJogadorRemover - 1].preco)

        for (let i = 0; i <= 4; i++) {
            if (timeUser[i] == idJogadorRemover) {
                timeUser[i] = ''

                valorTime -= valorJogadorRemover
                atualizarDinheiroUser()

                let posicaoRestaurada = 'Guard'
                let posicaoSiglaRestaurada = 'PG'
                if (i == 1) {
                    posicaoSiglaRestaurada = 'SG'
                }
                else if (i == 2) {
                    posicaoRestaurada += ' ou Foward'
                    posicaoSiglaRestaurada = 'SF'
                }
                else if (i == 3) {
                    posicaoRestaurada = 'Foward'
                    posicaoSiglaRestaurada = 'PF'
                }
                else if (i == 4) {
                    posicaoRestaurada = 'Foward'
                    posicaoSiglaRestaurada = 'C'
                }

                const divAlterarTime = document.getElementById(`jogador${i}`)
                const imgAlterar = document.getElementById(`img_jogador${i}`)
                const spanAlterar = document.getElementById(`span_nome_jogador${i}`)

                divAlterarTime.innerHTML = `Adicione um ${posicaoRestaurada}`

                imgAlterar.src = './assets/img/icon_plus.png'
                imgAlterar.classList.remove('ajustar_foto_jogador')
                imgAlterar.classList.add('icon_plus')
                spanAlterar.innerHTML = `${posicaoSiglaRestaurada}`

                const divAlterarMercado = document.getElementById(`mercado_jogador${idJogadorAdd}`)
                divAlterarMercado.style.display = 'flex'

                break
            }
        }
    }
    else {
        AvisoMercadoFechado()
    }
}

function salvarTime() {
    if (mercadoAberto) {
        if (timePodeInserir) {
            timePodeInserir = false
            const idUsuario = sessionStorage.ID_USUARIO
            const rodada = rodadaAtual[0].idRodada
            const jogador1 = timeUser[0]
            const jogador2 = timeUser[1]
            const jogador3 = timeUser[2]
            const jogador4 = timeUser[3]
            const jogador5 = timeUser[4]
            const valor = valorTime

            fetch("/usuarios/inserirTime", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idUsuario: idUsuario,
                    rodada: rodada,
                    jogador1: jogador1,
                    jogador2: jogador2,
                    jogador3: jogador3,
                    jogador4: jogador4,
                    jogador5: jogador5,
                    valor: valor
                })
            }).then(function (resposta) {
                if (resposta.ok) {
                    console.log("Time inserido com sucesso!");
                    avisoTimeEnviado()

                    div_text_enviar_time.innerHTML = `
                    <span>Atualizar Time</span>
                    `
                } else {
                    console.log("Houve um erro ao tentar inserir o time!");
                    avisoErroEnviarTime()

                    resposta.text().then(texto => {
                        console.error(texto);
                    });
                }
            }).catch(function (erro) {
                console.log("Erro na requisição:", erro);
            });
        }
        else {
            atualizarTime()
        }
    }
    else {
        AvisoMercadoFechado()
    }
}

function atualizarTime() {
    if (mercadoAberto) {
        const idUsuario = sessionStorage.ID_USUARIO
        const rodada = rodadaAtual[0].idRodada
        const jogador1 = timeUser[0]
        const jogador2 = timeUser[1]
        const jogador3 = timeUser[2]
        const jogador4 = timeUser[3]
        const jogador5 = timeUser[4]
        const valor = valorTime

        fetch("/usuarios/atualizarTime", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuario: idUsuario,
                rodada: rodada,
                jogador1: jogador1,
                jogador2: jogador2,
                jogador3: jogador3,
                jogador4: jogador4,
                jogador5: jogador5,
                valor: valor
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                console.log("Time atualizado com sucesso!");
                avisoTimeAtualizado()
            } else {
                console.log("Houve um erro ao tentar atualizar o time!");
                avisoErroEnviarTime()

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function (erro) {
            console.log("Erro na requisição:", erro);
        });
    }
    else {
        AvisoMercadoFechado()
    }
}

function limparTimeUsuario() {
    if (podeLimparTime) {
        podeLimparTime = false
        //  ADICIONAR A ULTIMA PONTUAÇÃO NA HORA DO LOGIN
        for (let posicao = 0; posicao < timeUser.length; posicao++) {
            timeUser[posicao] = ''
    
            let posicaoRestaurada = 'Guard'
            let posicaoSiglaRestaurada = 'PG'
            if (posicao == 1) {
                posicaoSiglaRestaurada = 'SG'
            }
            else if (posicao == 2) {
                posicaoRestaurada += ' ou Foward'
                posicaoSiglaRestaurada = 'SF'
            }
            else if (posicao == 3) {
                posicaoRestaurada = 'Foward'
                posicaoSiglaRestaurada = 'PF'
            }
            else if (posicao == 4) {
                posicaoRestaurada = 'Foward'
                posicaoSiglaRestaurada = 'C'
            }
    
            const divAlterarTime = document.getElementById(`jogador${posicao}`)
            const imgAlterar = document.getElementById(`img_jogador${posicao}`)
            const spanAlterar = document.getElementById(`span_nome_jogador${posicao}`)
    
            divAlterarTime.innerHTML = `Adicione um ${posicaoRestaurada}`
    
            imgAlterar.src = './assets/img/icon_plus.png'
            imgAlterar.classList.remove('ajustar_foto_jogador')
            imgAlterar.classList.add('icon_plus')
            spanAlterar.innerHTML = `${posicaoSiglaRestaurada}`
        }
        valorTime = 0
        obterTimeUsuario()
    }
}