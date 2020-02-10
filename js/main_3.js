/*----- constants -----*/
// const beepAudio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3');


/*----- app's state (variables) -----*/
const snakeState = {
    Health: 0,
    Strength: 0,
    Agility: 0,
}

let strModifier = 0;

/*----- cached element references -----*/
let fightButton = document.querySelector('#fight')
let mountainsButton = document.querySelector('#mountains')
let creaturesCard = document.querySelector('.creatureStats')
let combatCard = document.querySelector('.combat-card')
let snakeHealth = document.querySelector('#creature-health')
let snakeStrength = document.querySelector('#creature-strength')
let snakeAgility = document.querySelector('#creature-agility')

//combat buttons
let swingBtn = document.querySelector("#swing")
let dodgeBtn = document.querySelector('#dodge')
let runBtn = document.querySelector('#run')
let potionsBtn = document.querySelector('#potions')


const snakeObj = {
    stats: {
        Health: snakeState.Health,
        Strength: snakeState.Strength,
        Agility: snakeState.Agility
    }
}

/*----- event listeners -----*/
// fightButton.addEventListener('click', createBattleCards)
swingBtn.addEventListener('click', swing)
dodgeBtn.addEventListener('click', dodge)
runBtn.addEventListener('click', run)



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

    charHealth.textContent = characterObj.stats.Health
    charStrength.textContent = characterObj.stats.Strength
    charAgility.textContent = characterObj.stats.Agility
}


function swing(){
    charSwing()
    creatureSwing()
    characterObj.stats.Strength -= strModifier;
    strModifier = 0;
    renderStats()
}

function dodge(){
    if (randomizeAgilityMiss(characterObj) > randomizeAgilityMiss(snakeObj)) {
        console.log(`character strength before modifier ${characterObj.stats.Strength}`)
        strModifier = 15;
        characterObj.stats.Strength += strModifier;
        console.log(`you dodge the creature. Your strength is boosted by ${strModifier} and is now ${characterObj.stats.Strength}`)
    }
    else if (randomizeAgilityMiss(characterObj) < randomizeAgilityMiss(snakeObj)) {
        console.log('you did not dodge the creatures swing')
        creatureSwing()
    }
    renderStats()
}

function run(){
    snakeState.Agility += 15;
    console.log(`snakeState agility is ${snakeState.Agility} before run attempt`)
    if (randomizeAgilityMiss(characterObj) > randomizeAgilityMiss(snakeObj)) {
        console.log(`you successfully ran away`)
        creaturesCard.style.visibility = 'hidden'
        combatCard.style.visibility = 'hidden'
    }
    else {
        console.log(`you did not run away`)
    }
    snakeState.Agility -= 15;
    console.log(`snakeState agility is ${snakeState.Agility} after run attempt`)
}

 function charSwing(){
     if (randomizeStrengthSwing(characterObj) > randomizeAgilityMiss(snakeObj)) {
         snakeState.Health -= 10;
         console.log(`you hit! ${randomizeStrengthSwing(characterObj)} is more than ${randomizeAgilityMiss(snakeObj)}`)
     }
     else {
         console.log(`you miss! ${randomizeStrengthSwing(characterObj)} is less than ${randomizeAgilityMiss(snakeObj)}`)
     }
 }

 function creatureSwing(){
    if (randomizeStrengthSwing(snakeObj) > randomizeAgilityMiss(characterObj)) {
        characterObj.stats.Health -= 10;
        console.log(`creature hit! ${randomizeStrengthSwing(snakeObj)} is more than ${randomizeAgilityMiss(characterObj)}`)
    }
    else {
        console.log(`creature misses! ${randomizeStrengthSwing(snakeObj)} is less than ${randomizeAgilityMiss(characterObj)}`)
    }
 }

 function randomizeStrengthSwing(obj){
     let randSwing = Math.floor(Math.random() * obj.stats.Strength) + 1
     return randSwing;
 }

 function randomizeAgilityMiss(obj){
     let randDodge = Math.floor(Math.random() * obj.stats.Agility) + 1
     return randDodge;
 }





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