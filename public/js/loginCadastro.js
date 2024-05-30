// FUNÇÕES DA API
function login() {
    var emailVar = input_login_email.value;
    var senhaVar = input_login_senha.value;

    if (emailVar == "" || senhaVar == "") {
        alert('Mensagem de erro para todos os campos em branco');
        return false;
    }
    else {
        // setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log("if resposta ok!")
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nomeTime;
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.DINHEIRO_USUARIO = json.dinheiro;
                carregarTimeUser()
                fecharlogin()

                // setTimeout(function () {
                // }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function cadastrar() {
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
                mostrarLogin()
                //   setTimeout(() => {
                //     window.location = "login.html";
                //   }, "2000");

                //   limparFormulario();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}

// FUNÇÕES PARA O HTML
function mostrarLogin() {
    main_time.classList.add('blur')
    container_login.classList.remove('oculto')
    container_cadastro.classList.add('oculto')
    span_login.style.fontSize = '2.5vw'
    span_cadastro.style.fontSize = '2vw'
    document.title = 'Login - Dream Team'
}

function mostrarCadastro() {
    main_time.classList.add('blur')
    container_login.classList.add('oculto')
    container_cadastro.classList.remove('oculto')
    span_login.style.fontSize = '2vw'
    span_cadastro.style.fontSize = '2.3vw'
    document.title = 'Cadastro - Dream Team'
}

function fecharlogin() {
    main_time.classList.remove('blur')
    container_login_cadastro.style.display = 'none'
    alert(`logado com sucesso`)
    document.title = 'Dream Team - Monte seu time'
}