document.addEventListener('DOMContentLoaded', () => {
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
});

  function abrirPopup() {
    document.getElementById("popup").style.display = "flex";
  }

  function fecharPopup() {
    document.getElementById("popup").style.display = "none";
  }

  function abrirPopupEditarPerfil() {
    document.getElementById("popup-editar").style.display = "flex"; // corrigido
  }

  function fecharPopupEditarPerfil() {
    document.getElementById("popup-editar").style.display = "none";
  }

  document.getElementById("edit-perfil").addEventListener("click", function(e) {
    e.preventDefault();
    abrirPopupEditarPerfil();
  });









