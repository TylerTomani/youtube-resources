export const inputBox = document.querySelector('#input-box')
export let idEls = document.querySelectorAll('[id]')
// const inputBox = document.querySelector('#input-box')
const taskContainer = document.querySelector('#task-container')
const addBtn = document.querySelector('#addBtn')
export let tasks = document.querySelectorAll('.tasks-container > li')
function addTask(){
    if(inputBox.value == ''){
        alert('Write something')
    } else {
        const li = document.createElement('li')
        li.innerHTML= `<span class="checkbox">o</span>${inputBox.value}<span class="xbox">x</span>`
        console.log(li)
        const id = toCamelCase(inputBox.value)
        console.log(id)
        li.setAttribute('tabindex', '0')
        li.id = id
        taskContainer.appendChild(li)
        idEls = document.querySelectorAll('[id]')
    }
}
addBtn.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'enter'){
        addTask()
    }
})

 function toCamelCase(str) {
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
}