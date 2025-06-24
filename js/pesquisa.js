// Quando o usuário pressionar Enter no campo de busca, redireciona para pesquisa.html
document.getElementById('campo-pesquisa').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const termo = this.value.trim();
    if (termo) {
      window.location.href = `pesquisa.html?termo=${encodeURIComponent(termo)}`;
    }
  }
});

