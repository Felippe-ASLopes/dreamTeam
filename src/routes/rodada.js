var express = require("express");
var router = express.Router();
var rodadaController = require("../controllers/rodadaController");

router.get("/obter", function (req, res) {
    rodadaController.obterRodada(req, res);
});

router.get("/obterEstatistica", function (req, res) {
    rodadaController.obterEstatistica(req, res);
});

module.exports = router;