// FUNÇÕES DA API
function login() {
    const emailVar = input_login_email.value;
    const senhaVar = input_login_senha.value;

    if (emailVar == "" || senhaVar == "") {
        div_erro_login.innerHTML = `
        Preencha todos os campos para realizar o login!`
        return false;
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
                console.log('Usuario:', json);
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;
                sessionStorage.DINHEIRO_USUARIO = json.dinheiro;
                obterTimeUsuario()
                fecharlogin()
                if (sessionStorage.ID_USUARIO == 1) {
                    exibirGerador()
                }
            });

        } else {

            div_erro_login.innerHTML = `
            As credenciais estão incorretas, tente novamente!`

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
        div_erro_cadastro.innerHTML = `Preencha todos os campos para realizar o cadastro!`
        return false;
    } else if (senhaVar.length < 5) {
        div_erro_cadastro.innerHTML = `Sua Senha deve ter mais de 5 caracteres para realizar o cadastro!`
        return false;
    }
    else if (confirmacaoSenhaVar != senhaVar) {
        div_erro_cadastro.innerHTML = `Os campos Senha e Confirmação de Senha devem ser iguais para realizar o cadastro!`
        return false;
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
                div_erro_cadastro.innerHTML = `<span style="color: #007A33;">Cadastro realizado com sucesso!</span>`
                setTimeout(mostrarLogin, 600)
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
    span_login.style.color = '#ffffff'
    span_cadastro.style.fontSize = '2vw'
    span_cadastro.style.color = '#646464'
    document.title = 'Login - Dream Team'
}

function mostrarCadastro() {
    main_time.classList.add('blur')
    container_login.classList.add('oculto')
    container_cadastro.classList.remove('oculto')
    span_login.style.fontSize = '2vw'
    span_login.style.color = '#646464'
    span_cadastro.style.fontSize = '2.3vw'
    span_cadastro.style.color = '#ffffff'
    document.title = 'Cadastro - Dream Team'
}

function fecharlogin() {
    main_time.classList.remove('blur')
    container_mensagens.classList.remove('oculto')
    container_login_cadastro.style.display = 'none'
    document.title = 'Dream Team - Monte seu time'
    avisoLogin()
}