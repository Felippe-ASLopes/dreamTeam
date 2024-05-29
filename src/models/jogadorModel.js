var database = require("../database/config");

function obterJogadores() {
    var instrucaoSql = `
        SELECT idJogador, nome, valor FROM jogador;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterJogadores
};