var express = require("express");
var router = express.Router();

var jogadorController = require("../controllers/jogadorController");

router.get("/obter", function (req, res) {
    jogadorController.obterJogadores(req, res);
});

router.put("/atualizarPontuacao", function (req, res) {
    jogadorController.atualizarPontuacaoJogadores(req, res);
});

router.get("/obterValoresJogadores", function (req, res) {
    jogadorController.obterValoresJogadores(req, res);
});

router.put("/atualizarPreco", function (req, res) {
    jogadorController.atualizarPrecoJogadores(req, res);
});

module.exports = router;