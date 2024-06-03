const valorizacao = []
let valorJogadoresDesatualizados = []

function obterEstatistica() {
    fetch("/rodada/obterEstatistica")
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    console.log('Estatisticas:', json);
                    estatisticas = json
                    if (!comandoDoAdmin) {
                        obterJogadores()
                    }
                    else {
                        calcularPontuacao()
                    }
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
    if (podeCalcular) {
        podeCalcular = false

        pontuacao.splice(0, pontuacao.length)
        estatisticas.forEach(estatistica => {
            const jogador = estatistica.fkJogador
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
    
            const calculoPontuacao = (pontos + (assistencias * 0.75) + (rebotes * 0.5) + (bloqueios * 0.75) + (roubos * 0.5) - turnOvers - (faltas * 0.5))
            const bonus = atributosAcimaDe10 * 2
            const totalPontuacao = calculoPontuacao + bonus
            // console.log('pontuacao:', jogador, totalPontuacao)
            pontuacao.push({
                idJogador: jogador,
                pontos: totalPontuacao
            })
        });
        // console.log('Ultima pontuação:', pontuacao)
        atualizarPontuacaoJogadores()
    }
    else {
        obterJogadores()
    }
}

function atualizarPontuacaoJogadores() {
    for (let posicao = 0; posicao < pontuacao.length; posicao++) {
        const jogador = pontuacao[posicao].idJogador
        const pontuacaoJogador = pontuacao[posicao].pontos

        fetch("/jogadores/atualizarPontuacao", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                jogador: jogador,
                pontuacaoJogador: pontuacaoJogador
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    // console.log("Pontuação do jogador atualizada:", json);
                });
            } else {
                console.log("Houve um erro ao tentar atualizar a pontuação do jogador!");

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function (erro) {
            console.log("Erro na requisição:", erro);
        });
    }
    console.log("Pontuação dos jogadores atualizada:");
    obterValoresJogadores()
}

function obterValoresJogadores() {
    fetch("/jogadores/obterValoresJogadores", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                valorJogadoresDesatualizados = json
                calcularPreco()
            });
        } else {
            console.log("Houve um erro ao tentar obter o valor dos jogadores!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log("Erro na requisição:", erro);
    });
}

function calcularPreco() {
    if (estatisticas.length > 0) {
        valorizacao.splice(0, valorizacao.length)
        for (let posicao = 0; posicao < valorJogadoresDesatualizados.length; posicao++) {
            const valorJogador = Number(valorJogadoresDesatualizados[posicao].preco)
            const pontuacaoRodada = pontuacao[posicao].pontos
            const pontuacaoParaValorizar = (valorJogador * 1.5).toFixed(2)
            const pontuacaoParaDesvalorizar = (valorJogador * 0.75).toFixed(2)
            let valor = 0
            let acao = 'Manteve'

            if (pontuacaoRodada > pontuacaoParaValorizar) {
                valor = Number(((pontuacaoRodada - pontuacaoParaValorizar) / 2).toFixed(2))
                acao = 'Valorizou'
                valorizacao.push({
                    acao: acao,
                    idJogador: valorJogadoresDesatualizados[posicao].idJogador,
                    valor: valor
                })
            }
            else if (pontuacaoRodada < pontuacaoParaDesvalorizar) {
                valor = Number(((pontuacaoParaValorizar - pontuacaoRodada) / 2).toFixed(2))
                acao = 'Desvalorizou'
                valorizacao.push({
                    acao: acao,
                    idJogador: valorJogadoresDesatualizados[posicao].idJogador,
                    valor: valor
                })
            }
            else {
                valorizacao.push({
                    acao: acao,
                    idJogador: valorJogadoresDesatualizados[posicao].idJogador,
                    valor: valor
                })
            }

        }
        console.log('Valorização:', valorizacao)
        atualizarPrecoJogadores()
    }
}

function atualizarPrecoJogadores() {
    for (let posicao = 0; posicao < valorizacao.length; posicao++) {
        const jogador = valorizacao[posicao].idJogador
        const acaoValor = valorizacao[posicao].acao
        let comandoSql = valorizacao[posicao].valor

        if (acaoValor == 'Valorizou') {
            comandoSql = `+ ${valorizacao[posicao].valor}`
        }
        else if (acaoValor == 'Desvalorizou') {
            comandoSql = `- ${valorizacao[posicao].valor}`
        }
        // console.log(comandoSql)

        if (comandoSql != 0) {
            fetch("/jogadores/atualizarPreco", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    jogador: jogador,
                    comandoSql: comandoSql
                })
            }).then(function (resposta) {
                if (resposta.ok) {
                    resposta.json().then(json => {
                        // console.log("Preço do jogador atualizado com sucesso:", jogador, comandoSql);
                    });
                } else {
                    console.log("Houve um erro ao tentar atualizar o preço do jogador!");
                    resposta.text().then(texto => {
                        console.error(texto);
                    });
                }
            }).catch(function (erro) {
                console.log("Erro na requisição:", erro);
            });
        }
    }
    obterJogadores();
    obterTodosTimesUsuario();
    obterTimeUsuario();
}

