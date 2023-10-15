
const personagem = document.querySelector('.personagem'); // Procurando o elemento do personagem na tela
const tiros = []; // Lista para rastrear os tiros disparados
const inimigos = [];// Lista para rastrear os inimigos do jogo
let posicaoHorizontal = 100;// Definindo a posição inicial do personagem na tela
const step = 12;// Tamanho do "passo" que o personagem dá ao se mover


function criarInimigo() {// Função para criar um novo inimigo
  const inimigo = document.createElement('img'); // Crie um elemento de imagem para representar o inimigo
  inimigo.classList.add('inimigo'); // Adicione a classe 'inimigo' para estilizar o inimigo
  inimigo.src = './img/img_vilao/inimigo.gif'; // Defina a imagem do inimigo
  document.body.appendChild(inimigo); // Adiciona o inimigo ao corpo da página
  inimigos.push(inimigo); //Adiciona o inimigo à lista de inimigos


  // Distribua os inimigos uniformemente na parte direita da tela
  const numInimigos = inimigos.length; //conta quantos inimigos estão na tela
  const alturaInimigo = 100; // Altura do inimigo
  const espacoVertical = window.innerHeight / (numInimigos + 1); // dividindo a altura da janela pela quantidade de inimigos mais um. cria espaço entre eles
  const posicaoVertical = espacoVertical * (numInimigos + 1) - alturaInimigo; //calculando a posição vertical para o próximo inimigo. evita que eles fiquem sobrepostos e garante que estejam bem espaçados na tela.

  inimigo.style.left = window.innerWidth + 'px'; //definindo a posição horizontal do inimigo na borda direita da tela
  inimigo.style.top = posicaoVertical + 'px'; // definindo a posição vertical do inimigo, baseada no cálculo que fizemos anteriormente. posiciona o inimigo na altura certa na tela.

  const inimigoInterval = setInterval(() => {
    if (inimigo.offsetLeft > -50) { // Verifica se o inimigo ainda está na tela
      inimigo.style.left = (inimigo.offsetLeft - 2) + 'px'; // Move o inimigo para a esquerda

      // Loop que verifica cada tiro
      for (let i = tiros.length - 1; i >= 0; i--) {
          // Pegamos uma bala da lista de tiros
        const tiro = tiros[i];
        const tiroRect = tiro.getBoundingClientRect(); // Obtém o retângulo delimitador do tiro
        const inimigoRect = inimigo.getBoundingClientRect(); // Obtém o retângulo delimitador do inimigo

        if (
          tiros.length > 0 && // Verifica se há pelo menos um tiro na tela
          tiroRect.left < inimigoRect.right && // Verifica a colisão na esquerda
          tiroRect.right > inimigoRect.left && // Verifica a colisão na direita
          tiroRect.top < inimigoRect.bottom && // Verifica a colisão no topo
          tiroRect.bottom > inimigoRect.top // Verifica a colisão na parte inferior
        ) {
          eliminarInimigo(inimigo); // Remove o inimigo do jogo
          tiros.splice(i, 1); // Remove o tiro do jogo
        }
      }
    } else {
      clearInterval(inimigoInterval); // Interrompe o intervalo de movimento do inimigo
      document.body.removeChild(inimigo); // Remove o inimigo do corpo do documento
      inimigos.splice(inimigos.indexOf(inimigo), 1); // Remove o inimigo da lista de inimigos
    }
  }, 10); // Executa a função a cada 10 milissegundos
}

// Função para criar inimigos com intervalo
function criarInimigoComIntervalo() {
  criarInimigo(); // Chama a função criarInimigo para criar um inimigo
  if (inimigos.length < 4) {
    setTimeout(criarInimigoComIntervalo, 2000); // Cria um novo inimigo a cada 2 segundos
  }
}

criarInimigoComIntervalo();// Chame a função para iniciar a criação de inimigos com intervalo


// Função para remover um inimigo do jogo
function eliminarInimigo(inimigo) {
  inimigos.splice(inimigos.indexOf(inimigo), 1); // Remove o inimigo da lista de inimigos
  inimigo.style.display = 'none'; // Oculta o inimigo
}

function atirar() {
  const tiro = document.createElement('div'); // Cria um elemento <div> que representará um tiro
  tiro.classList.add('tiro'); // Adiciona a classe 'tiro' ao elemento, que será estilizada como um tiro
  document.body.appendChild(tiro); // Adiciona o elemento do tiro ao corpo do documento HTML

 // Define a posição do tiro para sair da arma do personagem
 tiro.style.left = (personagem.offsetLeft + personagem.offsetWidth) + 'px'; // Posição horizontal
 tiro.style.top = (personagem.offsetTop + personagem.offsetHeight / 2) + 'px'; // Posição vertical no meio
 tiros.push(tiro); // Adiciona o tiro à lista de tiros


// Define um intervalo para mover o tiro para a direita
const tiroInterval = setInterval(() => {
  if (tiro.offsetLeft < window.innerWidth) {
    tiro.style.left = (tiro.offsetLeft + 5) + 'px'; // Move o tiro para a direita
  } else {
    clearInterval(tiroInterval); // Remove o intervalo quando o tiro sai da tela
    document.body.removeChild(tiro); // Remove o elemento do tiro da tela
  }
}, 10);
}

// Função para mover o personagem e atirar em resposta aos eventos de teclado
function movimentarPersonagem(event) {
  switch (event.key) {
    case 'ArrowLeft':
      posicaoHorizontal -= step; // Move o personagem para a esquerda
      break;
    case 'ArrowRight':
      posicaoHorizontal += step; // Move o personagem para a direita
      break;
    case ' ':
      atirar(); // Chama a função para disparar um tiro
      break;
  }
  personagem.style.left = posicaoHorizontal + 'px'; // Atualiza a posição horizontal do personagem na tela
}

// Função para verificar colisão entre dois elementos
function colide(elemA, elemB) {
  const a = elemA.getBoundingClientRect(); // Obtém as informações de posição do elemento A
  const b = elemB.getBoundingClientRect(); // Obtém as informações de posição do elemento B

  // Verifica se os limites do elemento A se sobrepõem aos limites do elemento B
  // Se a esquerda de A for menor que a direita de B, e vice-versa, e o topo de A for menor que o fundo de B, e vice-versa, há colisão.
  return (
    a.left < b.right &&  // Verifica se a borda esquerda de A está à esquerda da borda direita de B
    a.right > b.left &&  // Verifica se a borda direita de A está à direita da borda esquerda de B
    a.top < b.bottom &&  // Verifica se a borda superior de A está acima da borda inferior de B
    a.bottom > b.top    // Verifica se a borda inferior de A está abaixo da borda superior de B
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