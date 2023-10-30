
//Efeitos Sonoros do Jogo
const backgroundAudio = new Audio('../msc/backgroundAudio.mp3');
const shootAudio = new Audio ('../msc/shot.mp3');

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'Enter':
      backgroundAudio.play()
      break;
    case ' ':
      shootAudio.play()
      break;
  }
});