var express = require("express");
var router = express.Router();

var geradorController = require("../controllers/geradorController");

router.post("/inserir", function (req, res) {
    geradorController.inserir(req, res);
});

module.exports = router;