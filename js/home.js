/*----- cached element references -----*/
let sleepBtn = document.querySelector('#sleep-button')
let loading = document.querySelectorAll('#loading')
// let charHealth = document.querySelector('#char-health')



/*----- event listeners -----*/
sleepBtn.addEventListener('click', restoreHealth)



/*----- functions -----*/
function restoreHealth(){
    fades()
    renderHealth()
}

function renderHealth(){
    characterObj.stats.Health = characterObj.stats.MaxHealth;
    charHealth.textContent = characterObj.stats.MaxHealth
    localStorage.setItem(CHARACTER_OBJ_KEY, JSON.stringify(characterObj));
}

function fades(){
    setTimeout(function(){
        $('#sleep-card').css({opacity: 1.0, visibility: "hidden"}).animate({opacity: 0.0});
    },300);
    $(function(){
        window.setTimeout(fadeImage, 100);
        
        function fadeImage(){
            $('#loading').fadeIn(5000);	
            $('#loading').fadeOut(2000);	
        }
    });  
}
