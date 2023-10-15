const personagem = document.querySelector('.personagem');
const tiros = [];
const inimigos = [];

let posicaoHorizontal = 100;
const step = 12;

function criarInimigo() {
  const inimigo = document.createElement('img');
  inimigo.classList.add('inimigo');
  inimigo.src = './img/img_vilao/inimigo.gif';
  document.body.appendChild(inimigo);
  inimigos.push(inimigo);

  // Distribua os inimigos uniformemente na parte direita da tela
  const numInimigos = inimigos.length;
  const alturaInimigo = 100; // Altura do inimigo
  const espacoVertical = window.innerHeight / (numInimigos + 1);
  const posicaoVertical = espacoVertical * (numInimigos + 1) - alturaInimigo;

  inimigo.style.left = window.innerWidth + 'px';
  inimigo.style.top = posicaoVertical + 'px';

  const inimigoInterval = setInterval(() => {
    if (inimigo.offsetLeft > -50) {
      inimigo.style.left = (inimigo.offsetLeft - 2) + 'px';

      for (let i = tiros.length - 1; i >= 0; i--) {
        const tiro = tiros[i];
        const tiroRect = tiro.getBoundingClientRect();
        const inimigoRect = inimigo.getBoundingClientRect();

        if (
          tiros.length > 0 && // Verifica se há pelo menos um tiro
          tiroRect.left < inimigoRect.right &&
          tiroRect.right > inimigoRect.left &&
          tiroRect.top < inimigoRect.bottom &&
          tiroRect.bottom > inimigoRect.top
        ) {
          eliminarInimigo(inimigo);
          tiros.splice(i, 1);
        }
      }
    } else {
      clearInterval(inimigoInterval);
      document.body.removeChild(inimigo);
      inimigos.splice(inimigos.indexOf(inimigo), 1);
    }
  }, 10);
}

// Função para criar inimigos com intervalo
function criarInimigoComIntervalo() {
  criarInimigo();
  if (inimigos.length < 4) {
    setTimeout(criarInimigoComIntervalo, 2000); // Crie um novo inimigo a cada 2 segundos
  }
}

// Chame a função para iniciar a criação de inimigos com intervalo
criarInimigoComIntervalo();

function eliminarInimigo(inimigo) {
  inimigos.splice(inimigos.indexOf(inimigo), 1);
  inimigo.style.display = 'none';
}

function atirar() {
  const tiro = document.createElement('div');
  tiro.classList.add('tiro');
  document.body.appendChild(tiro);

  // Ajuste a posição do tiro para sair da arma do personagem
  tiro.style.left = (personagem.offsetLeft + personagem.offsetWidth) + 'px';
  tiro.style.top = (personagem.offsetTop + personagem.offsetHeight / 2) + 'px';
  tiros.push(tiro);

  const tiroInterval = setInterval(() => {
    if (tiro.offsetLeft < window.innerWidth) {
      tiro.style.left = (tiro.offsetLeft + 5) + 'px';
    } else {
      clearInterval(tiroInterval);
      document.body.removeChild(tiro);
    }
  }, 10);
}

function movimentarPersonagem(event) {
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
  personagem.style.left = posicaoHorizontal + 'px';
}

// Função para verificar colisão entre dois elementos
function colide(elemA, elemB) {
  const a = elemA.getBoundingClientRect();
  const b = elemB.getBoundingClientRect();
  return (
    a.left < b.right &&
    a.right > b.left &&
    a.top < b.bottom &&
    a.bottom > b.top
  );
}

document.addEventListener('keydown', movimentarPersonagem);

function avancarParaProximoNivel() {
  if (inimigosMortos >= 4) {
    alert('Você avançou para o próximo nível!'); // Mensagem de avanço de nível
    inimigosMortos = 0; // Redefina o contador de inimigos mortos
    for (let i = 0; i < 4; i++) {
      criarInimigo(); // Crie mais inimigos para o próximo nível
    }
  }
}