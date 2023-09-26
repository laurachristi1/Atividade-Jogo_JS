const backgroundAudio = new Audio('background-sound.mp3'); // Substitua com o caminho do seu arquivo de som

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    backgroundAudio.play();
  }
});