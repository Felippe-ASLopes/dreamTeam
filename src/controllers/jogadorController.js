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

module.exports = {
    obterJogadores
};