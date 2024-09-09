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
        if(keys.shift.pressed){
            keys.shift.pressed = false

        }
    })
    xBtn.addEventListener('keydown', e => {
        togglePopUp()
    })
    addEventListener('keydown', e =>{
        let letter = e.key.toLowerCase()
        if(letter == 'shift'){
            keys.shift.pressed  = true
        }
        if(letter == 'p'){
            const mainCode = document.getElementById('mainCode')
            mainCode.focus()
        }
        if(letter == 'p' && keys.shift.pressed ){

            togglePopUp(letter)
        }
    })

    function togglePopUp(letter){
        scriptsContainer.focus()
        if(scriptsContainer.classList.contains('popup')){
            scriptsContainer.classList.remove('popup')
            // xExitContainer.classList.remove('popup')
        } else {
            scriptsContainer.classList.add('popup')
        }
    }

}