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
    const navbarIcon = document.querySelector('.user-icon img');
    if (navbarIcon) {
      navbarIcon.src = usuario.fotoPerfil;
    }
  }
});


