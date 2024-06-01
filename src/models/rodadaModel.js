var database = require("../database/config");

function obterRodada() {
    console.log("Obtendo a última rodada no banco de dados");

    var instrucaoSql = `
        SELECT idRodada, date(inicio) as 'dataInicio', time(inicio) as 'horaInicio', date(fim) as 'dataFim', time(fim) as 'horaFim' FROM rodada
        WHERE idRodada = (SELECT MAX(idRodada) FROM rodada);
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterRodada
};