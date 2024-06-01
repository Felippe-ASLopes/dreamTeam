var express = require("express");
var router = express.Router();
var rodadaController = require("../controllers/rodadaController");

router.get("/obter", function (req, res) {
    rodadaController.obterRodada(req, res);
});

module.exports = router;