// whats left
// timer, larger grid for levels

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
// the following is taken from https://marina-ferreira.github.io/tutorials/js/memory-game/
shuffle = () => {
  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 12)
    card.style.order = ramdomPos
  })
}

updateScore = () => {
  currentScore++
  bestScore++
  scoreDisplay.innerText = 'new: ' + currentScore
  bestDisplay.innerText = 'best: ' + bestScore
  setTimeout(() => {
    if (currentScore >= 10) {
      currentScore = 0
      heartBeat = false
      board.style.opacity = '0'
      popup.innerText = 'you win!'
      popup.appendChild(playAgain).innerText = 'play level 3'
      playAgain.style.visibility = 'visible'
      hoverOverPlayAgain()
    }
  }, 400)
  return
}

let halfFlip = (firstIndex, secondIndex) => {
  if (firstCard !== secondCard.id) {
    setTimeout(() => {
      fruit[firstIndex].style.opacity = '0'
      fruit[secondIndex].style.opacity = '0'
      background[firstIndex].style.backgroundColor = 'rgb(255, 228, 228)'
      background[secondIndex].style.backgroundColor = 'rgb(255, 228, 228)'
    }, 1000)
    popup.innerText = 'try again'
    popup.style.opacity = '1'
    setTimeout(() => {
      popup.innerText = ''
    }, 1000)
  }
  return
}

let hoverOverPlayAgain = () => {
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
      popup.style.margin = '10px 10px 15px 10px'
      background[i].style.backgroundColor = 'rgb(255, 228, 228)'
      cards[i].removeEventListener('click', cardGame)
    }
    window.location.href = 'level-3.html'
    // setTimeout(() => {
    //   popup.innerText = 'ready?'
    // }, 1000)
    // setTimeout(() => {
    //   popup.innerText = 'set.'
    // }, 2000)
    // setTimeout(() => {
    //   popup.innerText = 'go!'
    //   console.log(
    //     'In hoveroverplayagain, is there a card? ' + firstCard + secondCard
    //   )
    //   startGame()
    // }, 3000)
  })
}

let flippingAction = (firstIndex, secondIndex) => {
  if (firstCard === secondCard.id) {
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

const startGame = () => {
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

const heartOfTheGame = () => {
  shuffle()
  for (let i = 0; i < cards.length && heartBeat; i++) {
    console.log('Adding event listeners..')
    cards[i].addEventListener('click', () => cardGame(i))
  }
}

const cardGame = (i) => {
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
