document.getElementById("form-login").addEventListener("submit", function (event) {
    event.preventDefault();

    const mensagemErro = document.getElementById("mensagem-erro");

    mensagemErro.textContent = "Login ou senha incorretos. Usuário não encontrado.";
});

