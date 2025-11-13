// Quando o usuário pressionar Enter no campo de busca, redireciona para pesquisa.html
document.getElementById('campo-pesquisa').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const termo = this.value.trim();
    if (termo) {
      window.location.href = `pesquisa.html?termo=${encodeURIComponent(termo)}`;
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (usuario && usuario.fotoPerfil) {
    // tenta achar primeiro na home (.perfil-navbar)
    let navbarIcon = document.querySelector('.perfil-navbar');

    // se for outra página que usa .user-icon img, pega ela
    if (!navbarIcon) {
      navbarIcon = document.querySelector('.user-icon img');
    }

    if (navbarIcon) {
      navbarIcon.src = usuario.fotoPerfil;
    }
  }
});
