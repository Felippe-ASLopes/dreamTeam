var adminModel = require("../models/adminModel");

function inserir(req, res) {
    var comandoInsert = req.body.comandoInsert;

    if (comandoInsert == undefined) {
        res.status(400).send("O comando de inserção está undefined!");
    } else {
        adminModel.inserir(comandoInsert)
            .then(function (resultado) {
                res.status(200).send("Estatísticas inseridas com sucesso!");
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function obterTodosTimesUsuario(req, res) {
    var rodadaAnterior = req.params.rodadaAnterior;
    adminModel.obterTodosTimesUsuario(rodadaAnterior)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function atualizarPontuacaoUser(req, res) {
    var fkUsuario = req.body.fkUsuario;
    var pontuacao = req.body.pontuacao;
    var rodada = req.body.rodada;

    adminModel.atualizarPontuacaoUser(fkUsuario, pontuacao, rodada)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function atualizarDinheiroUser(req, res) {
    var idUsuario = req.body.idUsuario;
    var comandoUpdate = req.body.comandoUpdate;

    adminModel.atualizarDinheiroUser(idUsuario, comandoUpdate)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function novaRodada(req, res) {
    adminModel.novaRodada()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    inserir,
    obterTodosTimesUsuario,
    atualizarPontuacaoUser,
    atualizarDinheiroUser,
    novaRodada
};