export const inputBox = document.querySelector('#input-box')
import { tasks } from "./addTask.js";
import { updateTasks } from "./handleTask.js";
let inputBoxFocused = false;
let todoAppFocused = false;
let lastPressedLetter = "";
let iLetter = 0;
let currentIndex = -1;
let idElsArr = []; // Initialize an empty array
let tasksArr = updateTasks()
let taskFocused = false
// Select the todo app container
const todoApp = document.querySelector('.todo-app');
todoApp.addEventListener('focusin', () => { todoAppFocused = true; });
todoApp.addEventListener('focusout', () => { todoAppFocused = false; });
// Function to update idElsArr dynamically
export function updateIdElsArr() {
    idElsArr = Array.from(document.querySelectorAll('[id]')); // Refresh the array
}
updateIdElsArr();
tasksArr.forEach(el => {
    el.addEventListener('focus', e => {taskFocused = true})
    el.addEventListener('focusout', e => {taskFocused = false})
})
 
// Track input focus
inputBox.addEventListener("focus", () => (inputBoxFocused = true));
inputBox.addEventListener("blur", () => (inputBoxFocused = false));
// Keydown event listener
document.addEventListener("keydown", (e) => {
    if (inputBoxFocused) return; // Ignore if typing in input box
    let letter = e.key.toLowerCase();
    if (letter === "i") e.preventDefault(); // Prevent unwanted behavior for "i"
    // Filter elements that start with the pressed letter    
    let letteredArr = idElsArr.filter((el) => el.id.toLowerCase().startsWith(letter));
    if (letteredArr.length === 0 ) {
        if (!isNaN(letter)) {
            taskNumFocus(letter)
        } 
        else if (taskFocused) {
            if (letter == 'c' || letter == 'x') {
                e.preventDefault()
                focusToBoxes(letter, e.target)
            }
        } else {
            
            return
        }
    } // No matching elements, exit
    else {        
        let focusedEl = document.activeElement;
        let focusedIndex = idElsArr.indexOf(focusedEl);
        // console.log(iLetter, letteredArr[iLetter])
        // If pressing a different letter, find the closest match below
        if (lastPressedLetter !== letter) {
            let closestIndex = letteredArr.findIndex(el => idElsArr.indexOf(el) > focusedIndex);
            iLetter = closestIndex !== -1 ? closestIndex : 0; // If none found below,
            //  start from first
        } else {
            // If pressing the same letter, cycle forward
            iLetter = (letteredArr.indexOf(focusedEl) + 1) % letteredArr.length;
        }
        // Handle Shift + Letter for backwards cycling
        if (e.shiftKey) {
            iLetter = (letteredArr.indexOf(focusedEl) - 1 + letteredArr.length) % letteredArr.length;
        }
        // Focus the selected element
        letteredArr[iLetter].focus();  
        lastPressedLetter = letter;
        
    }
});
function focusToBoxes(letter,el){
    if(letter == 'c'){
        const checkbox = el.querySelector('.checkbox')
        checkbox.setAttribute('tabindex','1')
        checkbox.focus()
    }
    if(letter == 'x'){
        const xbox = el.querySelector('.xbox')
        xbox.setAttribute('tabindex','1')
        xbox.focus()
    }
}
function taskNumFocus(letter){
    const intLetter = parseInt(letter)
    const tasks = updateTasks()
    if(intLetter <= tasks.length){
        tasks[intLetter - 1].focus()
    } else {
        tasks[tasks.length - 1].focus()
    }
}
