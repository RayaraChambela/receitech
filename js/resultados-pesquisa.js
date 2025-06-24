function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function obterParametroBusca() {
  const params = new URLSearchParams(window.location.search);
  return params.get('termo') || '';
}

function exibirResultados(termo) {
  const container = document.getElementById('resultados');
  container.innerHTML = '';

  const receitas = JSON.parse(localStorage.getItem('receitas')) || [];
  const termoNormalizado = normalizarTexto(termo);

  const resultados = receitas.filter(receita => {
    const nomeNormalizado = normalizarTexto(receita.nome);

    if (nomeNormalizado.includes(termoNormalizado)) return true;

    const termoSemS = termoNormalizado.replace(/s$/, '');
    const nomeSemS = nomeNormalizado.replace(/s$/, '');

    return nomeSemS.includes(termoSemS);
  });

  if (resultados.length === 0) {
    container.innerHTML = `<p>Nenhuma receita encontrada para "${termo}".</p>`;
    return;
  }

resultados.forEach(receita => {
  const card = document.createElement('div');
  card.classList.add('card-receita');

  const imagem = receita.imagens.length > 0 ? receita.imagens[0] : '../assets/imagem-padrao.png';

  card.innerHTML = `
    <img src="${imagem}" alt="${receita.nome}">
    <div class="card-receita-conteudo">
      <h3>${receita.nome}</h3>
      <div class="tempo">
        <img src="../assets/icon-tempo.svg" alt="Relógio" style="width: 16px;">
        <span>${receita.tempoPreparo}</span>
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    window.location.href = `receita.html?id=${receita.id}`;
  });

  container.appendChild(card);
});



}

const termo = obterParametroBusca();
document.getElementById('campo-pesquisa').value = termo;
exibirResultados(termo);

document.getElementById('campo-pesquisa').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const novoTermo = this.value.trim();
    if (novoTermo) {
      window.location.href = `pesquisa.html?termo=${encodeURIComponent(novoTermo)}`;
    }
  }
});
