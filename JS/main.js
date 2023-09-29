
//Efeitos Sonoros do Jogo
const backgroundAudio = new Audio('../msc/backgroundAudio.mp3');
const shootAudio = new Audio ('../msc/shoot.wav');

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    backgroundAudio.play();
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    shootAudio.play();
  }
});