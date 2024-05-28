function cadastrar() {
    // aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = input_cadastro_username.value;
    var emailVar = input_cadastro_email.value;
    var senhaVar = input_cadastro_senha.value;
    var confirmacaoSenhaVar = input_confirmacao_senha.value;

    if (
        nomeVar == "" ||
        emailVar == "" ||
        senhaVar == "" ||
        confirmacaoSenhaVar == "" ||
        confirmacaoSenhaVar != senhaVar
    ) {
        alert('Mensagem de erro para todos os campos em branco');

        //   finalizarAguardar();
        return false;
    } else {
        //   setInterval(sumirMensagem, 5000);
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

                //   setTimeout(() => {
                //     window.location = "login.html";
                //   }, "2000");

                //   limparFormulario();
                //   finalizarAguardar();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });

    return false;
}

// function listar() {
//     fetch("/empresas/listar", {
//         method: "GET",
//     })
//         .then(function (resposta) {
//             resposta.json().then((empresas) => {
//                 empresas.forEach((empresa) => {
//                     listaEmpresas.innerHTML += `<option value='${empresa.id}'>${empresa.cnpj}</option>`;
//                 });
//             });
//         })
//         .catch(function (resposta) {
//             console.log(`#ERRO: ${resposta}`);
//         });
// }

function sumirMensagem() {

}