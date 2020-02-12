// constants
const CHARACTER_OBJ_KEY = 'characterObj';

/*----- cached element references -----*/
let characterObj = JSON.parse(localStorage.getItem(CHARACTER_OBJ_KEY));
let charName = localStorage.getItem('charName');

//character creation form & character aside
let charNameArea = document.querySelector('#char-name')
let charHealth = document.querySelector('#char-health')
let charStrength = document.querySelector('#char-strength')
let charAgility = document.querySelector('#char-agility')

let positiveDisplayArea = document.querySelector('#h3_1')
let negativeDisplayArea = document.querySelector('#h3_2')

let healthBar = document.querySelector('.healthbar-char')
let healthBarSnake = document.querySelector('.healthbar-snake')
let healthBarWolf = document.querySelector('.healthbar-wolf')

let body = document.querySelector('body')
let audioPlayer = document.querySelector('audio')


//event listeners
body.addEventListener("click", playAudio)


//Functions 

//audio player
function playAudio(){
    audioPlayer.play()
} 


function renderCharacterCard(){
    charNameArea.textContent = charName
    charHealth.textContent = characterObj.stats.Health
    charStrength.textContent = characterObj.stats.Strength
    charAgility.textContent = characterObj.stats.Agility
}


function renderHealthBar(){
    let percentHealth = Math.round(characterObj.stats.Health/characterObj.stats.MaxHealth * 100)
    let percentString = "width: " + percentHealth + "%";
    healthBar.style = percentString
    console.log(percentString)
    console.log(characterObj.stats.MaxHealth)
    console.log(characterObj.stats.Health)
}

renderCharacterCard()
renderHealthBar()