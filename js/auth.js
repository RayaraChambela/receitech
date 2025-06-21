document.addEventListener('DOMContentLoaded', () => {
  const userLink = document.getElementById('user-link');
  if (!userLink) return;

  userLink.addEventListener('click', function (e) {
    e.preventDefault();

    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      window.location.href = 'perfil.html';
    } else {
      window.location.href = 'cadastro.html';
    }
  });
});

