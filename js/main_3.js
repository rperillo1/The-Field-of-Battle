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
        Agility: snakeState.Agility,
        MaxHealth: null
    }
}

/*----- event listeners -----*/
fightBtn.addEventListener('click', createBattleCards)
swingBtn.addEventListener('click', swing)
dodgeBtn.addEventListener('click', dodge)
runBtn.addEventListener('click', run)



/*----- functions -----*/

//check if player or creature is dead
function isDead(){
    if (characterObj.stats.Health < 0) {
        alert("game over, you died")
        disableButtons()
    }
    else if (snakeObj.stats.Health < 0) {
        alert("you beat the snake, move to the mountains")
        disableButtons()
        mountainsBtn.style.visibility = 'visible'
    }
}

function disableButtons(){
    fightBtn.disabled = true;
    swingBtn.disabled = true;
    dodgeBtn.disabled = true;
    runBtn.disabled = true;
}

function undisableButtons() {
    fightBtn.disabled = false;
    swingBtn.disabled = false;
    dodgeBtn.disabled = false;
    runBtn.disabled = false;
}

//generates the snakes stats
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



//combat buttons functionality
function swing(){
    disableButtons()
    charSwing()
    setTimeout(function(){
        positiveDisplayArea.textContent = ''
        negativeDisplayArea.textContent = ''
    }, 2000);
    setTimeout(function(){
        creatureSwing()
        renderStats()
        isDead()
    },2001);
    characterObj.stats.Strength -= strModifier;
    strModifier = 0;
    setTimeout(function(){
        undisableButtons()
    }, 4000);
}

function charSwing(){
    let charSwingCheck = randomizeStrength(characterObj)
    let snakeMissCheck = randomizeAgility(snakeObj)
    if (charSwingCheck > snakeMissCheck) {
        snakeState.Health -= 10;
        positiveDisplayArea.innerHTML = `You hit the snake! <br> You rolled ${charSwingCheck} and the creature rolled ${snakeMissCheck}`
    }
    else {
        negativeDisplayArea.innerHTML = `You miss! <br> You rolled ${charSwingCheck} and the creature rolled ${snakeMissCheck}`
    }
}

function creatureSwing(){
   let snakeSwingCheck = randomizeStrength(snakeObj)
   let charMissCheck = randomizeAgility(characterObj)
   if (snakeSwingCheck > charMissCheck) {
       characterObj.stats.Health -= 10;
       negativeDisplayArea.innerHTML = `Creature hit you! <br> It rolled ${snakeSwingCheck} and you rolled ${charMissCheck}`
   }
   else {
       positiveDisplayArea.innerHTML = `Creature misses you! <br> It rolled ${snakeSwingCheck} and you rolled ${charMissCheck}`
   }
}


function dodge(){
    let charDodgeCheck = randomizeAgility(characterObj)
    let snakeHitCheck = randomizeAgility(snakeObj)
    if (charDodgeCheck > snakeHitCheck) {
        console.log(`character strength before modifier ${characterObj.stats.Strength}`)
        strModifier = 15;
        characterObj.stats.Strength += strModifier;
        positiveDisplayArea.innerHTML = `Dodged succesfully! <br> Your strength is boosted by ${strModifier}`
    }
    else {
        negativeDisplayArea.innerHTML = 'You did not dodge the creatures swing. <br> Creature swings at you!'
        creatureSwing()
    }
    renderStats()
    isDead()
}


function run(){
    snakeObj.stats.Agility += 50;
    console.log(`snakeObj.stats.Agility is ${snakeObj.stats.Agility} before run attempt`)
    let charRunCheck = randomizeAgility(characterObj)
    let snakeCatchCheck = randomizeAgility(snakeObj)
    if (charRunCheck > snakeCatchCheck) {
        positiveDisplayArea.innerHTML = `You successfully ran away, <br> snake rolled ${snakeCatchCheck} and character rolled ${charRunCheck}`
        creaturesCard.style.visibility = 'hidden'
        townBtn.style.visibility = 'visible'
        fightBtn.style.visibility = 'visible'
    }
    else {
        negativeDisplayArea.innerHTML = `you did not run away, <br> snake rolled ${snakeCatchCheck} and character rolled ${charRunCheck}`
        creatureSwing()
    }
    snakeObj.stats.Agility -= 50;
    console.log(`snakeObj.stats.Agility is ${snakeObj.stats.Agility} after run attempt`)
    renderStats()
    isDead()
}


//randomizes a variable based on character or creatures stats from 1 to max Str/Agi
 function randomizeStrength(obj){
     let randSwing = Math.floor(Math.random() * obj.stats.Strength) + 1
     return randSwing;
 }

 function randomizeAgility(obj){
     let randDodge = Math.floor(Math.random() * obj.stats.Agility) + 1
     return randDodge;
 }


//fades in the battle cards when player clicks fight button
function createBattleCards(e){
    setTimeout(function(){
        $('aside#creature-stats.creatureStats').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
    },600);
}

function renderHealthBarSnake(){
    let percentHealth = Math.round(snakeObj.stats.Health/snakeObj.stats.MaxHealth * 100)
    let percentString = "width: " + percentHealth + "%"
    healthBarSnake.style = percentString
}


//renders the character card, creature card as well as local storage to match changes
function renderStats(){
    generateStats()
    snakeObj.stats.Health = snakeState.Health
    snakeObj.stats.Strength = snakeState.Strength
    snakeObj.stats.Agility = snakeState.Agility
    snakeHealth.textContent = snakeState.Health
    snakeStrength.textContent = snakeState.Strength
    snakeAgility.textContent = snakeState.Agility

    if (snakeObj.stats.MaxHealth === null) {
        snakeObj.stats.MaxHealth = snakeState.Health
    }
    
    charHealth.textContent = characterObj.stats.Health
    charStrength.textContent = characterObj.stats.Strength
    charAgility.textContent = characterObj.stats.Agility

    localStorage.setItem(CHARACTER_OBJ_KEY, JSON.stringify(characterObj));
    renderHealthBar()
    renderHealthBarSnake()
}


function init(){
    mountainsBtn.style.visibility = 'hidden'
    fightBtn.style.visibility = 'hidden'
    townBtn.style.visibility = 'hidden'
    renderStats()
}

init()