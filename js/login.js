document.getElementById("form-login").addEventListener("submit", function (event) {
event.preventDefault();

const login = document.getElementById("login").value.trim();
const senha = document.getElementById("senha").value.trim();
const mensagemErro = document.getElementById("mensagem-erro");


const usuarioCorreto = "admin";
const senhaCorreta = "123456";

if (login === usuarioCorreto && senha === senhaCorreta) {
    mensagemErro.textContent = "";
    alert("Login realizado com sucesso!");
    
    window.location.href = "dashboard.html";
} else {
    mensagemErro.textContent = "Login ou senha incorretos.";
}
});

