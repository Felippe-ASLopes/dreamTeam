var database = require("../database/config");

function inserir(comandoInsert) {
    var instrucaoSql = `INSERT INTO estatistica VALUES ${comandoInsert};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterTodosTimesUsuario(rodadaAnterior) {
    var instrucaoSql = `
        SELECT * FROM timeUsuario
        WHERE fkRodada = ${rodadaAnterior};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarPontuacaoUser(fkUsuario, pontuacao, rodada) {
    var instrucaoSql = `
        UPDATE timeUsuario
        SET pontuacao = ${pontuacao}
        WHERE fkUsuario = ${fkUsuario} AND fkRodada = ${rodada};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarDinheiroUser(idUsuario, comandoUpdate) {
    var instrucaoSql = `
        UPDATE usuario
        SET dinheiro = dinheiro ${comandoUpdate}
        WHERE idUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function novaRodada() {
    var instrucaoSql = `INSERT INTO rodada VALUES
    (DEFAULT, '2024-06-03 23:59:59', '2024-06-04 00:00:00');`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterUsuariosDashboard(rodadaAnterior) {
    var instrucaoSql = `
    SELECT nomeTime, fkJogador1, fkJogador2, fkJogador3, fkJogador4, fkJogador5, pontuacao, valor FROM timeUsuario JOIN usuario on fkUsuario = idUsuario
    WHERE fkRodada = ${rodadaAnterior} ORDER BY pontuacao DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    inserir,
    obterTodosTimesUsuario,
    atualizarPontuacaoUser,
    atualizarDinheiroUser,
    novaRodada,
    obterUsuariosDashboard
};