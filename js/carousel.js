const carrossel = document.getElementById('carrossel');
const cards = carrossel.querySelectorAll('.receita-card');
const cardWidth = cards[0].offsetWidth + 32; // Largura + margem (ajuste conforme seu gap)

let currentIndex = 0;

function scrollToCard(index) {
  carrossel.scrollTo({
    left: index * cardWidth,
    behavior: 'smooth'
  });
}

document.getElementById('nextBtn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length; // loop para 0 após o último
  scrollToCard(currentIndex);
});

document.getElementById('prevBtn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length; // loop para o último se for negativo
  scrollToCard(currentIndex);
});


