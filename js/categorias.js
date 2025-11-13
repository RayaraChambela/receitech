document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // AVISO DE PRIMEIRO ACESSO (APENAS NA HOME)
  // =========================================
  if (window.location.pathname.includes("index.html")) {
    if (!localStorage.getItem("avisoCadastroExibido")) {
      alert(
        "Olá! É a sua primeira vez por aqui? Clique no seu perfil e faça o cadastro para começar a publicar suas próprias receitas!"
      );
      localStorage.setItem("avisoCadastroExibido", "true");
    }
  }

  // =======================================================
  // PREENCHER O ÚLTIMO CARD DA HOME COM A PRIMEIRA RECEITA
  // =======================================================
  if (window.location.pathname.includes("index.html")) {
    const receitasSalvas = JSON.parse(localStorage.getItem("receitas")) || [];

    if (receitasSalvas.length > 0) {
      const primeiraReceita = receitasSalvas[0];
      const cards = document.querySelectorAll(".receita-card");
      const ultimoCard = cards[cards.length - 1];

      if (ultimoCard) {
        const imagem = ultimoCard.querySelector(".receita-imagem");
        const titulo = ultimoCard.querySelector(".receita-info h3");
        const tempo = ultimoCard.querySelector(".tempo span");

        if (imagem && titulo && tempo) {
          imagem.src = primeiraReceita.imagens?.[0] || "../assets/receita-padrao.jpg";
          imagem.alt = primeiraReceita.nome;
          titulo.textContent = primeiraReceita.nome;
          tempo.textContent = primeiraReceita.tempoPreparo;
        }

        ultimoCard.addEventListener("click", () => {
          window.location.href = `receita.html?id=${primeiraReceita.id}`;
        });
      }
    }
  }

  // =========================================
  // DROPDOWN DA NAVBAR – CATEGORIAS PRINCIPAIS
  // =========================================

  // Itens com submenu
  const botoesCategoriaPrincipais = document.querySelectorAll(
    ".dropdown-item-principal"
  );

  botoesCategoriaPrincipais.forEach((botao) => {
    botao.addEventListener("click", () => {
      const categoria = botao.dataset.categoria;
      if (!categoria) return;

      window.location.href = `categorias.html?categoria=${encodeURIComponent(
        categoria
      )}`;
    });
  });

  // Subcategorias (segundo nível do menu)
  const botoesSubcategoria = document.querySelectorAll(".dropdown-subitem");

  botoesSubcategoria.forEach((botao) => {
    botao.addEventListener("click", (event) => {
      event.stopPropagation(); // evitar conflito com o dropdown

      const categoria = botao.dataset.categoria;
      const subcategoria = botao.dataset.subcategoria;

      if (!categoria) return;

      let url = `categorias.html?categoria=${encodeURIComponent(categoria)}`;
      if (subcategoria) {
        url += `&subcategoria=${encodeURIComponent(subcategoria)}`;
      }

      window.location.href = url;
    });
  });

  // Itens simples (sem submenu) – ex: Notícias, Canais especiais, Todas as receitas
  const botoesCategoriaSimples = document.querySelectorAll(
    ".dropdown-item-simples"
  );

  botoesCategoriaSimples.forEach((botao) => {
    botao.addEventListener("click", () => {
      const categoria = botao.dataset.categoria;
      if (!categoria) return;

      window.location.href = `categorias.html?categoria=${encodeURIComponent(
        categoria
      )}`;
    });
  });

  // =========================================
  // BOLINHAS DE CATEGORIA NA HOME
  // =========================================
  const bolinhasCategoria = document.querySelectorAll(".bolinha-categoria");

  bolinhasCategoria.forEach((bolinha) => {
    bolinha.addEventListener("click", () => {
      const categoria = bolinha.dataset.categoria;
      const subcategoria = bolinha.dataset.subcategoria;

      if (!categoria) return;

      let url = `categorias.html?categoria=${encodeURIComponent(categoria)}`;
      if (subcategoria) {
        url += `&subcategoria=${encodeURIComponent(subcategoria)}`;
      }

      window.location.href = url;
    });
  });

  // =========================================
  // PÁGINA categorias.html – FILTRAR RECEITAS
  // =========================================
if (window.location.pathname.includes("categorias.html")) {
  const params = new URLSearchParams(window.location.search);
  const categoriaSelecionada = params.get("categoria");
  const subcategoriaSelecionada = params.get("subcategoria");

  if (!categoriaSelecionada) {
    alert("Categoria não especificada.");
    window.location.href = "index.html";
    return;
  }

  const receitas = JSON.parse(localStorage.getItem("receitas")) || [];
  const container = document.getElementById("resultado-categoria");
  const tituloCategoria = document.getElementById("titulo-categoria");

  if (subcategoriaSelecionada) {
    tituloCategoria.textContent = `${categoriaSelecionada} > ${subcategoriaSelecionada}`;
  } else {
    tituloCategoria.textContent = categoriaSelecionada;
  }

  let receitasFiltradas;

  if (categoriaSelecionada === "Todas as receitas") {
    // mostra tudo
    receitasFiltradas = receitas;
  } else {
    receitasFiltradas = receitas.filter(
      (r) => r.categoria === categoriaSelecionada
    );

    if (subcategoriaSelecionada) {
      receitasFiltradas = receitasFiltradas.filter(
        (r) => r.subcategoria === subcategoriaSelecionada
      );
    }
  }

  if (receitasFiltradas.length === 0) {
    container.innerHTML = `<p>Nenhuma receita encontrada para a categoria "${categoriaSelecionada}".</p>`;
  } else {
    container.innerHTML = "";

    receitasFiltradas.forEach((receita) => {
      const card = document.createElement("div");
      card.classList.add("card-receita");

      const imagem =
        receita.imagens && receita.imagens.length > 0
          ? receita.imagens[0]
          : "../assets/receita-padrao.jpg";

      card.innerHTML = `
        <img src="${imagem}" alt="${receita.nome}">
        <div class="card-receita-conteudo">
          <h3>${receita.nome}</h3>
          <div class="tempo">
            <img src="../assets/icon-tempo.svg" alt="Tempo">
            <span>${receita.tempoPreparo}</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        window.location.href = `receita.html?id=${receita.id}`;
      });

      container.appendChild(card);
    });
  }
}
});
