document.addEventListener('DOMContentLoaded', () => {
  let etapaAtual = 0;
  const etapas = document.querySelectorAll('.etapa');
  const btnProximo = document.getElementById('btn-proximo');
  const btnVoltar = document.getElementById('btn-voltar');

  const dadosReceita = JSON.parse(localStorage.getItem('rascunhoReceita')) || {};

  function mostrarEtapa(index) {
    etapas.forEach((el, i) => {
      el.style.display = i === index ? 'block' : 'none';
    });
  }

  function salvarEtapa() {
    if (etapaAtual === 0) {
      dadosReceita.nome = document.getElementById('input-nome').value;
      dadosReceita.categoria = document.getElementById('select-categoria').value;
      dadosReceita.sobre = document.getElementById('textarea-sobre').value;
    }

    if (etapaAtual === 1) {
      const ingredientes = Array.from(document.querySelectorAll('.input-ingrediente'))
        .map(input => input.value).filter(v => v);
      dadosReceita.ingredientes = ingredientes;
    }

    if (etapaAtual === 2) {
      const etapasPreparo = Array.from(document.querySelectorAll('.input-etapa-preparo'))
        .map(input => input.value).filter(v => v);
      dadosReceita.preparo = etapasPreparo;
      dadosReceita.tempo = document.getElementById('input-tempo').value;
    }

    if (etapaAtual === 3) {
      dadosReceita.dica = document.getElementById('textarea-dica').value;
    }

    localStorage.setItem('rascunhoReceita', JSON.stringify(dadosReceita));
  }

  btnProximo.addEventListener('click', () => {
    salvarEtapa();
    if (etapaAtual < etapas.length - 1) {
      etapaAtual++;
      mostrarEtapa(etapaAtual);
    } else {
      // Finalizar e salvar no armazenamento geral
      const receitas = JSON.parse(localStorage.getItem('receitas')) || [];
      receitas.push(dadosReceita);
      localStorage.setItem('receitas', JSON.stringify(receitas));
      localStorage.removeItem('rascunhoReceita');
      window.location.href = 'perfil.html'; // Redirecionar após cadastro
    }
  });

  btnVoltar.addEventListener('click', () => {
    if (etapaAtual > 0) {
      etapaAtual--;
      mostrarEtapa(etapaAtual);
    }
  });

  mostrarEtapa(etapaAtual);
});
