var express = require("express");
var router = express.Router();

var jogadorController = require("../controllers/jogadorController");

router.get("/obter", function (req, res) {
    jogadorController.obterJogadores(req, res);
});

module.exports = router;