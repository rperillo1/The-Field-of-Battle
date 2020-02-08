/*----- constants -----*/
// const beepAudio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3');


/*----- app's state (variables) -----*/
const characterState = {
    Health: 0,
    Strength: 0,
    Agility: 0,
    Modifier: 0
}

const snakeState = {
    Health: 0,
    Strength: 0,
    Agility: 0,
    Modifier: 0
}

const wolfState = {
    Health: 0,
    Strength: 0,
    Agility: 0,
    Modifier: 0
}


/*----- cached element references -----*/
const characterObj = {
    stats: {
        Health: characterState.Health,
        Strength: characterState.Strength,
        Agility: characterState.Agility
    },
    inventory: {
        potions: [],
        weapons: []
    }
}

const snakeObj = {
    stats: {
        Health: snakeState.Health,
        Strength: snakeState.Strength,
        Agility: snakeState.Agility
    }
}

const wolfObj = {
    stats: {
        Health: wolfState.Health,
        Strength: wolfState.Strength,
        Agility: wolfState.Agility
    }
}

//character creation form & character aside
let charSubmit = document.querySelector('#char-submit')
let charName = document.querySelector('#char-name')
let charHealth = document.querySelector('#char-health')
let charStrength = document.querySelector('#char-strength')
let charAgility = document.querySelector('#char-agility')

//navigations buttons
let adventureButton = document.querySelector('#adventure')
let homeButton = document.querySelector('#home')
let forestButton = document.querySelector('#forest')
let townButton = document.querySelector('#town')
let fightButton = document.querySelector('#fight')
let mountainsButton = document.querySelector('#mountains')

//combat buttons
let swing = document.querySelector("#swing")
let dodge = document.querySelector('#dodge')
let run = document.querySelector('#run')
let potions = document.querySelector('#potions')


/*----- event listeners -----*/
if (charSubmit) {
    charSubmit.addEventListener('click', CreateChar)
};



/*----- functions -----*/


function CreateChar(e){
    if (document.querySelector('input[name="choice"]:checked')) {
        characterInfo = document.querySelector('#char-input').value
        charName.textContent = characterInfo
        
        localStorage.setItem('charName', characterInfo)

        charSubmit.disabled = true;
        setTimeout(function(){
            $('.create-char').css({opacity: 1.0, visibility: "hidden"}).animate({opacity: 0.0});
        },700);
        setTimeout(function(){
            $('#adventure').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
        },600);
    }
}

document.querySelector('#char-name').textContent = localStorage.getItem('charName')


function init(){
    adventureButton.style.visibility = 'hidden'
}

init()

