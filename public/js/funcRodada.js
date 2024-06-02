let rodadaAtual = []
let rodada = 0
let dataInicioRodada = ''
let horarioInicioRodada = ''
let anoInicioRodada = 0
let mesInicioRodada = 0
let diaInicioRodada = 0
let horaInicioRodada = 0
let segundoInicioRodada = 0
let dataFimRodada = ''
let horarioFimRodada = ''
let anoFimRodada = 0
let mesFimRodada = 0
let diaFimRodada = 0
let horaFimRodada = 0
let segundoFimRodada = 0
let mercadoAberto = true

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
                rodada = rodadaAtual[0].idRodada
                dataInicioRodada = rodadaAtual[0].dataInicio
                horarioInicioRodada = rodadaAtual[0].horaInicio
                anoInicioRodada = Number(dataInicioRodada.substring(0, 4))
                mesInicioRodada = Number(dataInicioRodada.substring(5, 7))
                diaInicioRodada = Number(dataInicioRodada.substring(8, 10))
                horaInicioRodada = Number(horarioInicioRodada.substring(0, 2))
                segundoInicioRodada = Number(horarioInicioRodada.substring(6, 8))
                dataFimRodada = rodadaAtual[0].dataFim
                horarioFimRodada = rodadaAtual[0].horaFim
                anoFimRodada = Number(dataFimRodada.substring(0, 4))
                mesFimRodada = Number(dataFimRodada.substring(5, 7))
                diaFimRodada = Number(dataFimRodada.substring(8, 10))
                horaFimRodada = Number(horarioFimRodada.substring(0, 2))
                segundoFimRodada = Number(horarioFimRodada.substring(6, 8))
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

function verificarHorario() {
    var dataHoraAtual = new Date()
    var diaAtual = dataHoraAtual.getDate()
    var mesAtual = dataHoraAtual.getMonth() + 1
    var anoAtual = dataHoraAtual.getFullYear()
    var horasAtual = dataHoraAtual.getHours()
    var segundosAtual = dataHoraAtual.getSeconds()

    if (segundosAtual == segundoInicioRodada &&
        horasAtual == horaInicioRodada &&
        diaAtual == diaInicioRodada &&
        mesAtual == mesInicioRodada &&
        anoAtual == anoInicioRodada) {
        mercadoAberto = false
        container_enviar_time.classList.add('oculto')
        avisoMercado()
    }
    else if (segundosAtual == segundoFimRodada &&
        horasAtual == horaFimRodada &&
        diaAtual == diaFimRodada &&
        mesAtual == mesFimRodada &&
        anoAtual == anoFimRodada) {
        mercadoAberto = true
        container_enviar_time.classList.remove('oculto')
        avisoMercado()
    }
}

setInterval(verificarHorario, 1000)