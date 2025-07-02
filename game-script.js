// whats left
// timer, larger grid for levels, shuffle

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
let cardsFinished = false
let board = document.querySelector('.threeBythree')
playAgain = document.createElement('button')

// FUNCTIONS
updateScore = () => {
  currentScore++
  bestScore++
  scoreDisplay.innerText = 'new: ' + currentScore
  bestDisplay.innerText = 'best: ' + bestScore
  if (currentScore >= 6) {
    currentScore = 0
    heartBeat = false
    board.style.opacity = '0'
    popup.innerText = 'you win!'
    popup.appendChild(playAgain).innerText = 'play again'
    playAgain.style.visibility = 'visible'
    hoverOverPlayAgain()
  }
  // return
}

let halfFlip = (firstIndex, secondIndex) => {
  if (firstCard !== secondCard.id) {
    setTimeout(() => {
      // console.log('two cards arent the same ')
      // console.log('index 1 is ' + firstIndex + 'index 2 is ' + secondIndex)
      fruit[firstIndex].style.opacity = '0'
      fruit[secondIndex].style.opacity = '0'
      background[firstIndex].style.backgroundColor = 'rgb(255, 228, 228)'
      background[secondIndex].style.backgroundColor = 'rgb(255, 228, 228)'
    }, 1000)
    popup.innerText = 'try again'
    popup.style.opacity = '1'
    setTimeout(() => {
      popup.innerText = ''
    }, 2000)
  }
  return
}

let hoverOverPlayAgain = () => {
  // console.log('firstCard', firstCard)
  // console.log('second card', secondCard)
  playAgain.addEventListener('mouseover', () => {
    playAgain.style.opacity = '0.5'
  })
  playAgain.addEventListener('mouseout', () => {
    playAgain.style.opacity = '1'
  })
  playAgain.addEventListener('click', () => {
    playAgain.style.display = 'none'
    board.style.opacity = '1'
    for (let i = 0; i < cards.length; i++) {
      console.log('enters remover')

      background[i].style.backgroundColor = 'rgb(255, 228, 228)'
      cards[i].removeEventListener('click', cardGame)
    }
    setTimeout(() => {
      popup.innerText = 'ready?'
    }, 1000)
    setTimeout(() => {
      popup.innerText = 'set.'
    }, 2000)
    setTimeout(() => {
      popup.innerText = 'go!'
      console.log(
        'In hoveroverplayagain, is there a card? ' + firstCard + secondCard
      )
      startGame()
    }, 3000)
  })
}

let flippingAction = (firstIndex, secondIndex) => {
  if (firstCard === secondCard.id) {
    // console.log('two cards are the same')
    fruit[firstIndex].style.opacity = '1'
    fruit[secondIndex].style.opacity = '1'
    background[firstIndex].style.backgroundColor = 'white'
    background[secondIndex].style.backgroundColor = 'white'
    updateScore()
    console.log('matched! resetting card choices')
    firstCard = ''
    secondCard = ''
    firstCardElement = ''
    return
  } else {
    halfFlip(firstIndex, secondIndex)
  }
}

let startGame = () => {
  firstCard = ''
  firstCardElement = ''
  secondCard = ''

  console.log('In startgame, is there a card? ' + firstCard + secondCard)
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
    console.log('Adding event listeners..')
    cards[i].addEventListener('click', () => cardGame(i))
  }
}

cardGame = (i) => {
  popup.innerText = ''
  // to prevent a card that has been clicked to be clicked again and provide the output of a pair
  if (cards[i] === firstCardElement) {
    return
  }

  if (!firstCard) {
    firstCard = cards[i].id
    firstCardElement = cards[i]
    fruit[i].style.opacity = '1'
    background[i].style.backgroundColor = 'white'
    console.log('first card flipped')
    // console.log(i)
    firstIndex = i
    return
  }
  if (!secondCard) {
    console.log('first card already picked! and is ' + firstCard)
    secondCard = cards[i]
    console.log('second card flipped')
    // console.log(i)
    fruit[i].style.opacity = '1'
    background[i].style.backgroundColor = 'white'
    secondIndex = i
    flippingAction(firstIndex, secondIndex)
    firstCard = ''
    secondCard = ''
    firstCardElement = ''
    return
  }

  console.log('here')
}
