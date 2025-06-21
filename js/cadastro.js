document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cadastro');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (nome && email && senha) {
      const usuario = { nome, email };
      localStorage.setItem('usuario', JSON.stringify(usuario));
      window.location.href = 'perfil.html';
    } else {
      alert("Preencha todos os campos");
    }
  });
});



