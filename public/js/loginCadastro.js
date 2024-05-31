// FUNÇÕES DA API
function login() {
    const emailVar = input_login_email.value;
    const senhaVar = input_login_senha.value;

    if (emailVar == "" || senhaVar == "") {
        alert('Preencha todos os campos para realizar o login!');
        return false;
    }
    else {
        // setInterval(sumirMensagem, 5000)
    }
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
        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;
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
    const nomeVar = input_cadastro_username.value;
    const emailVar = input_cadastro_email.value;
    const senhaVar = input_cadastro_senha.value;
    const confirmacaoSenhaVar = input_confirmacao_senha.value;

    if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "") {
        alert('Preencha todos os campos para realizar o cadastro!');
        return false;
    } else if (confirmacaoSenhaVar != senhaVar) {
        alert('Os campos Senha e Confirmação de Senha devem ser iguais para realizar o cadastro!')
        return false;
    } else {
        //   setInterval(sumirMensagem, 5000);
    }

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
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