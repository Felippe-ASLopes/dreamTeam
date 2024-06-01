var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idUsuario, nomeTime, email, dinheiro FROM usuario WHERE email = '${email}' AND senha = md5('${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterTimeUsuario(idUsuario) {
    var instrucaoSql = `
        SELECT * FROM timeUsuario
        WHERE fkRodada = (SELECT MAX(fkRodada) FROM timeUsuario) and fkUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (nomeTime, email, senha, dinheiro) VALUES ('${nome}', '${email}', md5('${senha}'), 100);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirTime(idUsuario, rodada, jogador1, jogador2, jogador3, jogador4, jogador5, valor) {
    var instrucaoSql = `
        INSERT INTO timeUsuario VALUES
        (${idUsuario}, ${rodada}, ${jogador1}, ${jogador2}, ${jogador3}, ${jogador4}, ${jogador5}, ${valor});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarTime(idUsuario, rodada, jogador1, jogador2, jogador3, jogador4, jogador5, valor) {
    var instrucaoSql = `
        UPDATE timeUsuario SET 
            fkJogador1 = ${jogador1}, 
            fkJogador2 = ${jogador2}, 
            fkJogador3 = ${jogador3}, 
            fkJogador4 = ${jogador4}, 
            fkJogador5 = ${jogador5},
            valor = ${valor}
        WHERE 
            fkUsuario = ${idUsuario} AND 
            fkRodada = ${rodada};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    obterTimeUsuario,
    cadastrar,
    inserirTime,
    atualizarTime
};