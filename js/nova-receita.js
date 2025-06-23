let etapaAtual = 1;
let dadosReceita = {
  nome: '',
  categoria: '',
  sobre: '',
  ingredientes: [],
  preparo: [],
  tempoPreparo: '',
  dica: '',
  imagens: []
};

function proximaEtapa() {
  const nome = document.getElementById('nome').value;
  const categoria = document.getElementById('categoria').value;
  const sobre = document.getElementById('sobre').value;

  if (!nome || !categoria || !sobre) {
    alert("Preencha todos os campos!");
    return;
  }

  dadosReceita.nome = nome;
  dadosReceita.categoria = categoria;
  dadosReceita.sobre = sobre;

  mudarEtapa(2);
}

function salvarEtapa2() {
  const inputs = document.querySelectorAll('#lista-ingredientes input');
  dadosReceita.ingredientes = Array.from(inputs).map(inp => inp.value).filter(val => val.trim() !== "");

  if (dadosReceita.ingredientes.length === 0) {
    alert("Adicione pelo menos um ingrediente!");
    return;
  }

  mudarEtapa(3);
}

function salvarEtapa3() {
  const inputs = document.querySelectorAll('#lista-preparo input');
  dadosReceita.preparo = Array.from(inputs).map(inp => inp.value).filter(val => val.trim() !== "");
  dadosReceita.tempoPreparo = document.getElementById('tempo-preparo').value;

  if (dadosReceita.preparo.length === 0 || !dadosReceita.tempoPreparo) {
    alert("Adicione as etapas de preparo e o tempo!");
    return;
  }

  mudarEtapa(4);
}

function salvarEtapa4() {
  dadosReceita.dica = document.getElementById('dica').value;
  mudarEtapa(5);
}

function finalizarReceita() {
  const inputs = document.querySelectorAll('#lista-imagens input');
  dadosReceita.imagens = [];

  for (let inp of inputs) {
    if (inp.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        dadosReceita.imagens.push(e.target.result);
        
        // Quando todas as imagens forem lidas, salva no localStorage
        if (dadosReceita.imagens.length === inputs.length) {
          salvarLocalStorage();
        }
      };
      reader.readAsDataURL(inp.files[0]);
    } else {
      dadosReceita.imagens.push('');
      if (dadosReceita.imagens.length === inputs.length) {
        salvarLocalStorage();
      }
    }
  }
}

function salvarLocalStorage() {
  let receitas = JSON.parse(localStorage.getItem('receitas')) || [];
  receitas.push(dadosReceita);
  localStorage.setItem('receitas', JSON.stringify(receitas));
  window.location.href = "receita.html";
}

function voltarEtapa() {
  if (etapaAtual > 1) {
    mudarEtapa(etapaAtual - 1);
  }
}

function mudarEtapa(novaEtapa) {
  document.getElementById(`etapa-${etapaAtual}`).style.display = 'none';
  document.getElementById(`etapa-${novaEtapa}`).style.display = 'block';
  etapaAtual = novaEtapa;
  atualizarProgresso();
}

function atualizarProgresso() {
  const bolinha = document.querySelector('.bolinha');
  bolinha.style.left = `${(etapaAtual - 1) * 25}%`;
}

function adicionarIngrediente() {
  const lista = document.getElementById('lista-ingredientes');
  const index = lista.querySelectorAll('input').length + 1;
  const input = document.createElement('input');
  input.type = "text";
  input.placeholder = `${index} -`;
  lista.appendChild(input);
}

function adicionarEtapaPreparo() {
  const lista = document.getElementById('lista-preparo');
  const index = lista.querySelectorAll('input').length + 1;
  const input = document.createElement('input');
  input.type = "text";
  input.placeholder = `${index} -`;
  lista.appendChild(input);
}

function adicionarImagem() {
  const lista = document.getElementById('lista-imagens');
  const input = document.createElement('input');
  input.type = "file";
  input.accept = "image/*";
  lista.appendChild(input);
}

function fecharModal() {
  if (confirm("Deseja cancelar a criação da receita?")) {
    window.location.href = "perfil.html";
  }
}
