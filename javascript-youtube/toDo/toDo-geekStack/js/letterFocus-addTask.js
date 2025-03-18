import { idEls } from "./addTask.js";
import { inputBox } from "./addTask.js";
let inputBoxFocused = false
let tasks = document.querySelectorAll('#task-container > li')
let tasksFocused = false

let letteredArr = []
let currentLetter = ''
let iLetter = 0
inputBox.addEventListener('focus', e => {
    inputBoxFocused = true
})
inputBox.addEventListener('focusout', e => {
    inputBoxFocused = false
})
addEventListener('keydown', e  => {
    let letter = e.key.toLowerCase()

    if(inputBoxFocused){
       return  
    } else {
        if(letter == 'i'){
            e.preventDefault()
        }

        letteredArr = []
        idEls.forEach(el => {            
            if(letter == el.id[0]){
                letteredArr.push(el)
                console.log(letteredArr)
                el.focus()
            }
        })
        if(letteredArr[iLetter])[
            letteredArr[iLetter].focus()
        ]
        currentLetter = letter
    }

});

if(tasks){
    tasks.forEach(el => {
        el.addEventListener('focus', e => {tasksFocused = true})
    })
}
// This page has really good letter focus cycle
if (letter == 'c' && !e.metaKey) {
    if (!e.shiftKey) {
        copyCodes[iCopyCodes].focus()
        iCopyCodes = (iCopyCodes + 1) % copyCodes.length

    } else {
        iCopyCodes = (iCopyCodes - 1 + copyCodes.length) % copyCodes.length

    }
    copyCodes[iCopyCodes].focus()
    console.log(iLetter)
}