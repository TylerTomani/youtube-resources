export const inputBox = document.querySelector('#input-box')
export let idEls = document.querySelectorAll('[id]')
export const taskContainer = document.querySelector('.task-container')
export let tasks = taskContainer.querySelectorAll('li')
const addBtn = document.querySelector('#addBtn')
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
        idEls = document.querySelectorAll('[id]')
        tasks = taskContainer.querySelectorAll('li')
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