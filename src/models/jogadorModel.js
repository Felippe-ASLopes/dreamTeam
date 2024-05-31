var database = require("../database/config");

function obterJogadores() {
    var instrucaoSql = `
    select idJogador, nomeJogador, sobrenome, sigla, preco, cidade, nomeTimeNba from jogador 
    join timeNba on fkTime = idTime
    join posicao on fkPosicao = idPosicao 
    order by idJogador;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterJogadores
};