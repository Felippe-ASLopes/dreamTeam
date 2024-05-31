const timeUser = ['', '', '', '', '']
const dinheiroUser = Number(sessionStorage.DINHEIRO_USUARIO)
let valorTime = 0
let dinheiroRestante = dinheiroUser

function carregarTimeUser() {
    div_nome_time.innerHTML = `
    <span>${sessionStorage.NOME_USUARIO}</span>`
    atualizarDinheiroUser()
}

function atualizarDinheiroUser() {
    dinheiroRestante = dinheiroUser - valorTime

    dinheiro_total.innerHTML = `
    $ ${dinheiroRestante}`

    valor_time.innerHTML = `
    $ ${valorTime}`
}


// ADICIONAR O INNERHTML COM OPACITY 0 E EXECUTAR UMA FUNC DPS DE 0.3S PARAR MUDAR A OPACITTY PARA 1

function addJogador() {
    const elemento = event.target.closest('.background_add');
    const idJogadorAdd = elemento.id;
    const nomeJogadorAdd = jogadores[idJogadorAdd - 1].nomeJogador
    const sobrenomeJogadorAdd = jogadores[idJogadorAdd - 1].sobrenome
    const posicaoJogadorAdd = jogadores[idJogadorAdd - 1].sigla
    const valorJogadorAdd = Number(jogadores[idJogadorAdd - 1].preco)

    if (valorJogadorAdd > dinheiroRestante) {
        alert('Dinheiro insuficiente')
    }
    else {
        if (posicaoJogadorAdd == 'PG' || posicaoJogadorAdd == 'SG') {
            for (let posicao = 0; posicao <= 2; posicao++) {
                if (timeUser[posicao] == '') {
                    // ATUALIZA O VETOR timeUser
                    timeUser[posicao] = idJogadorAdd

                    // ATULIZA VALOR TIME
                    valorTime += valorJogadorAdd
                    atualizarDinheiroUser()

                    // ADD NO TIMEUSER
                    const divAlterarTime = document.getElementById(`jogador${posicao}`)

                    divAlterarTime.innerHTML = `
                    <div class="div_img_jogador">
                        <img src="" class="img_jogador">
                    </div>
                    <div class="container_info_jogador">
                        <div class="div_nome_jogador">
                            <span>${nomeJogadorAdd} ${sobrenomeJogadorAdd}</span>
                        </div>
                        <div class="div_valor_add">
                            <div class="div_info_jogador">
                                <span>Posicao:</span>
                                <span>${posicaoJogadorAdd}</span>
                            </div>
                            <div class="div_info_jogador">
                                <span>Valor:</span>
                                <span>$ ${valorJogadorAdd}</span>
                            </div>
                            <div class="div_info_jogador">
                                <div class="background_remove" onclick="removerJogador(${idJogadorAdd})">
                                    <img src="./assets/img/icon_minus.png" class="icon_minus">
                                </div>
                            </div>
                        </div>
                    </div>`

                    // ADD NO CAMPO
                    // const imgAlterar = document.getElementById(`img_jogador${i}`)
                    // imgAlterar.src = listaFotoJogadores[idJogadorAdd]
                    // imgAlterar.classList.remove('icon_plus')
                    // imgAlterar.classList.add('ajustar_foto_jogador')

                    const spanAlterar = document.getElementById(`span_nome_jogador${posicao}`)
                    spanAlterar.innerHTML = `${nomeJogadorAdd} ${sobrenomeJogadorAdd}`


                    // REMOVER DO MERCADO
                    const divAlterarMercado = document.getElementById(`mercado_jogador${idJogadorAdd}`)
                    divAlterarMercado.style.display = 'none'

                    break
                }
                else {
                    alert('Impossível adicionar outro jogador para esta posição!')
                }
            }
        }
        else if (posicaoJogadorAdd == 'SF' || posicaoJogadorAdd == 'PF' || posicaoJogadorAdd == 'C') {
            for (let posicao = 2; posicao <= 4; posicao++) {
                if (timeUser[posicao] == '' && valorJogadorAdd <= dinheiroRestante) {
                    // ATUALIZA O VETOR timeUser
                    timeUser[posicao] = idJogadorAdd

                    // ATULIZA VALOR TIME
                    valorTime += valorJogadorAdd
                    atualizarDinheiroUser()

                    // ADD NO TIMEUSER
                    const divAlterarTime = document.getElementById(`jogador${posicao}`)

                    divAlterarTime.innerHTML = `
                    <div class="div_img_jogador">
                        <img src="" class="img_jogador">
                    </div>
                    <div class="container_info_jogador">
                        <div class="div_nome_jogador">
                            <span>${nomeJogadorAdd} ${sobrenomeJogadorAdd}</span>
                        </div>
                        <div class="div_valor_add">
                            <div class="div_info_jogador">
                                <span>Posicao:</span>
                                <span>${posicaoJogadorAdd}</span>
                            </div>
                            <div class="div_info_jogador">
                                <span>Valor:</span>
                                <span>$ ${valorJogadorAdd}</span>
                            </div>
                            <div class="div_info_jogador">
                                <div class="background_remove" onclick="removerJogador(${idJogadorAdd})">
                                    <img src="./assets/img/icon_minus.png" class="icon_minus">
                                </div>
                            </div>
                        </div>
                    </div>`

                    // ADD NO CAMPO
                    // const imgAlterar = document.getElementById(`img_jogador${i}`)
                    // imgAlterar.src = listaFotoJogadores[idJogadorAdd]
                    // imgAlterar.classList.remove('icon_plus')
                    // imgAlterar.classList.add('ajustar_foto_jogador')

                    const spanAlterar = document.getElementById(`span_nome_jogador${posicao}`)
                    spanAlterar.innerHTML = `${nomeJogadorAdd} ${sobrenomeJogadorAdd}`


                    // REMOVER DO MERCADO
                    const divAlterarMercado = document.getElementById(`mercado_jogador${idJogadorAdd}`)
                    divAlterarMercado.style.display = 'none'

                    break
                }
                else {
                    alert('Impossível adicionar outro jogador para esta posição!')
                }
            }
        }
    }
}

function removerJogador(idJogadorAdd) {
    const idJogadorRemover = idJogadorAdd
    const valorJogadorRemover = Number(jogadores[idJogadorAdd - 1].preco)

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

function salvarTime() {
    const idUsuario = sessionStorage.ID_USUARIO
    // const dinheiroRestanteUsuario = dinheiroRestante PARA DAR UPDATE NO DINHEIRO
    const jogador1 = timeUser[0]
    const jogador2 = timeUser[1]
    const jogador3 = timeUser[2]
    const jogador4 = timeUser[3]
    const jogador5 = timeUser[4]

    fetch("/usuarios/inserirTime", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: idUsuario,
            jogador1: jogador1,
            jogador2: jogador2,
            jogador3: jogador3,
            jogador4: jogador4,
            jogador5: jogador5,
            valor: valorTime
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log("Time inserido com sucesso!");
        } else {
            console.log("Houve um erro ao tentar inserir o time!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log("Erro na requisição:", erro);
    });
}