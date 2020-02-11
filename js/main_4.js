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

function undisableButtons() {
    fightBtn.disabled = false;
    swingBtn.disabled = false;
    dodgeBtn.disabled = false;
    runBtn.disabled = false;
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
    let wolfMissCheck = randomizeAgility(wolfObj)
    if (charSwingCheck > wolfMissCheck) {
        wolfState.Health -= 10;
        positiveDisplayArea.innerHTML = `You hit the wolf! <br> You rolled ${charSwingCheck} and the creature rolled ${wolfMissCheck}`
    }
    else {
        negativeDisplayArea.innerHTML = `You miss the wolf! <br> You rolled ${charSwingCheck} and the creature rolled ${wolfMissCheck}`
    }
}

function creatureSwing(){
   let wolfSwingCheck = randomizeStrength(wolfObj)
   let charMissCheck = randomizeAgility(characterObj)
   if (wolfSwingCheck > charMissCheck) {
       characterObj.stats.Health -= 10;
       negativeDisplayArea.innerHTML = `Creature hits you! <br> It rolled ${wolfSwingCheck} and you rolled ${charMissCheck}`
   }
   else {
    positiveDisplayArea.innerHTML = `Creature misses you! <br> It rolled ${wolfSwingCheck} and you rolled ${charMissCheck}`
}
}


function dodge(){
    let charDodgeCheck = randomizeAgility(characterObj)
    let wolfHitCheck = randomizeAgility(wolfObj)
    if (charDodgeCheck > wolfHitCheck) {
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
    wolfObj.stats.Agility += 50;
    console.log(`wolfObj.stats.Agility is ${wolfObj.stats.Agility} before run attempt`)
    let charRunCheck = randomizeAgility(characterObj)
    let wolfCatchCheck = randomizeAgility(wolfObj)
    if (charRunCheck > wolfCatchCheck) {
        positiveDisplayArea.innerHTML = `You successfully ran away, <br> wolf rolled ${wolfCatchCheck} and character rolled ${charRunCheck}`
        creaturesCard.style.visibility = 'hidden'
        forestBtn.style.visibility = 'visible'
        fightBtn.style.visibility = 'visible'
    }
    else {
        negativeDisplayArea.innerHTML = `you did not run away, <br> wolf rolled ${wolfCatchCheck} and character rolled ${charRunCheck}`
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
     return randSwing;
 }

 function randomizeAgility(obj){
     let randDodge = Math.floor(Math.random() * obj.stats.Agility) + 1
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
    renderHealthBar()
}


function init(){
    fightBtn.style.visibility = 'hidden'
    forestBtn.style.visibility = 'hidden'
    renderStats()
}

init()