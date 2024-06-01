var database = require("../database/config");

function obterJogadores() {
    var instrucaoSql = `
    SELECT idJogador, nomeJogador, sobrenome, sigla, preco, cidade, nomeTimeNba, urlImagem FROM jogador 
    JOIN timeNba ON fkTime = idTime
    JOIN posicao ON fkPosicao = idPosicao 
    ORDER BY idJogador;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterJogadores
};