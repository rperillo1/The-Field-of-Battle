/*----- cached element references -----*/
let buyMinorHealthPotion = document.querySelector('#healthPotion')
let buyGreaterHealthPotion = document.querySelector('#greaterHealthPotion')
let buyStrengthPotion = document.querySelector('#potionOfHillGiantStrength')
let buyAgilityPotion = document.querySelector('#potionOfFelineSwiftness')

let coinDisplay = document.querySelector('#coin-total')
coinDisplay.innerHTML = characterObj.inventory.coin


/*----- event listeners -----*/
buyMinorHealthPotion.addEventListener("click", handlePurchase)
buyGreaterHealthPotion.addEventListener("click", handlePurchase)
buyStrengthPotion.addEventListener("click", handlePurchase)
buyAgilityPotion.addEventListener("click", handlePurchase)


/*----- functions -----*/
function handlePurchase(e){
    console.log(e.target.id)
    // if (characterObj.inventory.coin >= characterObj.inventory.potions.) {
    //     characterObj.inventory.coin -= 200;
    // }
    // characterObj.inventory.potions.healthPotion += 1
    // console.log(characterObj.inventory.coin)
    // console.log(characterObj.inventory.potions.healthPotion)
}
