var express = require("express");
var router = express.Router();
var rodadaController = require("../controllers/rodadaController");

router.get("/obter", function (req, res) {
    rodadaController.obterRodada(req, res);
});

router.get("/obterEstatistica", function (req, res) {
    rodadaController.obterEstatistica(req, res);
});

router.get("/obterEstatisticaDashboard", function (req, res) {
    rodadaController.obterEstatisticaDashboard(req, res);
});

router.get("/obterRodadaDashboard", function (req, res) {
    rodadaController.obterRodadaDashboard(req, res);
});

module.exports = router;