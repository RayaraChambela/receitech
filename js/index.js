document.addEventListener('DOMContentLoaded', () => {
  const receitasSalvas = JSON.parse(localStorage.getItem('receitas')) || [];

  if (receitasSalvas.length > 0) {
    const primeiraReceita = receitasSalvas[0];

    const cards = document.querySelectorAll('.receita-card');
    const ultimoCard = cards[cards.length - 1];

    const imagem = ultimoCard.querySelector('.receita-imagem');
    const titulo = ultimoCard.querySelector('.receita-info h3');
    const tempo = ultimoCard.querySelector('.tempo span');

    imagem.src = primeiraReceita.imagens[0];
    imagem.alt = primeiraReceita.nome;
    titulo.textContent = primeiraReceita.nome;
    tempo.textContent = primeiraReceita.tempoPreparo;

    // Faz o card levar para a receita específica
    ultimoCard.addEventListener('click', () => {
      window.location.href = `receita.html?id=${primeiraReceita.id}`;
    });
  }
});
