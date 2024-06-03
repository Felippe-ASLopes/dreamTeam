var database = require("../database/config");

function inserir(comandoInsert) {
    var instrucaoSql = `INSERT INTO estatistica VALUES ${comandoInsert}`;

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

function atualizarDinheiroUser(idUsuario, dinheiro) {
    var instrucaoSql = `
        UPDATE usuario
        SET dinheiro = ${dinheiro}
        WHERE idUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    inserir,
    obterTodosTimesUsuario,
    atualizarPontuacaoUser,
    atualizarDinheiroUser
};