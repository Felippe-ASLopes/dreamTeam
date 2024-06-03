let ultimostimesUser = []
const dinheiroTimesUsers = []
let comandoInsert = ``
let comandoDoAdmin = false

function exibirGerador() {
    div_gerador.classList.remove('oculto')
    div_controle.classList.remove('oculto')
}

function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gerarEstatisticas() {
    if (mercadoAberto) {
        container_mensagens.style.backgroundColor = '#98002E'
        container_mensagens.innerHTML = `
        <span>Impossível gerar estatísticas com o mercado aberto!</span>`

        setTimeout(avisoMercado, 5000)
    }
    else {
        jogadores.forEach(posicao => {
            const jogador = posicao.idJogador
            const pontos = gerarNumeroAleatorio(0, 60)
            const assistencias = gerarNumeroAleatorio(0, 15)
            const rebotes = gerarNumeroAleatorio(0, 15)
            const bloqueios = gerarNumeroAleatorio(0, 15)
            const roubos = gerarNumeroAleatorio(0, 15)
            const turnOvers = gerarNumeroAleatorio(0, 15)
            const faltas = gerarNumeroAleatorio(0, 5)

            if (jogador == 1) {
                comandoInsert = `(${rodada}, ${jogador}, ${pontos}, ${assistencias}, ${rebotes}, ${bloqueios}, ${roubos}, ${turnOvers}, ${faltas}, 0)`
            }
            else {
                comandoInsert += `,(${rodada}, ${jogador}, ${pontos}, ${assistencias}, ${rebotes}, ${bloqueios}, ${roubos}, ${turnOvers}, ${faltas}, 0)`
            }
        });
        inserirEstatisticas()
    }
}

function inserirEstatisticas() {
    fetch("/admin/inserir", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ comandoInsert: comandoInsert })
    }).then(function (resposta) {
        if (resposta.ok) {
            calcularPontuacao()
            container_mensagens.style.backgroundColor = '#007A33'
            container_mensagens.innerHTML = `<span>Estatísticas inseridas com sucesso!</span>`

            setTimeout(avisoMercado, 5000)
        } else {
            container_mensagens.style.backgroundColor = '#98002E'
            container_mensagens.innerHTML = `
                <span>Houve um erro ao tentar inserir as estatísticas!</span>`

            setTimeout(avisoMercado, 5000)

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log("Erro na requisição:", erro);
    });

}

function controlarMercado() {
    comandoDoAdmin = true
    if (mercadoAberto) {
        mercadoAberto = false
        container_enviar_time.classList.add('oculto')
        div_controle.innerHTML = `<span>Abrir Mercado</span>`
        div_controle.style.backgroundColor = `#007A33`
    }
    else {
        mercadoAberto = true
        obterEstatistica()
        container_enviar_time.classList.remove('oculto')
        div_controle.innerHTML = `<span>Fechar Mercado</span>`
        div_controle.style.backgroundColor = `#98002E`
    }
    avisoMercado()
}

function obterTodosTimesUsuario() {
    const rodadaAnterior = rodada - 1

    fetch(`/admin/obterTodosTimesUsuario/${rodadaAnterior}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(jsonUltimoTime => {
                if (jsonUltimoTime.length > 0) {
                    ultimostimesUser = jsonUltimoTime
                    console.log("Todos times dos usuários na última rodada:", ultimostimesUser);
                    calcularPontuacaoUser()
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