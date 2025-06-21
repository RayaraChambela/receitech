// Exibir imagem de perfil salva
const imgBase64 = localStorage.getItem('fotoPerfil');
if (imgBase64) {
  document.getElementById('foto-perfil').src = imgBase64;
}

// Trocar imagem de perfil
const inputUpload = document.getElementById('upload-perfil');
inputUpload.addEventListener('change', function () {
  const file = this.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const base64 = e.target.result;
    localStorage.setItem('fotoPerfil', base64);
    document.getElementById('foto-perfil').src = base64;
  };
  if (file) reader.readAsDataURL(file);
});

// Exibir nome e email salvos (mockado por enquanto)
const nome = localStorage.getItem('nomeUsuario') || 'PALMIRINHA';
const email = localStorage.getItem('emailUsuario') || 'palmirinhareceitas@gmail.com';
document.getElementById('nome-usuario').textContent = nome;
document.getElementById('email-usuario').textContent = email;

// Carregar galeria de receitas do usuário (mock)
const receitas = JSON.parse(localStorage.getItem('receitasUsuario') || '[]');
const galeria = document.querySelector('.galeria-receitas');

receitas.forEach(receita => {
  const img = document.createElement('img');
  img.src = receita.imagem; // deve estar em base64
  img.alt = receita.titulo;
  galeria.appendChild(img);
});

// Atualizar contagem de posts
document.getElementById('quantidade-posts').textContent = receitas.length;

