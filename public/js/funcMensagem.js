let rodadaAtual = []

function obterRodada() {
    fetch("/rodada/obter", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                rodadaAtual = json
                console.log("Rodada:", rodadaAtual);
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


function avisoMercado() {
    const rodada = rodadaAtual[0].idRodada
    const dataInicio = rodadaAtual[0].dataInicio
    const horaInicio = rodadaAtual[0].horaInicio
    const ano = dataInicio.substring(0, 4)
    const mes = dataInicio.substring(5, 7)
    const dia = dataInicio.substring(8, 10)

    container_mensagens.style.backgroundColor = '#0077C0'
    container_mensagens.innerHTML = `
    <span>Rodada: ${rodada}</span>
    <span>Fechamento do mercado: ${horaInicio} de ${dia}/${mes}/${ano}</span>`
}

function avisoLogin() {
    container_mensagens.style.backgroundColor = '#007A33'
    container_mensagens.innerHTML = `
    <span>Seja bem vindo</span>`

    setTimeout(avisoMercado, 5000)
}

