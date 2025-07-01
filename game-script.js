let cards = document.querySelectorAll('.cards')
let fruit = document.querySelectorAll('.fruit')
let start = document.querySelector('.message')
let popup = document.querySelector('.popup')
let flag = false


let startGame = () => {
  flag = true
  for (let i = 0; i < cards.length; i++) {
    console.log('success')
    if (flag) {
      fruit[i].style.opacity = '1'
      setTimeout(() => {
        console.log('this works')
        fruit[i].style.opacity = '0'
      }, 2000)
    }
  }
  setTimeout(() => {
    popup.style.opacity = '1'
    popup.innerText = 'pick your first card'
  }, 2000)
} 

setTimeout(() => {
  popup.innerText = 'ready?'
}, 1000)
setTimeout(() => {
  popup.innerText = 'set.'
}, 2000)
setTimeout(() => {
  popup.innerText = 'go!'
  startGame()
}, 3000)



