import { sideBarBtn } from "./toggle-sidebar.js"
const idEls = document.querySelectorAll('[id]')
export const parts = document.querySelectorAll('.side-bar ul > li > a')
const tutorialLink = document.querySelector('#tutorialLink')
const main = document.querySelector('main')
let currentLetter
let letterIds = []
let iLetterIdIndex = 0
let lastPart 
let partsFocused = false

const keys = {
    shift : {
        pressed: false
    }
}
addEventListener('keyup', e => {
    let letter = e.key.toLowerCase() 
    if(letter == 'shift' ){
        keys.shift.pressed = false
        
    }
})
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase() 
    if(letter == 'shift' ){keys.shift.pressed = true}
    if(letter == 't'){
        tutorialLink.focus()
    }
    if(letter == 'm'){
        main.focus()
        scrollTo(0,0)
    }
    if(letter == 't'){
        tutorialLink.focus()
    }
    if (letter == 'a' && !partsFocused && lastPart){
        lastPart.focus()
    }
    if (!isNaN(letter)){

    }
    if(letter != currentLetter){
        letterIds = []
        idEls.forEach(el => {
            if(el.id[0] == letter){
                letterIds.push(el)
            }
        })
        if(letterIds.length > 0){
            letterIds[0].focus()
        }
    } 
    if(letter == currentLetter && keys.shift.pressed){
        if(letterIds.length > 0){
            iLetterIdIndex = (iLetterIdIndex - 1 + letterIds.length) % letterIds.length
            letterIds[iLetterIdIndex].focus()
        }
    } else if(letter == currentLetter && !keys.shift.pressed){
        if(letterIds.length > 0){
            iLetterIdIndex = (iLetterIdIndex + 1) % letterIds.length
            letterIds[iLetterIdIndex].focus()
        }
    }     
    
    currentLetter = letter
})
parts.forEach(el => {
    if (el.hasAttribute('autofocus')) {
        // lastPart = el
    }
    el.addEventListener('focus', e => {
        iLetterIdIndex = [...parts].indexOf(e.target)
        partsFocused = true
    })
    el.addEventListener('focusout', e => {
        // iLetterIdIndex = [...parts].indexOf(e.target)
        partsFocused = false
    })
    el.addEventListener('click', e => {
        if( e.target == lastPart){
            main.focus()
            scrollTo(0,0)
        }
        lastPart = e.target
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase() 
        if(!isNaN(letter)){
            let intLet = parseInt(letter)
            parts[intLet - 1].focus()
        }
        if(letter == 'a' && !keys.shift.pressed ){
            iLetterIdIndex = (iLetterIdIndex + 1) % parts.length
            parts[iLetterIdIndex].focus()
        } else if (keys.shift.pressed &&  letter == 'a'){
            iLetterIdIndex = (iLetterIdIndex + parts.length - 1) % parts.length
            parts[iLetterIdIndex].focus()
        }
    })

})
sideBarBtn.addEventListener('keydown',e => {
    let letter = e.key.toLowerCase() 
    if(!isNaN(letter)){
        let intLet = parseInt(letter)
        parts[intLet - 1].focus()
    }
    if(letter == 'a' ){
        parts[0].focus()
    }
})

main.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'a' && lastPart){
        lastPart.focus()
    }
    if(letter == 'tab'){
        const steps = document.querySelectorAll('.step')
        steps[0].focus()
    }
    
})