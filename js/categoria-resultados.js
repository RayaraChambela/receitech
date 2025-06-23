document.addEventListener('DOMContentLoaded', () => {
    const categoriaSelecionada = localStorage.getItem('categoriaSelecionada');
    const titulo = document.getElementById('titulo-categoria');
    const container = document.getElementById('resultado-categoria');

    titulo.textContent = `Receitas de ${categoriaSelecionada}`;

    const receitas = JSON.parse(localStorage.getItem('receitas')) || [];

    const filtradas = receitas.filter(r => r.categoria.toLowerCase() === categoriaSelecionada.toLowerCase());

    if (filtradas.length === 0) {
        container.innerHTML = `<p>Nenhuma receita encontrada para "${categoriaSelecionada}".</p>`;
        return;
    }

    filtradas.forEach(receita => {
        const card = document.createElement('div');
        card.classList.add('receita-card');

        card.innerHTML = `
            <img src="${receita.imagem}" alt="${receita.nome}" class="receita-imagem" />
            <div class="receita-info">
                <h3>${receita.nome}</h3>
                <div class="tempo">
                    <img src="../assets/icone-relogio.svg" alt="Relógio" />
                    <span>${receita.tempoPreparo}</span>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
});
