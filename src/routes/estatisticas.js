var express = require("express");
var router = express.Router();

var estatisticaController = require("../controllers/estatisticaController");

router.post("/inserir", function (req, res) {
    estatisticaController.inserir(req, res);
});

module.exports = router;