function calcularPontuacaoUser() {
    for (let time = 0; time < ultimostimesUser.length; time++) {
        const jogador1 = ultimostimesUser[time].fkJogador1
        const jogador2 = ultimostimesUser[time].fkJogador2
        const jogador3 = ultimostimesUser[time].fkJogador3
        const jogador4 = ultimostimesUser[time].fkJogador4
        const jogador5 = ultimostimesUser[time].fkJogador5
        const pontuacaoJogador1 = Number(pontuacao[jogador1 - 1].pontos)
        const pontuacaoJogador2 = Number(pontuacao[jogador2 - 1].pontos)
        const pontuacaoJogador3 = Number(pontuacao[jogador3 - 1].pontos)
        const pontuacaoJogador4 = Number(pontuacao[jogador4 - 1].pontos)
        const pontuacaoJogador5 = Number(pontuacao[jogador5 - 1].pontos)

        ultimostimesUser[time].pontuacao = pontuacaoJogador1 + pontuacaoJogador2 + pontuacaoJogador3 + pontuacaoJogador4 + pontuacaoJogador5

        // console.log('jogadores:', pontuacaoJogador1, pontuacaoJogador2, pontuacaoJogador3, pontuacaoJogador4, pontuacaoJogador5, 'usuario:', ultimostimesUser[time].pontuacao)
    }
    atualizarPontuacaoUser()
}

function atualizarPontuacaoUser() {
    for (let time = 0; time < ultimostimesUser.length; time++) {
        const idUsuario = ultimostimesUser[time].fkUsuario
        const rodada = ultimostimesUser[time].fkRodada
        const pontuacao = ultimostimesUser[time].pontuacao

        fetch("/admin/atualizarPontuacaoUser", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fkUsuario: idUsuario,
                pontuacao: pontuacao,
                rodada: rodada
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    // console.log("Pontuação do usuário atualizada:", json);
                });
            } else {
                console.log("Houve um erro ao tentar atualizar a pontuação do usuário!");

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function (erro) {
            console.log("Erro na requisição:", erro);
        });
    }
    console.log("Pontuação dos usuários atualizada");

    calcularDinheiroUsers()
}

function calcularDinheiroUsers() {
    for (let time = 0; time < ultimostimesUser.length; time++) {
        const idUsuario = ultimostimesUser[time].fkUsuario
        const jogador1 = ultimostimesUser[time].fkJogador1
        const jogador2 = ultimostimesUser[time].fkJogador2
        const jogador3 = ultimostimesUser[time].fkJogador3
        const jogador4 = ultimostimesUser[time].fkJogador4
        const jogador5 = ultimostimesUser[time].fkJogador5
        const valorJogador1 = Number(valorizacao[jogador1 - 1].valor)
        const valorJogador2 = Number(valorizacao[jogador2 - 1].valor)
        const valorJogador3 = Number(valorizacao[jogador3 - 1].valor)
        const valorJogador4 = Number(valorizacao[jogador4 - 1].valor)
        const valorJogador5 = Number(valorizacao[jogador5 - 1].valor)
        const acaoJogador1 = valorizacao[jogador1 - 1].acao
        const acaoJogador2 = valorizacao[jogador2 - 1].acao
        const acaoJogador3 = valorizacao[jogador3 - 1].acao
        const acaoJogador4 = valorizacao[jogador4 - 1].acao
        const acaoJogador5 = valorizacao[jogador5 - 1].acao
        let dinheiroUserAtualizar = 0

        const timeUserAtuzaliar = [{
            acaoJogador: acaoJogador1,
            valorJogador: valorJogador1
        }, {
            acaoJogador: acaoJogador2,
            valorJogador: valorJogador2
        }, {
            acaoJogador: acaoJogador3,
            valorJogador: valorJogador3
        }, {
            acaoJogador: acaoJogador4,
            valorJogador: valorJogador4
        }, {
            acaoJogador: acaoJogador5,
            valorJogador: valorJogador5
        }]

        timeUserAtuzaliar.forEach(i => {
            if (i.acaoJogador == 'Valorizou') {
                dinheiroUserAtualizar += i.valorJogador
            }
            else if (i.acaoJogador == 'Desvalorizou') {
                dinheiroUserAtualizar -= i.valorJogador
            }
        });

        dinheiroTimesUsers.push({
            idUsuario: idUsuario,
            dinheiro: (dinheiroUserAtualizar).toFixed(2)
        })
    }
    console.log('Calculando o dinheiro dos user:', dinheiroTimesUsers)
    atualizarDinheiroUsers()
}

function atualizarDinheiroUsers() {
    for (let time = 0; time < dinheiroTimesUsers.length; time++) {
        const idUsuario = dinheiroTimesUsers[time].idUsuario
        const dinheiro = dinheiroTimesUsers[time].dinheiro
        let comandoUpdate = `+ ${dinheiro}`

        if (dinheiro < 0) {
            comandoUpdate = `${dinheiro}`
        }

        if (dinheiro != 0) {
            fetch("/admin/atualizarDinheiroUser", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idUsuario: idUsuario,
                    comandoUpdate: comandoUpdate
                })
            }).then(function (resposta) {
                if (resposta.ok) {
                    resposta.json().then(json => {
                        console.log("Dinheiro do usuário atualizado:", idUsuario, dinheiro);
                    });
                } else {
                    console.log("Houve um erro ao tentar atualizar o dinheiro do usuário!");

                    resposta.text().then(texto => {
                        console.error(texto);
                    });
                }
            }).catch(function (erro) {
                console.log("Erro na requisição:", erro);
            });
        }
    }
    dinheiroTimesUsers.splice(0, dinheiroTimesUsers.length)
    obterTimeUsuario()
}