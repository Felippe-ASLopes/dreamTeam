const timeUser = ['', '', '', '', '']
let dinheiroUser = Number(sessionStorage.DINHEIRO_USUARIO)
let valorTime = 0

function carregarTimeUser() {
    div_nome_time.innerHTML = `
    <span>${sessionStorage.NOME_USUARIO}</span>`
    atualizarDinheiroUser()
}

function atualizarDinheiroUser() {
    const dinheiroRestante = dinheiroUser - valorTime

    dinheiro_total.innerHTML = `
    $ ${dinheiroRestante}`

    valor_time.innerHTML = `
    $ ${valorTime}`
}


// ADICIONAR O INNERHTML COM OPACITY 0 E EXECUTAR UMA FUNC DPS DE 0.3S PARAR MUDAR A OPACITTY PARA 1

function addJogador() {
    // CAPTURA O ID DO ELEMENTO CLICADO
    const elemento = event.target.closest('.background_add');
    const idJogadorAdd = elemento.id;
    const posicaoJogadorAdd = listaPosicaoJogadores[idJogadorAdd]

    if (posicaoJogadorAdd == 'PG' || posicaoJogadorAdd == 'SG') {
        for (let i = 0; i <= 2; i++) {
            if (timeUser[i] == '') {
                // ATUALIZA O VETOR timeUser
                timeUser[i] = idJogadorAdd

                // ATULIZA VALOR TIME
                valorTime += listaValorJogadores[idJogadorAdd]
                atualizarDinheiroUser()

                // ADD NO TIMEUSER, PARTE DIREITA
                const divAlterarTime = document.getElementById(`jogador${i}`)

                divAlterarTime.innerHTML = `
                <div class="div_img_jogador">
                    <img src="${listaFotoJogadores[idJogadorAdd]}" class="img_jogador">
                </div>
                <div class="container_info_jogador">
                    <div class="div_nome_jogador">
                        <span>${listaJogadores[idJogadorAdd]}</span>
                    </div>
                    <div class="div_valor_add">
                        <div class="div_info_jogador">
                            <span>Posicao:</span>
                            <span>${posicaoJogadorAdd}</span>
                        </div>
                        <div class="div_info_jogador">
                            <span>Valor:</span>
                            <span>$ ${listaValorJogadores[idJogadorAdd]}</span>
                        </div>
                        <div class="div_info_jogador">
                            <div class="background_remove">
                                <img src="./assets/img/icon_minus.png" class="icon_minus">
                            </div>
                        </div>
                    </div>
                </div>`

                // ADD NO CAMPO
                const imgAlterar = document.getElementById(`img_jogador${i}`)
                imgAlterar.src = listaFotoJogadores[idJogadorAdd]
                imgAlterar.classList.remove('icon_plus')
                imgAlterar.classList.add('ajustar_foto_jogador')

                const spanAlterar = document.getElementById(`span_nome_jogador${i}`)
                spanAlterar.innerHTML = listaJogadores[idJogadorAdd]


                // REMOVER DO MERCADO
                const divAlterarMercado = document.getElementById(`mercado_jogador${idJogadorAdd}`)

                divAlterarMercado.style.display = 'none'
                break
            }
        }
    }
    else if (posicaoJogadorAdd == 'SF' || posicaoJogadorAdd == 'PF' || posicaoJogadorAdd == 'C') {
        for (let i = 2; i <= 4; i++) {
            if (timeUser[i] == '') {
                // ATUALIZA O VETOR timeUser
                timeUser[i] = idJogadorAdd

                // ATULIZA VALOR TIME
                valorTime += listaValorJogadores[idJogadorAdd]
                atualizarDinheiroUser()

                // ADD NO TIMEUSER, PARTE DIREITA
                const divAlterar = document.getElementById(`jogador${i}`)

                divAlterar.innerHTML = `
                <div class="div_img_jogador">
                    <img src="${listaFotoJogadores[idJogadorAdd]}" class="img_jogador">
                </div>
                <div class="container_info_jogador">
                    <div class="div_nome_jogador">
                        <span>${listaJogadores[idJogadorAdd]}</span>
                    </div>
                    <div class="div_valor_add">
                        <div class="div_info_jogador">
                            <span>Posicao:</span>
                            <span>${posicaoJogadorAdd}</span>
                        </div>
                        <div class="div_info_jogador">
                            <span>Valor:</span>
                            <span>$ ${listaValorJogadores[idJogadorAdd]}</span>
                        </div>
                        <div class="div_info_jogador">
                            <div class="background_remove">
                                <img src="./assets/img/icon_minus.png" class="icon_minus">
                            </div>
                        </div>
                    </div>
                </div>`

                // ADD NO CAMPO
                const imgAlterar = document.getElementById(`img_jogador${i}`)
                imgAlterar.src = listaFotoJogadores[idJogadorAdd]
                imgAlterar.classList.remove('icon_plus')
                imgAlterar.classList.add('ajustar_foto_jogador')

                const spanAlterar = document.getElementById(`span_nome_jogador${i}`)
                spanAlterar.innerHTML = listaJogadores[idJogadorAdd]


                // REMOVER DO MERCADO
                const divAlterarMercado = document.getElementById(`mercado_jogador${idJogadorAdd}`)

                divAlterarMercado.style.display = 'none'

                break
            }
        }
    }
}