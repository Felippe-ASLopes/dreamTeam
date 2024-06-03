function avisoMercado() {
    if (mercadoAberto) {
        container_mensagens.style.backgroundColor = '#0077C0'
        container_mensagens.innerHTML = `
        <span>Rodada: ${rodada}</span>
        <span>Fechamento do mercado: ${horarioInicioRodada} de ${diaInicioRodada}/${mesInicioRodada}/${anoInicioRodada}</span>`
    }
    else {
        container_mensagens.style.backgroundColor = '#98002E'
        container_mensagens.innerHTML = `
        <span>Mercado fechado para a ${rodada}° rodada!</span>
        <span>Reabertura do mercado: ${horarioFimRodada} de ${diaFimRodada}/${mesFimRodada}/${anoFimRodada}</span>`
    }
}

function AvisoMercadoFechado() {
    container_mensagens.style.backgroundColor = '#6b0121'
    container_mensagens.innerHTML = `
        <span>ATENÇÃO</span>
        <span>Mercado fechado para a ${rodada}° rodada!</span>`

    setTimeout(avisoMercado, 5000)
}

function avisoLogin() {
    container_mensagens.style.backgroundColor = '#007A33'

    if (rodada == 0) {
        container_mensagens.innerHTML = `
        <span>Seja bem-vindo</span>`
    }
    else {
        container_mensagens.innerHTML = `
        <span>Seja bem-vindo, sua pontuação na ${rodada - 1}° rodada, foi ${sessionStorage.ULTIMA_PONTUACAO}!</span>`
    }

    setTimeout(avisoMercado, 5000)
}

function avisoTimeCarregado() {
    container_mensagens.style.backgroundColor = '#007A33'
    container_mensagens.innerHTML = `
    <span>Seja bem-vindo, seu time anterior foi carregado!</span>`

    setTimeout(avisoMercado, 5000)
}

function AvisoTimeCheio() {
    container_mensagens.style.backgroundColor = '#98002E'
    container_mensagens.innerHTML = `
    <span>Impossível adicionar outro jogador para esta posição!</span>`

    setTimeout(avisoMercado, 5000)
}

function avisoSemDinheiro() {
    container_mensagens.style.backgroundColor = '#98002E'
    container_mensagens.innerHTML = `
    <span>Dinheiro insuficiente!</span>`

    setTimeout(avisoMercado, 5000)
}

function avisoTimeEnviado() {
    container_mensagens.style.backgroundColor = '#007A33'
    container_mensagens.innerHTML = `
    <span>Seu time foi enviado com sucesso!</span>`

    setTimeout(avisoMercado, 5000)
}

function avisoTimeAtualizado() {
    container_mensagens.style.backgroundColor = '#007A33'
    container_mensagens.innerHTML = `
    <span>Seu time foi atualizado com sucesso!</span>`

    setTimeout(avisoMercado, 5000)
}

function avisoErroEnviarTime() {
    container_mensagens.style.backgroundColor = '#98002E'
    container_mensagens.innerHTML = `
    <span>Houve um erro ao enviar o time!</span>`

    setTimeout(avisoMercado, 5000)
}