/*----- constants -----*/
const snakeSound = new Audio('audio/SFX/snake_1.mp3');
const swordSound_1 = new Audio('audio/SFX/Sword_1.mp3')


/*----- app's state (variables) -----*/
const snakeState = {
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
let mountainsBtn = document.querySelector('#mountains')
let townBtn = document.querySelector('#town')
let creaturesCard = document.querySelector('.creatureStats')
let combatCard = document.querySelector('.combat-card')
let potionCard = document.querySelector('.potion-card')
let snakeHealth = document.querySelector('#creature-health')
let snakeStrength = document.querySelector('#creature-strength')
let snakeAgility = document.querySelector('#creature-agility')


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


const snakeObj = {
    stats: {
        Health: snakeState.Health,
        Strength: snakeState.Strength,
        Agility: snakeState.Agility,
        MaxHealth: null
    },
    loot: {
        coin: snakeState.Coin
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
    if (snakeObj.stats.Health < 0) {
        positiveDisplayArea.innerHTML = 'You beat the snake! <br> Move to the mountains!'
        negativeDisplayArea.textContent = `You looted ${snakeObj.loot.coin} coins from its corpse!`
        disableButtons()
        mountainsBtn.style.visibility = 'visible'
        potionCard.style.visibility = 'hidden'
        fightBtn.style.visibility = 'visible'
        townBtn.style.visibility = 'visible'
        characterObj.inventory.coin += snakeObj.loot.coin
    }
    else if (characterObj.stats.Health < 0) {
        alert("game over, you died")
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


function randomizeSnakeCoinLoot(){
    let min = 25, max = 100
    let randCoin = Math.floor(Math.random() * (max - min + 1) + min)
    snakeState.Coin = randCoin;
}


//combat buttons functionality
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
    characterObj.stats.Strength -= strModifier;
    characterObj.stats.Strength -= potionStrModifier;
    characterObj.stats.Agility -= potionAgiModifier;
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
    let snakeMissCheck = randomizeAgility(snakeObj)
    if (charSwingCheck > snakeMissCheck) {
        swordSound_1.play()
        snakeState.Health -= 10;
        positiveDisplayArea.innerHTML = `You hit the snake! <br> You rolled ${charSwingCheck} and the creature rolled ${snakeMissCheck}`
    }
    else {
        positiveDisplayArea.innerHTML = `You miss! <br> You rolled ${charSwingCheck} and the creature rolled ${snakeMissCheck}`
    }
}


function creatureSwing(){
   let snakeSwingCheck = randomizeStrength(snakeObj)
   let charMissCheck = randomizeAgility(characterObj)
   if (snakeSwingCheck > charMissCheck) {
       snakeSound.play()
       characterObj.stats.Health -= 10;
       negativeDisplayArea.innerHTML = `Creature hit you! <br> It rolled ${snakeSwingCheck} and you rolled ${charMissCheck}`
   }
   else {
       negativeDisplayArea.innerHTML = `Creature misses you! <br> It rolled ${snakeSwingCheck} and you rolled ${charMissCheck}`
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
        dodgeBtn.disabled = true;
    }
    else {
        negativeDisplayArea.innerHTML = 'You did not dodge the creatures swing. <br> Creature swings at you!'
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
    snakeObj.stats.Agility += 50;
    let charRunCheck = randomizeAgility(characterObj)
    let snakeCatchCheck = randomizeAgility(snakeObj)
    if (charRunCheck > snakeCatchCheck) {
        positiveDisplayArea.innerHTML = `You successfully ran away, <br> snake rolled ${snakeCatchCheck} and character rolled ${charRunCheck}`
        creaturesCard.style.visibility = 'hidden'
        townBtn.style.visibility = 'visible'
        fightBtn.style.visibility = 'visible'
    }
    else {
        positiveDisplayArea.innerHTML = `you did not run away, <br> snake rolled ${snakeCatchCheck} and character rolled ${charRunCheck}`
        disableButtons()
        setTimeout(function(){
            creatureSwing()
            renderStats()
            isDead()
            undisableButtons()
        },900);
    }
    characterObj.stats.Agility -= potionAgiModifier;
    snakeObj.stats.Agility -= 50;
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
    potionCard.style.visibility = 'hidden'
    renderStats()
    randomizeSnakeCoinLoot()
    snakeObj.loot.coin = snakeState.Coin
}

init()