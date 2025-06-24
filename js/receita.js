document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("Receita não encontrada.");
    window.location.href = "perfil.html";
    return;
  }

  const receitas = JSON.parse(localStorage.getItem("receitas")) || [];
  const receita = receitas.find(r => r.id == id);

  if (!receita) {
    alert("Receita não encontrada.");
    window.location.href = "perfil.html";
    return;
  }

  // Preenche campos da receita
  document.getElementById("nome-receita").textContent = receita.nome;
  document.getElementById("autor-receita").textContent = receita.autor;
  document.getElementById("tempo-preparo").textContent = receita.tempoPreparo;
  document.getElementById("sobre-receita").textContent = receita.sobre;
  document.getElementById("dica-chef").textContent = receita.dica;

  const ul = document.getElementById("ingredientes");
  ul.innerHTML = receita.ingredientes.map(i => `<li>${i}</li>`).join("");

  const ol = document.getElementById("modo-preparo");
  ol.innerHTML = receita.preparo.map(p => `<li>${p}</li>`).join("");

  const imagem = document.getElementById("imagem-receita");
  const imagemValida = receita.imagens.find(img => img.trim() !== "");

  if (imagemValida) {
    imagem.src = imagemValida;
  } else {
    imagem.style.display = "none";
  }

  // Busca a imagem do autor dinamicamente do localStorage de usuários
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioAutor = usuarios.find(u => u.email === receita.emailAutor);

  const imgAutor = document.querySelector(".detalhes-receita a img");

  if (usuarioAutor && usuarioAutor.fotoPerfil) {
    imgAutor.src = usuarioAutor.fotoPerfil;
  } else if (imgAutor) {
    imgAutor.src = "../assets/icon-perfil.svg"; // Foto padrão caso não tenha imagem
  }
});
