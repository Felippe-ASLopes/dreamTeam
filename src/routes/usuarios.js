var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/inserirTime", function (req, res) {
    usuarioController.inserirTime(req, res);
});

router.put("/atualizarTime", function (req, res) {
    usuarioController.atualizarTime(req, res);
});

module.exports = router;