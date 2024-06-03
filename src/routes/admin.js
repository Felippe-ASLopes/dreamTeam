var express = require("express");
var router = express.Router();

var adminController = require("../controllers/adminController");

router.post("/inserir", function (req, res) {
    adminController.inserir(req, res);
});

router.get("/obterTodosTimesUsuario/:rodadaAnterior", function (req, res) {
    adminController.obterTodosTimesUsuario(req, res);
});

router.put("/atualizarPontuacaoUser", function (req, res) {
    adminController.atualizarPontuacaoUser(req, res);
});

router.put("/atualizarDinheiroUser", function (req, res) {
    adminController.atualizarDinheiroUser(req, res);
});

module.exports = router;