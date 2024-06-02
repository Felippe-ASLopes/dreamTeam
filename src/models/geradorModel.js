var database = require("../database/config");

function inserir(comandoInsert) {
    var instrucaoSql = `INSERT INTO estatistica VALUES ${comandoInsert}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    inserir
};