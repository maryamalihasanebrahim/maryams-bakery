const button = document.querySelector('#left')
const letsPlay = new Audio('images/game_start.mp3')
const how = document.querySelector('.howto')
const select = new Audio ('images/select-sound-121244.mp3')

button.addEventListener('click', () => {
  setTimeout(() => {
    window.location.href = 'level-1.html'
  }, 800)
  letsPlay.play()
})


how.addEventListener('click', () => {
    setTimeout(() => {
    window.location.href = 'how_to_play.html'
  }, 800)
  select.play()
})