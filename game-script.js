// VARIABLES
let cards = document.querySelectorAll('.cards')
let fruit = document.querySelectorAll('.fruit')
let start = document.querySelector('.message')
let popup = document.querySelector('.popup')
let flag = false
let firstCard = ''
let secondCard = ''
let currentScore = 0
let scoreDisplay = document.querySelector('.score')
let heartBeat = false

// FUNCTIONS
updateScore = () => {
  currentScore++
  scoreDisplay.innerText = 'new: ' + currentScore
}

let flippingAction = () => {
  if (firstCard === secondCard) {
    console.log(
      'this is an error unless printed after this logs and this logs 2'
    )
    // firstCard.style.opacity = '1'
    // secondCard.style.opacity = '1'
    // updateScore()
  }
}

let startGame = () => {
  flag = true
  for (let i = 0; i < cards.length; i++) {
    if (flag) {
      fruit[i].style.opacity = '1'
      setTimeout(() => {
        fruit[i].style.opacity = '0'
      }, 2000)
    }
  }

  setTimeout(() => {
    popup.style.opacity = '1'
    popup.innerText = 'pick your first card'
  }, 2000)
  heartBeat = true
  heartOfTheGame()
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

heartOfTheGame = () => {
  for (let i = 0; i < cards.length && heartBeat; i++) {
    heartBeat = false
    cards[i].addEventListener('click', () => {
      if (!firstCard) {
        firstCard = cards[i].id
        console.log('first click')
        return
      }
      if (!secondCard) {
        secondCard = cards[i].id
        console.log('second click')
      }
    })
  }
}

// put this into a function
