/*----- constants -----*/
// const beepAudio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3');


/*----- app's state (variables) -----*/
const snakeState = {
    Health: 0,
    Strength: 0,
    Agility: 0,
}

/*----- cached element references -----*/
let fightButton = document.querySelector('#fight')
let mountainsButton = document.querySelector('#mountains')
let creaturesCard = document.querySelector('.creatureStats')
let combatCard = document.querySelector('.combat-card')
let snakeHealth = document.querySelector('#creature-health')
let snakeStrength = document.querySelector('#creature-strength')
let snakeAgility = document.querySelector('#creature-agility')

//combat buttons
let swing = document.querySelector("#swing")
let dodge = document.querySelector('#dodge')
let run = document.querySelector('#run')
let potions = document.querySelector('#potions')


const snakeObj = {
    stats: {
        Health: snakeState.Health,
        Strength: snakeState.Strength,
        Agility: snakeState.Agility
    }
}

/*----- event listeners -----*/
// fightButton.addEventListener('click', createBattleCards)




/*----- functions -----*/
function generateStats(){
    if (snakeObj.stats.Health === 0) {
        generateHealth()
    }
    if (snakeObj.stats.Strength === 0) {
        generateStr()
    }
    if (snakeObj.stats.Agility === 0) {
        generateAgi()
    }
}


function generateHealth(){
    let min = 40, max = 90
    snakeState.Health = Math.floor(Math.random() * (max - min + 1) + min)
}

function generateStr(){
    let min = 15, max = 40
    snakeState.Strength = Math.floor(Math.random() * (max - min + 1) + min)
}

function generateAgi(){
    let min = 15, max = 40
    snakeState.Agility = Math.floor(Math.random() * (max - min + 1) + min)
}


function renderStats(){
    generateStats()
    snakeObj.stats.Health = snakeState.Health
    snakeObj.stats.Strength = snakeState.Strength
    snakeObj.stats.Agility = snakeState.Agility
    snakeHealth.textContent = snakeState.Health
    snakeStrength.textContent = snakeState.Strength
    snakeAgility.textContent = snakeState.Agility
}

renderStats()

function battle(){
    while (characterObj.stats.Health > 0 || snakeState.Health > 0) {
        charSwing()
        creatureSwing() 
    }
    return;
}

 function charSwing(){
     if (randomizeStrengthSwing(characterObj) > randomizeAgilityMiss(snakeObj)) {
         snakeState.Health -= 10;
         console.log('you hit!')
     }
     else {
         console.log('you miss!')
     }
 }

 function creatureSwing(){
    if (randomizeStrengthSwing(snakeObj) > randomizeAgilityMiss(characterObj)) {
        characterObj.stats.Health -= 10;
        console.log('creature hit!')
    }
    else {
        console.log('creature miss!')
    }
 }

 function randomizeStrengthSwing(objChoice){
     let randSwing = Math.floor(Math.random() * objChoice.stats.Strength) + 1
     console.log(randSwing)
     return randSwing;
 }
 
 function randomizeAgilityMiss(objChoice){
     let randDodge = Math.floor(Math.random() * objChoice.stats.Agility) + 1
     console.log(randDodge)
     return randDodge;
 }



//  randomizeStrengthSwing()
//  randomizeAgilityMiss()

battle()


// function createBattleCards(e){
//     setTimeout(function(){
//         $('aside#creatureStats.creature-stats').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
//     },600);
// }


// function init(){
//     mountainsButton.style.visibility = 'hidden'
//     creaturesCard.style.visibility = 'hidden'
//     combatCard.style.visibility = 'hidden'
// }

// init()