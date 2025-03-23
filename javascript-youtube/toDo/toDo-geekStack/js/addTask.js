import { inputBox } from "./letterFocus-addTask.js";
export let idEls = document.querySelectorAll('[id]')
export const taskContainer = document.querySelector('.task-container')
export let tasks = taskContainer.querySelectorAll('li')

import { updateIdElsArr } from "./letterFocus-addTask.js";  // Import the function

import { addBtn } from "./handleTask.js";
function addTask(){
    if(inputBox.value == ''){
        alert('Write something')
    } else {
        const li = document.createElement('li')
        li.innerHTML= `<span class="checkbox">o</span>${inputBox.value}<span class="xbox">x</span>`
        const id = toCamelCase(inputBox.value)
        li.setAttribute('tabindex', '0')
        li.id = id
        taskContainer.appendChild(li)
        // console.log(idEls)
        idEls = document.querySelectorAll('[id]')
        tasks = taskContainer.querySelectorAll('li')
        updateIdElsArr()
    }
}
addBtn.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'enter'){
        e.preventDefault()
        addTask()
    }
})
addBtn.addEventListener('click', e =>{
    e.preventDefault()   
    addTask()
})


 function toCamelCase(str) {
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
}