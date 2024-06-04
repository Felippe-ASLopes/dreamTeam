var database = require("../database/config");

function obterRodada() {
    var instrucaoSql = `
        SELECT idRodada, date(inicio) as 'dataInicio', time(inicio) as 'horaInicio', date(fim) as 'dataFim', time(fim) as 'horaFim' FROM rodada
        WHERE idRodada = (SELECT MAX(idRodada) FROM rodada);
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterEstatistica() {
    var instrucaoSql = `
        SELECT * FROM estatistica
        WHERE fkRodada = (SELECT MAX(fkRodada) FROM estatistica);
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterEstatisticaDashboard() {
    var instrucaoSql = `
        SELECT * FROM estatistica
        WHERE fkRodada = (SELECT MAX(fkRodada) FROM estatistica) ORDER BY pontuacaoJogador DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterRodadaDashboard() {
    var instrucaoSql = `
        SELECT idRodada FROM rodada
        WHERE idRodada = (SELECT MAX(idRodada) FROM rodada);
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterRodada,
    obterEstatistica,
    obterEstatisticaDashboard,
    obterRodadaDashboard
};