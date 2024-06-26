var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                            res.json({
                                id: resultadoAutenticar[0].idUsuario,
                                email: resultadoAutenticar[0].email,
                                nome: resultadoAutenticar[0].nomeTime,
                                senha: resultadoAutenticar[0].senha,
                                dinheiro: resultadoAutenticar[0].dinheiro,
                            });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function obterTimeUsuario(req, res) {
    var idUsuario = req.params.idUsuario;
    usuarioModel.obterTimeUsuario(idUsuario)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterUltimaPontuacaoUser(req, res) {
    var idUsuario = req.params.idUsuario;
    var rodadaAnterior = req.params.rodadaAnterior;

    usuarioModel.obterUltimaPontuacaoUser(idUsuario, rodadaAnterior)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function inserirTime(req, res) {
    const { idUsuario, rodada, jogador1, jogador2, jogador3, jogador4, jogador5, valor } = req.body;

    usuarioModel.inserirTime(idUsuario, rodada, jogador1, jogador2, jogador3, jogador4, jogador5, valor)
        .then(result => {
            res.status(200).send("Time inserido com sucesso!");
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function atualizarTime(req, res) {
    const { idUsuario, rodada, jogador1, jogador2, jogador3, jogador4, jogador5, valor } = req.body;

        usuarioModel.atualizarTime(idUsuario, rodada, jogador1, jogador2, jogador3, jogador4, jogador5, valor)
            .then(result => {
                res.status(200).send("Time atualizado com sucesso!");
            })
            .catch(erro => {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
}

module.exports = {
    autenticar,
    obterTimeUsuario,
    obterUltimaPontuacaoUser,
    cadastrar,
    inserirTime,
    atualizarTime
}