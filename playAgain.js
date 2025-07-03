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
let bestScore = sessionStorage.getItem('playerBestScore'); 
let scoreDisplay = document.querySelector('.score')
let bestDisplay = document.querySelector('.best')
let heartBeat = false
let background = document.querySelectorAll('button')
let firstIndex = 0
let secondIndex = 0
let cardsFinished = false
let board = document.querySelector('.threeBythree')
playAgain = document.createElement('button')
let interval
let timerOn = true
let timerWorking = true
let targetDate = undefined



// FUNCTIONS
// the following is taken from https://marina-ferreira.github.io/tutorials/js/memory-game/
const updateTimer = () => {
  const now = new Date().getTime()
  const difference = targetDate - now

  if (difference < 0) {
    console.log('you lose')
    document.getElementById('time').innerHTML = 'time over!'
    board.style.opacity = '0'
    popup.appendChild(playAgain).innerText = 'play again'
    playAgain.style.visibility = 'visible'
    lostWantsToPlayAgain()
    timerOn = false
    clearInterval(interval)
    return
  }
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  document.getElementById('time').innerHTML = `${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const lostWantsToPlayAgain =() => {
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
      background[i].style.backgroundColor = '#3A2222'
      window.location.href = 'playAgain.html'
    }
  })
}

const stopTimer = () => {
  document.getElementById('time').innerHTML = 'good job!'
  clearInterval(interval)
  timerWorking = false
  timerOn = false
}

shuffle = () => {
  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 12)
    card.style.order = ramdomPos
  })
}

updateScore = () => {
  currentScore++
  scoreDisplay.innerText = 'new: ' + currentScore
  if(currentScore>bestScore) {
    bestScore = currentScore
    bestDisplay.innerText = 'best: ' + bestScore

  }
  setTimeout(() => {
    if (currentScore >= 6) {
      // bestDisplay.innerText = 'best: ' + bestScore
      stopTimer()
      currentScore = 0
      heartBeat = false
      board.style.opacity = '0'
      popup.innerText = 'you win!'
      popup.appendChild(playAgain).innerText = 'play level 2'
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
      background[firstIndex].style.backgroundColor = '#3A2222'
      background[secondIndex].style.backgroundColor = '#3A2222'
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
      background[i].style.backgroundColor = '#3A2222'
    }
    window.location.href = 'level-2.html'
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

const startGame = () => {
  timer()
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

bestDisplay.innerText = 'best: ' + bestScore
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
  if (timerOn) {
    // shuffle()
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
      firstIndex = i
      return
    }
    if (!secondCard) {
      console.log('first card already picked! and is ' + firstCard)
      secondCard = cards[i]
      console.log('second card flipped')
      fruit[i].style.opacity = '1'
      background[i].style.backgroundColor = 'white'
      secondIndex = i
      flippingAction(firstIndex, secondIndex)
      firstCard = ''
      secondCard = ''
      firstCardElement = ''
      return
    }
  }
}

const timer = () => {
  if (timerWorking) {
    // the following segment is taken from https://docs.vultr.com/javascript/examples/create-countdown-timer
    targetDate = new Date().getTime() + 1000 * 20

    interval = setInterval(updateTimer, 1000)
  }
}
