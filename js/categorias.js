document.addEventListener("DOMContentLoaded", () => {

  // --- Dropdown da navbar ---
  const botoesCategoria = document.querySelectorAll(".dropdown-item");

  botoesCategoria.forEach(botao => {
    botao.addEventListener("click", () => {
      const categoria = botao.textContent.trim();
      window.location.href = `categorias.html?categoria=${encodeURIComponent(categoria)}`;
    });
  });

  // --- Bolinhas de categoria na home ---
  const bolinhasCategoria = document.querySelectorAll(".bolinha-categoria");

  bolinhasCategoria.forEach(bolinha => {
    bolinha.addEventListener("click", () => {
      const categoria = bolinha.dataset.categoria;
      window.location.href = `categorias.html?categoria=${encodeURIComponent(categoria)}`;
    });
  });

  // --- Código da filtragem das receitas na categorias.html ---
  if (window.location.pathname.includes("categorias.html")) {

    const params = new URLSearchParams(window.location.search);
    const categoriaSelecionada = params.get("categoria");

    if (!categoriaSelecionada) {
      alert("Categoria não especificada.");
      window.location.href = "index.html";
      return;
    }

    const receitas = JSON.parse(localStorage.getItem("receitas")) || [];
    const container = document.getElementById("resultado-categoria");
    const tituloCategoria = document.getElementById("titulo-categoria");

    tituloCategoria.textContent = `${categoriaSelecionada}`;

    const receitasFiltradas = receitas.filter(r => r.categoria === categoriaSelecionada);

    if (receitasFiltradas.length === 0) {
      container.innerHTML = `<p>Nenhuma receita encontrada para a categoria "${categoriaSelecionada}".</p>`;
    } else {
      receitasFiltradas.forEach(receita => {
        const card = document.createElement("div");
        card.classList.add("card-receita");

        const imagem = (receita.imagens && receita.imagens.length > 0) ? receita.imagens[0] : "imagens/padrao.jpg";

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
