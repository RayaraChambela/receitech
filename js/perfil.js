document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuario')) || {};

  const btnExcluir = document.getElementById('btn-excluir-conta');
  if (btnExcluir) {
    btnExcluir.addEventListener('click', () => {
      const confirmacao = confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.");
      if (confirmacao) {

        let receitas = JSON.parse(localStorage.getItem('receitas')) || [];
        receitas = receitas.map(receita => {
          if (receita.emailAutor === usuario.email) {
            receita.autor = 'Anônimo';
            receita.emailAutor = '';
          }
          return receita;
        });
        localStorage.setItem('receitas', JSON.stringify(receitas));

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios = usuarios.filter(u => u.email !== usuario.email);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

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

    const navbarIcon = document.querySelector('.user-icon img');
    if (navbarIcon) navbarIcon.src = usuario.fotoPerfil;
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
      const emailOriginal = usuario.email;

      usuario.nome = novoNome;
      usuario.email = novoEmail;
      usuario.senha = novaSenha;

      localStorage.setItem('usuario', JSON.stringify(usuario));

      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      usuarios = usuarios.map(u => {
        if (u.email === emailOriginal) {
          return { ...usuario };
        }
        return u;
      });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      const nomeUsuario = document.getElementById('nome-usuario');
      const emailUsuario = document.getElementById('email-usuario');

      if (nomeUsuario) nomeUsuario.textContent = novoNome;
      if (emailUsuario) emailUsuario.textContent = novoEmail;

      fecharPopupEditarPerfil();
      alert("Informações atualizadas com sucesso!");
    } else {
      alert("Preencha todos os campos!");
    }
  });

  // ---------- FOTO DE PERFIL / PRÉ-VISUALIZAÇÃO ----------
  const fileInput = document.getElementById('imagem');
  const previewFoto = document.getElementById('preview-foto');
  let arquivoSelecionado = null;

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];

      if (!file) {
        // Se cancelou a escolha, volta pra foto atual ou placeholder
        if (previewFoto) {
          previewFoto.src = usuario.fotoPerfil || '../assets/icon-img-perfil.png';
        }
        arquivoSelecionado = null;
        return;
      }

      arquivoSelecionado = file;

      const reader = new FileReader();
      reader.onload = function(ev) {
        if (previewFoto) {
          previewFoto.src = ev.target.result; // só pré-visualização, ainda não salva
        }
      };
      reader.readAsDataURL(file);
    });
  }

  document.getElementById('salvar').addEventListener('click', () => {
    const file = arquivoSelecionado || (fileInput ? fileInput.files[0] : null);

    if (file) {
      const reader = new FileReader();

      reader.onload = function(e) {
        usuario.fotoPerfil = e.target.result;
        localStorage.setItem('usuario', JSON.stringify(usuario));

        // Atualiza no array de usuários
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios = usuarios.map(u => {
          if (u.email === usuario.email) {
            return { ...usuario };
          }
          return u;
        });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        const imgPerfil = document.getElementById('img-perfil');
        if (imgPerfil) imgPerfil.src = usuario.fotoPerfil;

        const navbarIcon = document.querySelector('.user-icon img');
        if (navbarIcon) navbarIcon.src = usuario.fotoPerfil;
      };

      reader.readAsDataURL(file);
    }

    // limpa estado temporário e fecha popup
    arquivoSelecionado = null;
    if (fileInput) fileInput.value = '';
    fecharPopup();
  });

  document.getElementById('remover-foto').addEventListener('click', () => {
    delete usuario.fotoPerfil;
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Atualiza no array de usuários
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.map(u => {
      if (u.email === usuario.email) {
        return { ...usuario };
      }
      return u;
    });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    const imgPerfil = document.getElementById('img-perfil');
    if (imgPerfil) imgPerfil.src = '../assets/icon-img-perfil.png';

    const navbarIcon = document.querySelector('.user-icon img');
    if (navbarIcon) navbarIcon.src = '../assets/icon-img-perfil.png';

    if (previewFoto) previewFoto.src = '../assets/icon-img-perfil.png';
  });

  carregarFeed();
});

function abrirPopup() {
  const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
  const previewFoto = document.getElementById('preview-foto');
  const fileInput = document.getElementById('imagem');

  if (previewFoto) {
    previewFoto.src = usuario.fotoPerfil || '../assets/icon-img-perfil.png';
  }

  if (fileInput) {
    fileInput.value = '';
  }

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

function carregarFeed() {
  const feed = document.querySelector('.feed-receitas');
  feed.innerHTML = '';

  const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
  const receitas = JSON.parse(localStorage.getItem('receitas')) || [];
  let imagensRenderizadas = 0;

  receitas.forEach(receita => {
    if (receita.emailAutor === usuario.email && receita.imagens && receita.imagens.length > 0) {
      const div = document.createElement('div');
      div.classList.add('receita-post');

      const link = document.createElement('a');
      link.href = `receita.html?id=${receita.id}`;

      const img = document.createElement('img');
      img.src = receita.imagens[0];
      img.alt = receita.nome;
      img.classList.add('receita-feed-img');

      link.appendChild(img);
      div.appendChild(link);
      feed.appendChild(div);

      imagensRenderizadas++;
    }
  });

  if (imagensRenderizadas === 0) {
    feed.innerHTML = `<p class="mensagem-vazio">Nenhuma receita publicada ainda.</p>`;
  }
}
