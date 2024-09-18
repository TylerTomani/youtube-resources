import { stepTxts } from "./lesson-temp.js"
export function popScriptWindow(){
    // I need to figure strict out
    // 'use strict' 
    const scriptsContainer = document.querySelector("#scriptsContainer")
    const canvas = document.querySelector('#canvas')
    const xExitContainer = document.querySelector("#xExitContainer")
    const xBtn = document.querySelector('#xBtn')
    let mainCode = document.querySelector('#mainCode')
    const keys = {
        shift : {
            pressed : false
        }
    } 
    let stepsFocused = false
    canvas.addEventListener('click', e => {
        hidePopUp()
    })
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
        if(letter == 'p'){
            mainCode.focus()
            // mainCode.scrollIntoView({ behavior: 'smooth', block: 'start' })
            scrollTo(0,0)
            
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
        if(letter == 'f'){
            
            if (scriptsContainer.classList.contains('popup-start')) {
                scriptsContainer.classList.remove('popup-start')
            }
            if(!scriptsContainer.classList.contains('full-screen')){
                scroll(0, 0)
                scriptsContainer.classList.add('full-screen')
                scriptsContainer.style.position = 'absolute'
                scriptsContainer.style.zIndex = '100'
                scriptsContainer.style.width = '100vmax !important'
                
            } else if (scriptsContainer.classList.contains('full-screen')){
                scriptsContainer.classList.remove('full-screen')
                scriptsContainer.style.position = 'relative'
                scriptsContainer.style.zIndex = '50'
                scriptsContainer.style.width = '100%'
            }
            
        } else 
        if(letter == 'p'){
             mainCode = document.getElementById('mainCode')
            // mainCode.focus()
            mainCode.scrollIntoView({behavior: 'smooth',block: 'start',block: 'start'})
        }
        if(letter == 'p' && keys.shift.pressed ){
            
            togglePopUp(letter)
        }
        if(!isNaN(letter)){
            // hidePopUp()
        }
        
    })
    // scriptsContainer.style.position = 'relative'
    scriptsContainer.addEventListener('focus', e => {
        scriptsContainer.zIndex = 100
    })
    scriptsContainer.addEventListener('focusout', e => {
        // scriptsContainer.zIndex = 0
    })
    
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
            scriptsContainer.style.position = 'absolute'
            if(!stepsFocused){
                scrollTo(0,0)
                xBtn.focus()
            }
        }
    }
    function hidePopUp(){
        if(scriptsContainer.classList.contains('popup-start')){
            scriptsContainer.classList.remove('popup-start')
        }
        if(scriptsContainer.classList.contains('popup')){
            scriptsContainer.classList.remove('popup')
            scriptsContainer.style.position = 'relative'
            xBtn.innerText = 'O'
        }
    }
}