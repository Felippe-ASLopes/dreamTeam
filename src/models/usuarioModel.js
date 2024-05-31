var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idUsuario, nomeTime, email, dinheiro FROM usuario WHERE email = '${email}' AND senha = md5('${senha}');
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

function inserirTime(idUsuario, jogador1, jogador2, jogador3, jogador4, jogador5, valor) {
    var instrucaoSql = `
        INSERT INTO timeUsuario VALUES
        (${idUsuario}, 1, ${jogador1}, ${jogador2}, ${jogador3}, ${jogador4}, ${jogador5}, ${valor});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    inserirTime
};