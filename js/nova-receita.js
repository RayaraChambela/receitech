let etapaAtual = 1;

// IMPORTANTE: estes nomes PRECISAM bater com o dropdown (data-subcategoria)
const mapaCategorias = {
  "Bolos e tortas": [
    "Bolos simples",
    "Bolos recheados",
    "Tortas doces",
    "Tortas salgadas"
  ],
  "Carnes": [
    "Bovina",
    "Suína",
    "Carne moída",
    "Churrasco"
  ],
  "Aves": [
    "Frango",
    "Peru",
    "Frango desfiado"
  ],
  "Peixes e frutos do mar": [
    "Peixes",
    "Camarão",
    "Frutos do mar variados"
  ],
  "Saladas e molhos": [
    "Saladas frias",
    "Saladas quentes",
    "Molhos para salada"
  ],
  "Sopas": [
    "Sopas leves",
    "Caldos"
  ],
  "Massas": [
    "Macarrão",
    "Lasanha",
    "Nhoque"
  ],
  "Bebidas": [
    "Sucos",
    "Drinks",
    "Sem álcool"
  ],
  "Lanches": [
    "Sanduíches",
    "Hambúrguer",
    "Salgados assados"
  ],
  "Doces e sobremesas": [
    "Pudins",
    "Mousses",
    "Gelatinas",
    "Brigadeiro"
  ],
  "Alimentação saudável": [
    "Low carb",
    "Vegetariano",
    "Vegano",
    "Fit"
  ]
};

let dadosReceita = {
  id: '',
  nome: '',
  categoria: '',
  subcategoria: '',
  sobre: '',
  ingredientes: [],
  preparo: [],
  tempoPreparo: '',
  dica: '',
  imagens: [],
  autor: '',
  emailAutor: ''
};

document.addEventListener('DOMContentLoaded', () => {
  const selectCategoria = document.getElementById('categoria');
  if (selectCategoria) {
    selectCategoria.addEventListener('change', () => {
      preencherSubcategorias(selectCategoria.value);
    });
  }
});

function preencherSubcategorias(categoriaSelecionada) {
  const selectSub = document.getElementById('subcategoria');
  selectSub.innerHTML = '';

  if (!categoriaSelecionada || !mapaCategorias[categoriaSelecionada]) {
    selectSub.disabled = true;
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'Selecione a categoria primeiro';
    selectSub.appendChild(opt);
    return;
  }

  selectSub.disabled = false;

  const optPadrao = document.createElement('option');
  optPadrao.value = '';
  optPadrao.textContent = 'Selecione';
  selectSub.appendChild(optPadrao);

  mapaCategorias[categoriaSelecionada].forEach(sub => {
    const opt = document.createElement('option');
    opt.value = sub;
    opt.textContent = sub;
    selectSub.appendChild(opt);
  });
}

function proximaEtapa() {
  const nome = document.getElementById('nome').value;
  const categoria = document.getElementById('categoria').value;
  const subcategoria = document.getElementById('subcategoria').value;
  const sobre = document.getElementById('sobre').value;

  if (!nome || !categoria || !subcategoria || !sobre) {
    alert("Preencha todos os campos!");
    return;
  }

  dadosReceita.nome = nome;
  dadosReceita.categoria = categoria;
  dadosReceita.subcategoria = subcategoria;
  dadosReceita.sobre = sobre;

  mudarEtapa(2);
}

function salvarEtapa2() {
  const inputs = document.querySelectorAll('#lista-ingredientes input');
  dadosReceita.ingredientes = Array.from(inputs)
    .map(inp => inp.value)
    .filter(val => val.trim() !== "");

  if (dadosReceita.ingredientes.length === 0) {
    alert("Adicione pelo menos um ingrediente!");
    return;
  }

  mudarEtapa(3);
}

function salvarEtapa3() {
  const inputs = document.querySelectorAll('#lista-preparo input');
  dadosReceita.preparo = Array.from(inputs)
    .map(inp => inp.value)
    .filter(val => val.trim() !== "");
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
  const input = document.querySelector('#lista-imagens input');
  
  if (!input.files[0]) {
    alert("Adicione uma imagem!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    dadosReceita.imagens.push(e.target.result);
    salvarLocalStorage();
  };
  reader.readAsDataURL(input.files[0]);
}

function salvarLocalStorage() {
  const usuario = JSON.parse(localStorage.getItem('usuario')) || {};

  if (!usuario.email) {
    alert("Usuário não encontrado. Faça login novamente.");
    window.location.href = "index.html";
    return;
  }

  let receitas = JSON.parse(localStorage.getItem('receitas')) || [];

  dadosReceita.id = Date.now();
  dadosReceita.autor = usuario.nome || 'Anônimo';
  dadosReceita.emailAutor = usuario.email;

  receitas.push(dadosReceita);
  localStorage.setItem('receitas', JSON.stringify(receitas));

  window.location.href = `receita.html?id=${dadosReceita.id}`;
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

function fecharModal() {
  if (confirm("Deseja cancelar a criação da receita?")) {
    window.location.href = "perfil.html";
  }
}
