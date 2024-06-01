var estatisticaModel = require("../models/estatisticaModel");

function inserir(req, res) {
    var comandoInsert = req.body.comandoInsert;

    if (comandoInsert == undefined) {
        res.status(400).send("O comando de inserção está undefined!");
    } else {
        estatisticaModel.inserir(comandoInsert)
            .then(function (resultado) {
                res.status(200).send("Estatísticas inseridas com sucesso!");
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    inserir
};