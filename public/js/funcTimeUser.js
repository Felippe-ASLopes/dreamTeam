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

function addJogador(jogadores) {
    const elemento = event.target.closest('.background_add');
    const idJogadorAdd = elemento.id;


    const nomeJogadorAdd = jogadores.nomeJogador[idJogadorAdd - 1]
    const posicaoJogadorAdd = jogadores.sigla[idJogadorAdd - 1]
    const valorJogadorAdd = jogadores.preco[idJogadorAdd - 1]

    if (posicaoJogadorAdd == 'PG' || posicaoJogadorAdd == 'SG') {
        for (let posicao = 0; posicao <= 2; posicao++) {
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
                        <span>${nomeJogadorAdd}</span>
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
                            <div class="background_remove">
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
                spanAlterar.innerHTML = nomeJogadorAdd


                // REMOVER DO MERCADO
                const divAlterarMercado = document.getElementById(`mercado_jogador${idJogadorAdd}`)
                divAlterarMercado.style.display = 'none'

                break
            }
        }
    }
    else if (posicaoJogadorAdd == 'SF' || posicaoJogadorAdd == 'PF' || posicaoJogadorAdd == 'C') {
        for (let i = 2; i <= 4; i++) {
            if (timeUser[i] == '' && valorJogadorAdd <= dinheiroRestante) {
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
                        <span>${nomeJogadorAdd}</span>
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
                            <div class="background_remove">
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
                spanAlterar.innerHTML = nomeJogadorAdd


                // REMOVER DO MERCADO
                const divAlterarMercado = document.getElementById(`mercado_jogador${idJogadorAdd}`)
                divAlterarMercado.style.display = 'none'
                
                break
            }
        }
    }
}

function salvarTime() {
    
}