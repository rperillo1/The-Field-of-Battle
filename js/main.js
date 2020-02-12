/*----- constants -----*/
// const beepAudio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3');
const CHARACTER_OBJ_KEY = 'characterObj';


/*----- app's state (variables) -----*/
const characterState = {
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
        Agility: characterState.Agility,
        MaxHealth: characterState.Health,
    },
    inventory: {
        potions: {
            healthPotion: 0,
            greaterHealthPotion: 0,
            potionOfHillGiantStrength: 0,
            PotionofFelineSwiftness: 0
        },
        weapons: [],
        coin: 5000
    }

}


//character creation form & character aside
let radioStr = document.querySelector('#radio-strong')
let radioAgi = document.querySelector('#radio-fast')
let charSubmit = document.querySelector('#char-submit')
let charName = document.querySelector('#char-name')
let charHealth = document.querySelector('#char-health')
let charStrength = document.querySelector('#char-strength')
let charAgility = document.querySelector('#char-agility')

//navigations buttons
let adventureButton = document.querySelector('#adventure')


/*----- event listeners -----*/
charSubmit.addEventListener('click', CreateChar)



/*----- functions -----*/
function CreateChar(e){
    if (document.querySelector('input[name="choice"]:checked')) {
        renderStats()
        characterInfo = document.querySelector('#char-input').value
        charName.textContent = characterInfo
        //creating local storage variables 
        localStorage.clear()
        localStorage.setItem('charName', characterInfo)
        localStorage.setItem(CHARACTER_OBJ_KEY, JSON.stringify(characterObj));
    
        //disabling create character button
        charSubmit.disabled = true;
        //fading out character creation form 
        setTimeout(function(){
            $('.create-char').css({opacity: 1.0, visibility: "hidden"}).animate({opacity: 0.0});
        },700);
        //fading in adventure button
        setTimeout(function(){
            $('#adventure').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
        },600);
    }
}


function generateStats(){
    if (characterObj.stats.Health === 0) {
        generateHealth()
    }
    if (characterObj.stats.Strength === 0) {
        generateStr()
    }
    if (characterObj.stats.Agility === 0) {
        generateAgi()
    }
}


function generateHealth(){
    let min = 50, max = 100
    characterState.Health = Math.floor(Math.random() * (max - min + 1) + min)
}

function generateStr(){
    let min = 20, max = 50
    characterState.Strength = Math.floor(Math.random() * (max - min + 1) + min)
}

function generateAgi(){
    let min = 20, max = 50
    characterState.Agility = Math.floor(Math.random() * (max - min + 1) + min)
}

function addModifier(){
    if (radioStr.checked) {
        characterState.Strength += 5;
    }
    if (radioAgi.checked) {
        characterState.Agility += 5;
    }
}

function renderStats(){
    generateStats()
    addModifier()
    characterObj.stats.Health = characterState.Health
    characterObj.stats.Strength = characterState.Strength
    characterObj.stats.Agility = characterState.Agility
    characterObj.stats.MaxHealth = characterState.Health
    charHealth.textContent = characterState.Health
    charStrength.textContent = characterState.Strength
    charAgility.textContent = characterState.Agility
}


function init(){
    adventureButton.style.visibility = 'hidden'
    renderHealthBar()
}

init()
