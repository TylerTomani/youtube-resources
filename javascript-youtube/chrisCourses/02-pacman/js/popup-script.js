import { stepTxts } from "./lesson-temp.js"
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
    let stepsFocused = false
    stepTxts.forEach(el => {
        el.addEventListener('focus', e => {
            stepsFocused = true
        })
        el.addEventListener('foucusout', e => {
            stepsFocused = false
        })
    })
    addEventListener('keyup', e =>{
        if(keys.shift.pressed){
            keys.shift.pressed = false

        }
    })
    xBtn.addEventListener('click', e => {
        e.preventDefault()
        togglePopUp()
        
    })
    xBtn.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if(letter == 'enter'){
            e.preventDefault()
            togglePopUp()
        }
        
    })
    if(scriptsContainer.classList.contains('popup-start')){
        togglePopUp()
    }
    addEventListener('keydown', e =>{
        let letter = e.key.toLowerCase()
        if(letter == 'shift'){
            keys.shift.pressed  = true
        }
        if(letter == 'p'){
            const mainCode = document.getElementById('mainCode')
            mainCode.focus()
            // mainCode.scrollIntoView({behavior: 'smooth',block: 'start'})
        }
        if(letter == 'p' && keys.shift.pressed ){

            togglePopUp(letter)
        }
    })
    // scriptsContainer.style.position = 'relative'
    function togglePopUp(letter){
        
        if(scriptsContainer.classList.contains('popup-start')){
            scriptsContainer.classList.remove('popup-start')
        }
        if(scriptsContainer.classList.contains('popup')){
            scriptsContainer.classList.remove('popup')
            scriptsContainer.style.position = 'relative'
            xBtn.innerText = 'O'
        } else {
            scriptsContainer.classList.add('popup')
            xBtn.innerText = 'x'
            console.log(xBtn)
            scriptsContainer.style.position = 'absolute'
            if(!stepsFocused){
                scrollTo(0,0)
                xBtn.focus()
            }
        }
    }

}