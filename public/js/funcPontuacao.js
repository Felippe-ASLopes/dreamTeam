let estatisticas = []
const pontuacao = []

function obterEstatistica() {
    fetch("/rodada/obterEstatistica")
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    console.log('Estatisticas:', json);
                    estatisticas = json
                    calcularPontuacao()
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

function calcularPontuacao() {
    estatisticas.forEach(estatistica => {
        const pontos = estatistica.ponto
        const assistencias = estatistica.assistencia
        const rebotes = estatistica.rebote
        const bloqueios = estatistica.bloqueio
        const roubos = estatistica.roubo
        const turnOvers = estatistica.turnOver
        const faltas = estatistica.falta
        const listaEstatisticas = [pontos, assistencias, rebotes, bloqueios, roubos]
        let atributosAcimaDe10 = 0
        
        listaEstatisticas.forEach(posicaoEstatistica => {
            if (posicaoEstatistica >= 10) {
                atributosAcimaDe10++
            }
        });
        
        const calculoPontuacao = (pontos + assistencias + (rebotes * 0.5) + bloqueios + (roubos * 0.5) - turnOvers - faltas)
        const bonus = atributosAcimaDe10 * 2
        const totalPontuacao = calculoPontuacao + bonus
        pontuacao.push(totalPontuacao)
    });
}