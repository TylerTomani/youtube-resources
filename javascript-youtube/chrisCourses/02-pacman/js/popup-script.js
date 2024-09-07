export function popScriptWindow(){


    // I need to figure strict out
    // 'use strict' 
    const scriptsContainer = document.querySelector("#scriptsContainer")
    const xExitContainer = document.querySelector("#xExitContainer")
    const xBtn = document.querySelector('#xBtn')
    const keys = {
        shift : {
            pressed : false
        }
    }
    addEventListener('keyup', e =>{
        keys.shift.pressed = true
    })
    addEventListener('keydown', e =>{
        let letter = e.key.toLowerCase()
        if(letter == 'shift'){
            keys.shift.pressed  = true
        }
        
        
        if(keys.shift.pressed && letter == 'p'){
            togglePopUp()
        }
        
    })
    xBtn.addEventListener('keydown', e => {
        togglePopUp()
    })
    xBtn.addEventListener('click', e => {
        e.preventDefault()
        togglePopUp()
    })

    function togglePopUp(){
        scriptsContainer.classList.toggle('popped-up')
        scriptsContainer.focus()
        if(scriptsContainer.classList.contains('popped-up')){
            xExitContainer.classList.remove('display-none')
        } else {
            xExitContainer.classList.add('display-none')
        }
        scrollTo(0, 0)

        
    }

}