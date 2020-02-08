/*----- constants -----*/
// const beepAudio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3');


/*----- cached element references -----*/
let characterObj = JSON.parse(localStorage.getItem(CHARACTER_OBJ_KEY));
let charName = localStorage.getItem('charName');

//character creation form & character aside
let charNameArea = document.querySelector('#char-name')
let charHealth = document.querySelector('#char-health')
let charStrength = document.querySelector('#char-strength')
let charAgility = document.querySelector('#char-agility')

//navigations buttons
let homeButton = document.querySelector('#home')
let forestButton = document.querySelector('#forest')



/*----- event listeners -----*/





/*----- functions -----*/
function renderCharacterCard(){
    charNameArea.textContent = charName
    charHealth.textContent = characterObj.stats.Health
    charStrength.textContent = characterObj.stats.Strength
    charAgility.textContent = characterObj.stats.Agility
}

renderCharacterCard()
