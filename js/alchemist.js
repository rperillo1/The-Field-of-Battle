/*----- cached element references -----*/
let buyMinorHealthPotion = document.querySelector('#healthPotion')
let buyGreaterHealthPotion = document.querySelector('#greaterHealthPotion')
let buyStrengthPotion = document.querySelector('#potionOfHillGiantStrength')
let buyAgilityPotion = document.querySelector('#potionOfFelineSwiftness')

let coinDisplay = document.querySelector('#coin-total')
let coinCost = document.querySelector('.coin')

/*----- event listeners -----*/
buyMinorHealthPotion.addEventListener("click", handlePurchase)
buyGreaterHealthPotion.addEventListener("click", handlePurchase)
buyStrengthPotion.addEventListener("click", handlePurchase)
buyAgilityPotion.addEventListener("click", handlePurchase)


/*----- functions -----*/
function handlePurchase(e){
    let target = e.target.id;
    if (characterObj.inventory.coin >= characterObj.inventory.potions[target].cost) {
        characterObj.inventory.coin -= characterObj.inventory.potions[target].cost;
        characterObj.inventory.potions[target].owned += 1
        coinDisplay.innerHTML = characterObj.inventory.coin
    }
    else {
        coinDisplay.style.backgroundColor = "red"
    }
    localStorage.setItem(CHARACTER_OBJ_KEY, JSON.stringify(characterObj));
}

function init(){
    coinDisplay.innerHTML = characterObj.inventory.coin
    localStorage.getItem(CHARACTER_OBJ_KEY, JSON.stringify(characterObj))
}

init()