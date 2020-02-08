/*----- constants -----*/
// const beepAudio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3');


/*----- app's state (variables) -----*/



/*----- cached element references -----*/


//character creation form & character aside
let charName = document.querySelector('#char-name')
let charHealth = document.querySelector('#char-health')
let charStrength = document.querySelector('#char-strength')
let charAgility = document.querySelector('#char-agility')

//navigations buttons
let homeButton = document.querySelector('#home')
let forestButton = document.querySelector('#forest')



/*----- event listeners -----*/





/*----- functions -----*/
function updateCharacterCard(){
    document.querySelector('#char-name').textContent = localStorage.getItem('charName')
}

updateCharacterCard()
