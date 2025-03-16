import { idEls } from "./addTask.js";
import { inputBox } from "./addTask.js";
import { tasks } from "./addTask.js";
let inputBoxFocused = false
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
        idEls.forEach(el => {
            
            if(letter == el.id[0] ){
                el.focus()
            }
        })

        if(letter == 't'){
            
            
        }
        
    }

});