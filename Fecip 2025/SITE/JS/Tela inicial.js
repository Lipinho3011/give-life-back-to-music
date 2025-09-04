// Mostra uma imagem específica no container .informacoes ao passar o mouse sobre cada .blocomusica
document.addEventListener('DOMContentLoaded', function() {
  const blocos = document.querySelectorAll('.blocomusica');
  const informacoes = document.querySelector('.informacoes');
  if (!blocos.length || !informacoes) return;


  function mostrarImagem(imagemUrl) {
    informacoes.style.backgroundImage = `url('${imagemUrl}')`;
    informacoes.style.backgroundSize = 'cover';
    informacoes.style.backgroundPosition = 'center';
    informacoes.style.backgroundRepeat = 'no-repeat';
  }

  function limparImagem() {
    informacoes.style.backgroundImage = '';
  }

  blocos.forEach(bloco => {
    bloco.addEventListener('mouseover', function() {
      const imagem = bloco.getAttribute('data-imagem-informacoes');
      if (imagem) {
        mostrarImagem(imagem);
      }
    });
    bloco.addEventListener('mouseout', limparImagem);
  });
});
// Selecione todos os blocos de música e o container de informações
const blocos = document.querySelectorAll('.blocomusica');
const informacoes = document.querySelector('.informacoes');

// Função para trocar a imagem
function mostrarImagem(imagemUrl) {
  informacoes.innerHTML = `<img src="${imagemUrl}" alt="Imagem da música" style="width:100%;height:auto;">`;
}

// Função para limpar a imagem
function limparImagem() {
  informacoes.innerHTML = '';
}

// Adicione o evento para cada bloco
blocos.forEach(bloco => {
  bloco.addEventListener('mouseover', function() {
    // Defina a URL da imagem que você quer mostrar para cada bloco
    // Exemplo: pode usar um atributo data-imagem em cada bloco
    const imagem = bloco.getAttribute('data-imagem');
    mostrarImagem(imagem);
  });
  bloco.addEventListener('mouseout', limparImagem);
});