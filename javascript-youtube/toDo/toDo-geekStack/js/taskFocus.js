import { tasks } from "./addTask.js";
// let taskFocused = false
const boxes = document.querySelectorAll('.checkbox, .xbox')
tasks.forEach( el => {
    el.addEventListener('keydown', e =>{
        let letter = e.key.toLowerCase()
        if(letter == 'enter'){
            handleTasks(e) 
        }
        
    })
    el.addEventListener('click', e =>{
        e.preventDefault()

    })
    el.addEventListener('focus', e => {
        removeBoxesTabs()

    })
    
})

function handleTasks(e){
    const el = e.target
    const checkbox = el.querySelector('.checkbox')
    const xbox = el.querySelector('.xbox')
    if(xbox){
        addTabs(xbox)
        addTabs(checkbox)
        
    }
    addTabs(checkbox)


}

function addTabs(el){
    el.setAttribute('tabindex','0')
    console.log(el)
}
function removeBoxesTabs(){
    boxes.forEach(el => {

        el.removeAttribute('tabindex')
    })
}