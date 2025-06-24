document.addEventListener('DOMContentLoaded', () => {

    // Dropdown da navbar
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const categoria = item.textContent.trim();
            localStorage.setItem('categoriaSelecionada', categoria);
            window.location.href = 'categorias.html';
        });
    });

    // Bolinhas da homepage
    document.querySelectorAll('.bolinha-categoria').forEach(bolinha => {
        bolinha.addEventListener('click', () => {
            const categoria = bolinha.getAttribute('data-categoria');
            localStorage.setItem('categoriaSelecionada', categoria);
            window.location.href = 'categorias.html';
        });
    });
});

