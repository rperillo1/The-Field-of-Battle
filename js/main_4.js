//constants
const wolfSound = new Audio('audio/SFX/growl_1.mp3');
const swordSound_2 = new Audio('audio/SFX/Sword_2.mp3')

/*----- app's state (variables) -----*/
const wolfState = {
    Health: 0,
    Strength: 0,
    Agility: 0,
    Coin: 0
}

let strModifier = 0;
let potionStrModifier = 0;
let potionAgiModifier = 0;


/*----- cached element references -----*/
let fightBtn = document.querySelector('#fight')
let forestBtn = document.querySelector('#forest')
let mountainsBtn = document.querySelector('#mountains')
let creaturesCard = document.querySelector('.creatureStats2')
let combatCard = document.querySelector('.combat-card')
let potionCard = document.querySelector('.potion-card')
let wolfHealth = document.querySelector('#creature-health')
let wolfStrength = document.querySelector('#creature-strength')
let wolfAgility = document.querySelector('#creature-agility')

//combat buttons
let swingBtn = document.querySelector("#swing")
let dodgeBtn = document.querySelector('#dodge')
let runBtn = document.querySelector('#run')
let potionsBtn = document.querySelector('#potions')

//potions
let minorHealthPotion = document.querySelector('#health-potion')
let greaterHealthPotion = document.querySelector('#greater-health-potion')
let strengthPotion = document.querySelector('#strength-potion')
let agilityPotion = document.querySelector('#agility-potion')


const wolfObj = {
    stats: {
        Health: wolfState.Health,
        Strength: wolfState.Strength,
        Agility: wolfState.Agility,
        MaxHealth: null
    },
    loot: {
        coin: wolfState.Coin
    }
}

/*----- event listeners -----*/
fightBtn.addEventListener('click', createBattleCards)
swingBtn.addEventListener('click', swing)
dodgeBtn.addEventListener('click', dodge)
runBtn.addEventListener('click', run)
potionsBtn.addEventListener('click', potionMenu)

minorHealthPotion.addEventListener('click', minorHealthPotionFunc)
greaterHealthPotion.addEventListener('click', greaterHealthPotionFunc)
strengthPotion.addEventListener('click', strengthPotionFunc)
agilityPotion.addEventListener('click', agilityPotionFunc)



/*----- functions -----*/

