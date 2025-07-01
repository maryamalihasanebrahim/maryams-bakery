// VARIABLES
let cards = document.querySelectorAll('.cards')
let fruit = document.querySelectorAll('.fruit')
let start = document.querySelector('.message')
let popup = document.querySelector('.popup')
let flag = false
let firstCard = ''
let firstCardElement = ''
let secondCard = ''
let currentScore = 0
let bestScore = 0
let scoreDisplay = document.querySelector('.score')
let bestDisplay = document.querySelector('.best')
let heartBeat = false
let background = document.querySelectorAll('button')
let firstIndex = 0
let secondIndex = 0
let enable = false

// FUNCTIONS
updateScore = () => {
  currentScore++
  bestScore++
  scoreDisplay.innerText = 'new: ' + currentScore
  bestDisplay.innerText = 'best: ' + bestScore
}

let halfFlip = (firstIndex, secondIndex) => {
  console.log('enters function')
  console.log("when no equal first card is" + firstCard)
  console.log("when no equal first card is" + secondCard.id)
  if (firstCard !== secondCard.id) {
    fruit[firstIndex].style.opacity = '1'
    fruit[secondIndex].style.opacity = '1'
    background[firstIndex].style.backgroundColor = 'white'
    background[secondIndex].style.backgroundColor = 'white'
  }
  setTimeout(() => {
    fruit[firstIndex].style.opacity = '0'
    fruit[secondIndex].style.opacity = '0'
    background[firstIndex].style.backgroundColor = 'rgb(255, 228, 228)'
    background[secondIndex].style.backgroundColor = 'rgb(255, 228, 228)'
  }, 2000)
  console.log('try again')
}

console.log([fruit])
let flippingAction = (firstIndex, secondIndex) => {
  if (firstCard === secondCard.id) {
    fruit[firstIndex].style.opacity = '1'
    fruit[secondIndex].style.opacity = '1'
    background[firstIndex].style.backgroundColor = 'white'
    background[secondIndex].style.backgroundColor = 'white'
    updateScore()
    return
  }

  else {
    halfFlip(firstIndex, secondIndex)
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
    cards[i].addEventListener('click', () => {
      // to prevent a card that has been clicked to be clicked again and provide the output of a pair
      if (cards[i] === firstCardElement) {
        return
      }
      console.log('first card: ' + firstCard)
      console.log('second card:' + secondCard)
      if (!firstCard) {
        firstCard = cards[i].id
        firstCardElement = cards[i]
        console.log('first card flipped')
        firstIndex = i
        return
      }
      if (!secondCard) {
        secondCard = cards[i]
        console.log('second card flipped')
        secondIndex = i
        console.log(firstIndex + ' and ' + secondIndex)
        flippingAction(firstIndex, secondIndex)
        firstCard = ''
        secondCard = ''
        console.log('first card: ' + firstCard)
        console.log('second card:' + secondCard)
        firstCardElement = ''
        return
      }
    })
  }
}





