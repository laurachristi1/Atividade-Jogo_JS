const personagem = document.getElementById('personagem');
let posicaoHorizontal = 100;
let posicaoVertical = 683;
const step = 12;

function updatePersonagemPosition() {
    personagem.style.left = posicaoHorizontal + 'px';
    personagem.style.top = posicaoVertical + 'px';
  }
  
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        posicaoHorizontal -= step;
        break;
      case 'ArrowRight':
        posicaoHorizontal += step;
        break;
        case ' ':
          atirar();
          break;
    }
  
    updatePersonagemPosition();
  });

        //Função de atirar

  function atirar() {
    const tiro = document.createElement('div');
    tiro.classList.add('tiro');
    tiro.id = 'tiro'; 
    document.body.appendChild(tiro);
  
    const personagemRect = personagem.getBoundingClientRect();
    tiro.style.left = (personagemRect.left + personagemRect.width / 2) + 'px';
    tiro.style.top = (personagemRect.top + personagemRect.height / 2) + 'px';
  
    const tiroInterval = setInterval(() => {
      const tiroRect = tiro.getBoundingClientRect();
      if (tiroRect.right < window.innerWidth) {
        tiro.style.left = (parseInt(tiro.style.left) || 0) + 5 + 'px';
      } else {
        clearInterval(tiroInterval);
        document.body.removeChild(tiro);
      }
    }, 10);
  }

       // Função de contagem de vidas

  const vidaCountElement = document.getElementById('vidaCount');

let vidaCount = 3;

function updateVidaCount() {
  vidaCountElement.textContent = vidaCount;
}

function subtrairVida() {
  vidaCount--;
  updateVidaCount();

  if (vidaCount <= 0) {
    alert('Game Over! Vidas esgotadas.');
    resetGame();
  }
}

function resetGame() {
  vidaCount = 3;
  updateLifeCount();
  character.style.left = '0px';
  character.style.top = '0px';
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'Enter':
      subtrairVida();
      break;
  }
});

      // movimentação inimigo

const inimigo = document.getElementById('inimigo');
let inimigoPositionX = window.innerWidth; // Inimigo começa na extremidade direita

function moverInimigo() {
  inimigo.style.left = inimigoPositionX + 'px';
  inimigoPositionX -= 2; // Movimento para a esquerda

  // Reposicionar o inimigo quando ele sair da tela
  if (inimigoPositionX < -95) {
    inimigoPositionX = window.innerWidth;
  }
}
setInterval(moverInimigo, 10);

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      personagem.style.left = (parseInt(personagem.style.left) || 0) - 10 + 'px';
      break;
    case 'ArrowRight':
      personagem.style.left = (parseInt(personagem.style.left) || 0) + 10 + 'px';
      break;
  }

});

// ...
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      personagem.style.left = (parseInt(personagem.style.left) || 0) - 10 + 'px';
      break;
    case 'ArrowRight':
      personagem.style.left = (parseInt(personagem.style.left) || 0) + 10 + 'px';
      break;
    case ' ':
      atirar();
      break;
  }

  // Verifique se o tiro atingiu o inimigo
  const tiroRect = document.getElementById('tiro').getBoundingClientRect();
  const inimigoRect = inimigo.getBoundingClientRect();

  if (
    tiroRect.left < inimigoRect.right &&
    tiroRect.right > inimigoRect.left &&
    tiroRect.top < inimigoRect.bottom &&
    tiroRect.bottom > inimigoRect.top
  ) {
    // Tiro atingiu o inimigo
    eliminarInimigo();
  }
});

    // Função para eliminar o inimigo
function eliminarInimigo() {
  inimigoPositionX = window.innerWidth;

    // Remove o inimigo da tela
  inimigo.style.display = 'none';

    //remove o inimigo da tela
  const tiro = document.getElementById('tiro');
  if (tiro) {
    document.body.removeChild(tiro);
}
}



  