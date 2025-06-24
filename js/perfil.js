document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuario')) || {};

  const btnExcluir = document.getElementById('btn-excluir-conta');
  if (btnExcluir) {
    btnExcluir.addEventListener('click', () => {
      const confirmacao = confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.");
      if (confirmacao) {
        const usuarioLogado = localStorage.getItem('usuario');
        if (usuarioLogado) {
          const { email } = JSON.parse(usuarioLogado);
          let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
          usuarios = usuarios.filter(u => u.email !== email);
          localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }

        localStorage.removeItem('usuario');
        localStorage.removeItem('usuarioLogado');
        alert("Sua conta foi excluída com sucesso.");
        window.location.href = 'index.html';
      }
    });
  }

  const nomeUsuario = document.getElementById('nome-usuario');
  const emailUsuario = document.getElementById('email-usuario');

  if (usuario) {
    if (nomeUsuario && usuario.nome) nomeUsuario.textContent = usuario.nome;
    if (emailUsuario && usuario.email) emailUsuario.textContent = usuario.email;
  }

  if (usuario && usuario.fotoPerfil) {
    const imgPerfil = document.getElementById('img-perfil');
    if (imgPerfil) imgPerfil.src = usuario.fotoPerfil;
  }

  const btnNovoPost = document.getElementById('btn-novo-post');
  if (btnNovoPost) {
    btnNovoPost.addEventListener('click', () => {
      window.location.href = 'nova-receita.html';
    });
  }

  document.getElementById("edit-perfil").addEventListener("click", function(e) {
    e.preventDefault();
    abrirPopupEditarPerfil();

    document.getElementById('nome').value = usuario.nome || '';
    document.getElementById('email').value = usuario.email || '';
    document.getElementById('senha').value = usuario.senha || '';
  });

  document.querySelector('.btn-salvar').addEventListener('click', function(e) {
    e.preventDefault();

    const novoNome = document.getElementById('nome').value;
    const novoEmail = document.getElementById('email').value;
    const novaSenha = document.getElementById('senha').value;

    if (novoNome && novoEmail && novaSenha) {
      usuario.nome = novoNome;
      usuario.email = novoEmail;
      usuario.senha = novaSenha;

      localStorage.setItem('usuario', JSON.stringify(usuario));

      if (nomeUsuario) nomeUsuario.textContent = novoNome;
      if (emailUsuario) emailUsuario.textContent = novoEmail;

      fecharPopupEditarPerfil();
      alert("Informações atualizadas com sucesso!");
    } else {
      alert("Preencha todos os campos!");
    }
  });

  document.getElementById('salvar').addEventListener('click', () => {
    const fileInput = document.getElementById('imagem');
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function(e) {
        usuario.fotoPerfil = e.target.result;
        localStorage.setItem('usuario', JSON.stringify(usuario));

        const imgPerfil = document.getElementById('img-perfil');
        if (imgPerfil) imgPerfil.src = usuario.fotoPerfil;
      };

      reader.readAsDataURL(file);
    }

    fecharPopup();
  });

  document.getElementById('remover-foto').addEventListener('click', () => {
    delete usuario.fotoPerfil;
    localStorage.setItem('usuario', JSON.stringify(usuario));

    const imgPerfil = document.getElementById('img-perfil');
    if (imgPerfil) imgPerfil.src = '../assets/icon-img-perfil.png';

    const navbarIcon = document.querySelector('.user-icon img');
    if (navbarIcon) navbarIcon.src = '../assets/icon-img-perfil.png';
  });
});

function abrirPopup() {
  document.getElementById("popup").style.display = "flex";
}

function fecharPopup() {
  document.getElementById("popup").style.display = "none";
}

function abrirPopupEditarPerfil() {
  document.getElementById("popup-editar").style.display = "flex";
}

function fecharPopupEditarPerfil() {
  document.getElementById("popup-editar").style.display = "none";
}