//check if player or creature is dead
function isDead(){
    if (characterObj.stats.Health < 0) {
        alert("game over, you died")
        disableButtons()
    }
    else if (wolfObj.stats.Health < 0) {
        positiveDisplayArea.innerHTML = 'You beat the wolf! <br> You win the game!'
        negativeDisplayArea.textContent = `You looted ${wolfObj.loot.coin} coins from its corpse!`
        disableButtons()
        characterObj.inventory.coin += wolfObj.loot.coin
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

function randomizeWolfCoinLoot(){
    let min = 25, max = 200
    let randCoin = Math.floor(Math.random() * (max - min + 1) + min)
    wolfState.Coin = randCoin;
}


function swing(){
    disableButtons()
    charSwing()
    renderStats()
    isDead()
    setTimeout(function(){
        positiveDisplayArea.textContent = ''
        negativeDisplayArea.textContent = ''
    }, 1700);
    setTimeout(function(){
        creatureSwing()
        renderStats()
        isDead()
    },1701);
    characterObj.stats.Strength -= potionStrModifier;
    characterObj.stats.Strength -= potionAgiModifier;
    characterObj.stats.Agility -= strModifier;
    strModifier = 0;
    potionStrModifier = 0;
    potionAgiModifier = 0;
    charStrength.style.color = 'black'
    setTimeout(function(){
        undisableButtons()
    }, 2400);
    
}


function charSwing(){
    let charSwingCheck = randomizeStrength(characterObj)
    let wolfMissCheck = randomizeAgility(wolfObj)
    if (charSwingCheck > wolfMissCheck) {
        swordSound_2.play()
        wolfState.Health -= 10;
        positiveDisplayArea.innerHTML = `You hit the wolf! <br> You rolled ${charSwingCheck} and the creature rolled ${wolfMissCheck}`
    }
    else {
        positiveDisplayArea.innerHTML = `You miss the wolf! <br> You rolled ${charSwingCheck} and the creature rolled ${wolfMissCheck}`
    }
}


function creatureSwing(){
   let wolfSwingCheck = randomizeStrength(wolfObj)
   let charMissCheck = randomizeAgility(characterObj)
   if (wolfSwingCheck > charMissCheck) {
       wolfSound.play()
       characterObj.stats.Health -= 10;
       negativeDisplayArea.innerHTML = `Creature hits you! <br> It rolled ${wolfSwingCheck} and you rolled ${charMissCheck}`
   }
   else {
       negativeDisplayArea.innerHTML = `Creature misses you! <br> It rolled ${wolfSwingCheck} and you rolled ${charMissCheck}`
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
        positiveDisplayArea.innerHTML = 'You did not dodge the creatures swing. <br> Creature swings at you!'
        disableButtons()
        setTimeout(function(){
            creatureSwing()
            renderStats()
            isDead()
            undisableButtons()
        },1701);
    }
    renderStats()
    isDead()
    characterObj.stats.Agility -= potionAgiModifier;
    potionAgiModifier = 0;
    charAgility.style.color = 'black'
}


function run(){
    wolfObj.stats.Agility += 50;
    let charRunCheck = randomizeAgility(characterObj)
    let wolfCatchCheck = randomizeAgility(wolfObj)
    if (charRunCheck > wolfCatchCheck) {
        positiveDisplayArea.innerHTML = `You successfully ran away, <br> wolf rolled ${wolfCatchCheck} and character rolled ${charRunCheck}`
        creaturesCard.style.visibility = 'hidden'
        forestBtn.style.visibility = 'visible'
        fightBtn.style.visibility = 'visible'
    }
    else {
        positiveDisplayArea.innerHTML = `you did not run away, <br> wolf rolled ${wolfCatchCheck} and character rolled ${charRunCheck}`
        disableButtons()
        setTimeout(function(){
            creatureSwing()
            renderStats()
            isDead()
            undisableButtons()
        },900);
    }
    characterObj.stats.Agility -= potionAgiModifier;
    wolfObj.stats.Agility -= 50;
    potionAgiModifier = 0;
    charAgility.style.color = 'black'
}


//potion functionality
function minorHealthPotionFunc(){
    if (characterObj.inventory.potions.healthPotion.owned > 0) {
        if (characterObj.stats.MaxHealth - characterObj.stats.Health >= 50) {
            characterObj.stats.Health += 50;
            renderStats()
        }
        else if (characterObj.stats.MaxHealth - characterObj.stats.Health < 50) {
            characterObj.stats.Health += (characterObj.stats.MaxHealth - characterObj.stats.Health)
            renderStats()
        }
    characterObj.inventory.potions.healthPotion.owned -= 1;
    }
    else {
        positiveDisplayArea.textContent = "Sorry, you dont have any potions left of that kind"
    }
}

function greaterHealthPotionFunc(){
    if (characterObj.inventory.potions.greaterHealthPotion.owned > 0) {
        characterObj.stats.Health = characterObj.stats.MaxHealth
        renderStats()
        characterObj.inventory.potions.greaterHealthPotion.owned -= 1;
    }
    else {
        positiveDisplayArea.textContent = "Sorry, you dont have any potions left of that kind"
    }
}

function strengthPotionFunc(){
    if (characterObj.inventory.potions.potionOfHillGiantStrength.owned > 0) {
        potionStrModifier = 30;
        characterObj.stats.Strength += potionStrModifier;
        charStrength.style.color = 'green'
        renderStats()
        characterObj.inventory.potions.potionOfHillGiantStrength.owned -= 1;
    }
    else {
        positiveDisplayArea.textContent = "Sorry, you dont have any potions left of that kind"
    }
}

function agilityPotionFunc(){
    if (characterObj.inventory.potions.potionOfFelineSwiftness.owned > 0) {
        potionAgiModifier = 30;
        characterObj.stats.Agility += potionAgiModifier;
        charAgility.style.color = 'green'
        renderStats()
        characterObj.inventory.potions.potionOfFelineSwiftness.owned -= 1
    }
    else {
        positiveDisplayArea.textContent = "Sorry, you dont have any potions left of that kind"
    }
}

function potionMenu(){
    if (potionCard.style.visibility === 'hidden') {
        potionCard.style.visibility = 'visible'
    }
    else if (potionCard.style.visibility === 'visible') {
        potionCard.style.visibility = 'hidden'
    }
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

function renderHealthBarWolf(){
    let percentHealth = Math.round(wolfObj.stats.Health/wolfObj.stats.MaxHealth * 100)
    let percentString = "width: " + percentHealth + "%"
    healthBarWolf.style = percentString
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

    if (wolfObj.stats.MaxHealth === null) {
        wolfObj.stats.MaxHealth = wolfState.Health
    }

    charHealth.textContent = characterObj.stats.Health
    charStrength.textContent = characterObj.stats.Strength
    charAgility.textContent = characterObj.stats.Agility

    localStorage.setItem(CHARACTER_OBJ_KEY, JSON.stringify(characterObj));
    renderHealthBar()
    renderHealthBarWolf()
}


function init(){
    fightBtn.style.visibility = 'hidden'
    forestBtn.style.visibility = 'hidden'
    potionCard.style.visibility = 'hidden'
    mountainsBtn.style.visibility = 'hidden'
    renderStats()
    randomizeWolfCoinLoot()
}

init()