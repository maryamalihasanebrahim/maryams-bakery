const button = document.querySelector('#left')
const letsPlay = new Audio('images/game_start.mp3')

button.addEventListener('click', () => {
  setTimeout(() => {
    window.location.href = 'level-1.html'
  }, 800)
  letsPlay.play()
})
