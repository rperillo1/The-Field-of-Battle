/*----- app's state (variables) -----*/
const wolfState = {
    Health: 0,
    Strength: 0,
    Agility: 0,
}

let strModifier = 0;

/*----- cached element references -----*/
let fightBtn = document.querySelector('#fight')
let forestBtn = document.querySelector('#forest')
let creaturesCard = document.querySelector('.creatureStats2')
let combatCard = document.querySelector('.combat-card')
let wolfHealth = document.querySelector('#creature-health')
let wolfStrength = document.querySelector('#creature-strength')
let wolfAgility = document.querySelector('#creature-agility')

//combat buttons
let swingBtn = document.querySelector("#swing")
let dodgeBtn = document.querySelector('#dodge')
let runBtn = document.querySelector('#run')
let potionsBtn = document.querySelector('#potions')


const wolfObj = {
    stats: {
        Health: wolfState.Health,
        Strength: wolfState.Strength,
        Agility: wolfState.Agility
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
    else if (wolfObj.stats.Health < 0) {
        alert("you beat the wolf, YOU BEAT THE GAME")
        disableButtons()
    }
}

function disableButtons(){
    fightBtn.disabled = true;
    swingBtn.disabled = true;
    dodgeBtn.disabled = true;
    runBtn.disabled = true;
}


function generateStats(){
    if (wolfObj.stats.Health === 0) {
        generateHealth()
    }
    if (wolfObj.stats.Strength === 0) {
        generateStr()
    }
    if (wolfObj.stats.Agility === 0) {
        generateAgi()
    }
}


function generateHealth(){
    let min = 55, max = 90
    wolfState.Health = Math.floor(Math.random() * (max - min + 1) + min)
}

function generateStr(){
    let min = 25, max = 40
    wolfState.Strength = Math.floor(Math.random() * (max - min + 1) + min)
}

function generateAgi(){
    let min = 25, max = 40
    wolfState.Agility = Math.floor(Math.random() * (max - min + 1) + min)
}

function swing(){
    charSwing()
    creatureSwing()
    characterObj.stats.Strength -= strModifier;
    strModifier = 0;
    renderStats()
    isDead()
}

function charSwing(){
    let charSwingCheck = randomizeStrength(characterObj)
    let wolfMissCheck = randomizeAgility(wolfObj)
    if (charSwingCheck > wolfMissCheck) {
        wolfState.Health -= 10;
        console.log(`you hit! ${charSwingCheck} is more than ${wolfMissCheck}`)
    }
    else {
        console.log(`you miss! ${charSwingCheck} is less than ${wolfMissCheck}`)
    }
}

function creatureSwing(){
   let wolfSwingCheck = randomizeStrength(wolfObj)
   let charMissCheck = randomizeAgility(characterObj)
   if (wolfSwingCheck > charMissCheck) {
       characterObj.stats.Health -= 10;
       console.log(`creature hit! ${wolfSwingCheck} is more than ${charMissCheck}`)
   }
   else {
       console.log(`creature misses! ${wolfSwingCheck} is less than ${charMissCheck}`)
   }
}


function dodge(){
    let charDodgeCheck = randomizeAgility(characterObj)
    let wolfHitCheck = randomizeAgility(wolfObj)
    if (charDodgeCheck > wolfHitCheck) {
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
    isDead()
}


function run(){
    wolfObj.stats.Agility += 50;
    console.log(`wolfObj.stats.Agility is ${wolfObj.stats.Agility} before run attempt`)
    let charRunCheck = randomizeAgility(characterObj)
    let wolfCatchCheck = randomizeAgility(wolfObj)
    if (charRunCheck > wolfCatchCheck) {
        console.log(`you successfully ran away, wolf rolled ${wolfCatchCheck} and character rolled ${charRunCheck}`)
        creaturesCard.style.visibility = 'hidden'
        forestBtn.style.visibility = 'visible'
        fightBtn.style.visibility = 'visible'
    }
    else {
        console.log(`you did not run away, wolf rolled ${wolfCatchCheck} and character rolled ${charRunCheck}`)
        creatureSwing()
    }
    wolfObj.stats.Agility -= 50;
    console.log(`wolfObj.stats.Agility is ${wolfObj.stats.Agility} after run attempt`)
    renderStats()
    isDead()
}


//randomizes a variable based on character or creatures stats from 1 to max Str/Agi
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


//fades in the battle cards when player clicks fight button
function createBattleCards(e){
    setTimeout(function(){
        $('aside#creature-stats2.creatureStats2').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
    }, 1000);
}


//renders the character card, creature card as well as local storage to match changes
function renderStats(){
    generateStats()
    wolfObj.stats.Health = wolfState.Health
    wolfObj.stats.Strength = wolfState.Strength
    wolfObj.stats.Agility = wolfState.Agility
    wolfHealth.textContent = wolfState.Health
    wolfStrength.textContent = wolfState.Strength
    wolfAgility.textContent = wolfState.Agility

    charHealth.textContent = characterObj.stats.Health
    charStrength.textContent = characterObj.stats.Strength
    charAgility.textContent = characterObj.stats.Agility

    localStorage.setItem(CHARACTER_OBJ_KEY, JSON.stringify(characterObj));
}


function init(){
    fightBtn.style.visibility = 'hidden'
    forestBtn.style.visibility = 'hidden'
    renderStats()
}

init()