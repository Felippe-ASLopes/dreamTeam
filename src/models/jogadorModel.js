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

function atualizarPontuacaoJogadores(jogador, pontuacaoJogador) {
    var instrucaoSql = `
        UPDATE estatistica
        SET pontuacaoJogador = ${pontuacaoJogador}
        WHERE fkJogador = ${jogador};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterValoresJogadores() {
    var instrucaoSql = `
        SELECT idJogador, preco
        FROM jogador;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarPrecoJogadores(jogador, comandoSql) {
    var instrucaoSql = `
        UPDATE jogador
        SET preco = preco ${comandoSql}
        WHERE idJogador = ${jogador};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterJogadores,
    atualizarPontuacaoJogadores,
    obterValoresJogadores,
    atualizarPrecoJogadores
};