/*----- cached element references -----*/
let buyMinorHealthPotion = document.querySelector('#minor-health')
let buyGreaterHealthPotion = document.querySelector('#greater-health')
let buyStrengthPotion = document.querySelector('#hill-giant')
let buyAgilityPotion = document.querySelector('#feline-swiftness')



/*----- event listeners -----*/
buyMinorHealthPotion.addEventListener("click", purchaseMinorHealthPotion)
buyGreaterHealthPotion.addEventListener("click", purchaseGreaterHealthPotion)
buyStrengthPotion.addEventListener("click", purchaseStrengthPotion)
buyAgilityPotion.addEventListener("click", purchaseAgilityPotion)


/*----- functions -----*/
function purchaseMinorHealthPotion(){
    if (characterObj.inventory.coin >= 200) {
        characterObj.inventory.coin -= 200;
    }
    characterObj.inventory.potions.healthPotion += 1
    console.log(characterObj.inventory.coin)
    console.log(characterObj.inventory.potions.healthPotion)
}

function purchaseGreaterHealthPotion(){
    if (characterObj.inventory.coin >= 400) {
        characterObj.inventory.coin -= 400;
    }
    characterObj.inventory.potions.greaterHealthPotion += 1
    console.log(characterObj.inventory.coin)
}

function purchaseStrengthPotion(){
    if (characterObj.inventory.coin >= 100) {
        characterObj.inventory.coin -= 100;
    }
    characterObj.inventory.potions.potionOfHillGiantStrength += 1
    console.log(characterObj.inventory.coin)
}

function purchaseAgilityPotion(){
    if (characterObj.inventory.coin >= 100) {
        characterObj.inventory.coin -= 100;
    }
    characterObj.inventory.potions.PotionofFelineSwiftness += 1
    console.log(characterObj.inventory.coin)
}