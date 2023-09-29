const personagem = document.getElementById('personagem');
let pxPersonagem = document.getElementById('spritePersonagem');
let posicaoHorizontal = 0;
let posicaoVertical = 0;
const step = 10;

function updatePersonagemPosition() {
    personagem.style.left = posicaoHorizontal + 'px';
    personagem.style.top = posicaoVertical + 'px';
  }
  
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        posicaoVertical -= step;
        break;
      case 'ArrowDown':
        posicaoVertical += step;
        break;
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
