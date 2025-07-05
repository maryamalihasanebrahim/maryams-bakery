let recipie1 = document.querySelector('#group1')
let recipie2 = document.querySelector('#group2')
let recipie3 = document.querySelector('#group3')

// chatgpt was used in this function
const getRandom = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
let which = getRandom(1, 3)
console.log(which)

recipie1.style.display = 'none'
recipie2.style.display = 'none'
recipie3.style.display = 'none'

switch (which) {
  case 1:
    recipie1.style.opacity = '1'
    recipie1.style.display = 'block'
    break

  case 2:
    recipie2.style.opacity = '1'
    recipie2.style.display = 'block'

    break

  case 3:
    recipie3.style.opacity = '1'
    recipie3.style.display = 'block'
    break
}
