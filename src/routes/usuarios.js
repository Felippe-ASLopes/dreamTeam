var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/obterTimeUsuario/:idUsuario", function (req, res) {
    usuarioController.obterTimeUsuario(req, res);
});

router.get("/obterUltimaPontuacaoUser/:idUsuario/:rodadaAnterior", function (req, res) {
    usuarioController.obterUltimaPontuacaoUser(req, res);
});

router.post("/inserirTime", function (req, res) {
    usuarioController.inserirTime(req, res);
});

router.put("/atualizarTime", function (req, res) {
    usuarioController.atualizarTime(req, res);
});

module.exports = router;