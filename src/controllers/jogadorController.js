var jogadorModel = require("../models/jogadorModel");

function obterJogadores(req, res) {
    jogadorModel.obterJogadores()
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.json(resultado);
                } else {
                    res.status(404).send("Nenhum jogador encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function atualizarPontuacaoJogadores(req, res) {
    var jogador = req.body.jogador;
    var pontuacaoJogador = req.body.pontuacaoJogador;

    jogadorModel.atualizarPontuacaoJogadores(jogador, pontuacaoJogador)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterValoresJogadores(req, res) {
    jogadorModel.obterValoresJogadores()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function atualizarPrecoJogadores(req, res) {
    var jogador = req.body.jogador;
    var comandoSql = req.body.comandoSql;

    jogadorModel.atualizarPrecoJogadores(jogador, comandoSql)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    obterJogadores,
    atualizarPontuacaoJogadores,
    obterValoresJogadores,
    atualizarPrecoJogadores
};