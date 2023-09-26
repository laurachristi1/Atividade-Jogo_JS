
//MUSICA DO JOGO 
const backgroundAudio = new Audio('../msc/Hero s Day Off Chiptune8-bitEight Bit.mp3');

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    backgroundAudio.play();
  }
});