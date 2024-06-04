var rodadaModel = require("../models/rodadaModel");

function obterRodada(req, res) {
    rodadaModel.obterRodada()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterEstatistica(req, res) {
    rodadaModel.obterEstatistica()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterEstatisticaDashboard(req, res) {
    rodadaModel.obterEstatisticaDashboard()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterRodadaDashboard(req, res) {
    rodadaModel.obterRodadaDashboard()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    obterRodada,
    obterEstatistica,
    obterEstatisticaDashboard,
    obterRodadaDashboard
};