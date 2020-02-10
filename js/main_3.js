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
let fightBtn = document.querySelector('#fight')
let mountainsBtn = document.querySelector('#mountains')
let townBtn = document.querySelector('#town')
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
fightBtn.addEventListener('click', createBattleCards)
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

    localStorage.setItem(CHARACTER_OBJ_KEY, JSON.stringify(characterObj));
}


function swing(){
    charSwing()
    creatureSwing()
    characterObj.stats.Strength -= strModifier;
    strModifier = 0;
    renderStats()
}

function dodge(){
    let charDodgeCheck = randomizeAgility(characterObj)
    let snakeHitCheck = randomizeAgility(snakeObj)
    if (charDodgeCheck > snakeHitCheck) {
        console.log(`character strength before modifier ${characterObj.stats.Strength}`)
        strModifier = 15;
        characterObj.stats.Strength += strModifier;
        console.log(`you dodge the creature. Your strength is boosted by ${strModifier} and is now ${characterObj.stats.Strength}`)
    }
    else {
        console.log('you did not dodge the creatures swing')
        creatureSwing()
    }
    renderStats()
}

function run(){
    snakeObj.stats.Agility += 50;
    console.log(`snakeObj.stats.Agility is ${snakeObj.stats.Agility} before run attempt`)
    let charRunCheck = randomizeAgility(characterObj)
    let snakeCatchCheck = randomizeAgility(snakeObj)
    if (charRunCheck > snakeCatchCheck) {
        console.log(`you successfully ran away, snake rolled ${snakeCatchCheck} and character rolled ${charRunCheck}`)
        creaturesCard.style.visibility = 'hidden'
        townBtn.style.visibility = 'visible'
        fightBtn.style.visibility = 'visible'
    }
    else {
        console.log(`you did not run away, snake rolled ${snakeCatchCheck} and character rolled ${charRunCheck}`)
        creatureSwing()
    }
    snakeObj.stats.Agility -= 50;
    console.log(`snakeObj.stats.Agility is ${snakeObj.stats.Agility} after run attempt`)
    renderStats()
}

 function charSwing(){
     let charSwingCheck = randomizeStrength(characterObj)
     let snakeMissCheck = randomizeAgility(snakeObj)
     if (charSwingCheck > snakeMissCheck) {
         snakeState.Health -= 10;
         console.log(`you hit! ${charSwingCheck} is more than ${snakeMissCheck}`)
     }
     else {
         console.log(`you miss! ${charSwingCheck} is less than ${snakeMissCheck}`)
     }
 }

 function creatureSwing(){
    let snakeSwingCheck = randomizeStrength(snakeObj)
    let charMissCheck = randomizeAgility(characterObj)
    if (snakeSwingCheck > charMissCheck) {
        characterObj.stats.Health -= 10;
        console.log(`creature hit! ${snakeSwingCheck} is more than ${charMissCheck}`)
    }
    else {
        console.log(`creature misses! ${snakeSwingCheck} is less than ${charMissCheck}`)
    }
 }

 function randomizeStrength(obj){
     let randSwing = Math.floor(Math.random() * obj.stats.Strength) + 1
     console.log(randSwing)
     return randSwing;
 }

 function randomizeAgility(obj){
     let randDodge = Math.floor(Math.random() * obj.stats.Agility) + 1
     console.log(randDodge)
     return randDodge;
 }



function createBattleCards(e){
    setTimeout(function(){
        $('aside#creatureStats.creature-stats').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
    },600);
}


function init(){
    mountainsBtn.style.visibility = 'hidden'
    fightBtn.style.visibility = 'hidden'
    townBtn.style.visibility = 'hidden'
    renderStats()
}

init()