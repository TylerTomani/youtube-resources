export function popScriptWindow(){
    // I need to figure strict out
    // 'use strict' 
    const scriptsContainer = document.querySelector("#scriptsContainer")
    const xExitContainer = document.querySelector("#xExitContainer")
    const mainCode = document.querySelector('#mainCode')
    const xBtn = document.querySelector('#xBtn')
    const mainCodeInject = document.querySelector('#mainCodeInject')    
    const popUp = document.querySelector('.popup')
    const keys = {
        meta : {
            pressed : false
        },
        shift : {
            pressed : false
        }
    }
    addEventListener('keyup', e =>{
        let letter = e.key.toLowerCase()
        if(letter == 'shift'){
            keys.shift.pressed = false   
        }
        if(letter == 'meta'){
            keys.meta.pressed = false   
        }
    })   
    function togglePopUp(letter, e){
        console.log(keys.shift.pressed)
        scriptsContainer.classList.toggle('popped-up')
        scriptsContainer.focus()
        
        // if(scriptsContainer.classList.contains('popped-up')){
        //     xExitContainer.classList.remove('display-none')
        // } else {
        //     // xExitContainer.classList.add('display-none')
        // }
        scrollTo(0, 0)       
    }
 
    addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if (letter == 'p') {
            mainCode.focus()
            togglePopUp()
        }
    })
    xBtn.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if (letter == 'enter') {
            togglePopUp()
        }
    })
    function togglePopUp(){
        console.log('pop')
        scriptsContainer.classList.toggle('popUp')       
        scrollTo(0,0)
    }
}