import { taskContainer } from "./addTask.js";
import { updateIdElsArr } from "./letterFocus-addTask.js";
export const addBtn = document.querySelector('#addBtn')

let tasks,checkboxes,xboxes
export function updateTasks() {
    return document.querySelectorAll(".task-container > li"); // Always get latest tasks
}
export function updateCheckboxes() {
    return document.querySelectorAll(".task-container > li .checkbox"); // Always get latest tasks
}
export function updateXboxes() {
    return document.querySelectorAll(".task-container > li .xbox"); // Always get latest tasks
}
function attachTaskEvents() {
    tasks = Array.from(updateTasks()); // Refresh tasks list
    tasks.forEach(task => {
        task.removeEventListener("keydown", handleKeyDown);
        task.addEventListener("keydown", handleKeyDown);

        task.removeEventListener("click", handleClick);
        task.addEventListener("click", handleClick);

        task.removeEventListener("focus", handleFocus);
        task.addEventListener("focus", handleFocus);
    });

    const xboxes = updateXboxes();
    xboxes.forEach(xbox => {
        xbox.removeEventListener("click", deleteTask);
        xbox.addEventListener("click", deleteTask);
    });
    xboxes.forEach(xbox => {
        xbox.removeEventListener("keydown", deleteTaskKeydown);
        xbox.addEventListener("keydown", e => {
            let letter = e.key.toLowerCase()
            boxFocus(letter, e)
        });
    });
    const checkboxes = updateCheckboxes()
    checkboxes.forEach(checkbox => {
        // checkbox.removeEventListener("mousedown", toggleCheckbox(e));
        checkbox.addEventListener("mousedown", e => {
            // e.preventDefault()
            toggleCheckboxClick(e)
        });
        checkbox.removeEventListener("keydown", deleteTaskKeydown);
        checkbox.addEventListener("keydown", e => {
            let letter = e.key.toLowerCase()
            if(letter == 'enter'){   
                e.preventDefault()
                boxFocus(letter, e)
                toggleCheckbox(e)
            }
        });
    });
    
}

// Ensure event listeners attach after new task is added
addBtn.addEventListener("click", () => {
    setTimeout(() => {
        attachTaskEvents();
        updateIdElsArr();
        // updateTasks()
        // updateXboxes()
        // updateCheckboxes()
    }, 50); // Small delay to ensure DOM updates
});

addBtn.addEventListener("keydown", e => {
    if (e.key.toLowerCase() === "enter") {
        e.preventDefault();
        setTimeout(() => {
            attachTaskEvents();
            updateIdElsArr();
        }, 50);
    }
});
function handleKeyDown(e) {
    if (e.key.toLowerCase() === "enter") {
        e.preventDefault();
        attachTaskEvents()
        addTabindexBoxes(e.target);
    }
}
function handleClick(e) {
    e.preventDefault();
    updateIdElsArr();
    addTabindexBoxes(e.target);
}
function handleFocus() {
    removeBoxesTabs();
}
function addTabindexBoxes(task) {
    const checkbox = task.querySelector(".checkbox");
    const xbox = task.querySelector(".xbox");

    if (checkbox) checkbox.setAttribute("tabindex", "0");
    if (xbox) xbox.setAttribute("tabindex", "0");
}

function removeBoxesTabs() {
    document.querySelectorAll(".checkbox, .xbox").forEach(el => {
        el.removeAttribute("tabindex");
    });
}

function deleteTask(e) {
    const task = e.target.closest("li");
    if (task) {
        task.remove();
        setTimeout(() => {
            attachTaskEvents(); // Reattach event listeners after deletion
            updateIdElsArr();
        }, 50);
    }
}
function deleteTaskKeydown(e) {
    const task = e.target.closest("li");
    let letter = e.key.toLowerCase()
    // console.log(e.target)
    tasks = Array.from(updateTasks())
    if(letter == 'enter'){                
        if (task) {
            let iTask = [...tasks].indexOf(task)
            task.remove(task)
            tasks.splice(iTask,1)
            setTimeout(() => {
                // attachTaskEvents(); // Reattach event listeners after deletion
                updateIdElsArr();
                updateTasks()
                
            }, 50);
        }
    }
}
function boxFocus(letter,e){
    if(e.target.classList.contains('checkbox') && letter == 'x'){
        const xbox = e.target.parentElement.querySelector('.xbox')
        xbox.setAttribute('tabindex','1')
        xbox.focus()
        
    }
    if(e.target.classList.contains('xbox') && letter == 'c'){
        const checkbox = e.target.parentElement.querySelector('.checkbox')
        checkbox.setAttribute('tabindex','1')
        checkbox.focus()
        
    }
}
function toggleCheckbox(e){
        const task = e.target.parentElement
        let letter = e.key.toLowerCase()
        if(letter == 'enter'){
            task.classList.toggle('checked')
            
        }
}
function toggleCheckboxClick(e){
    const task = e.target.parentElement
    task.classList.toggle('checked')
        
}
// Initial setup
attachTaskEvents();