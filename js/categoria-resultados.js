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
        card.classList.add('card-receita');

        card.innerHTML = `
            <img src="${receita.imagem}" alt="${receita.nome}">
            <div class="card-receita-conteudo">
                <h3>${receita.nome}</h3>
                <div class="tempo">
                    <img src="../assets/icone-relogio.svg" alt="Relógio">
                    <span>${receita.tempoPreparo}</span>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            localStorage.setItem('receitaSelecionada', JSON.stringify(receita));
            window.location.href = 'detalhe-receita.html';
        });

        container.appendChild(card);
    });
});
