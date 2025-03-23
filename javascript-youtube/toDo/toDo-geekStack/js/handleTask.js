import { taskContainer } from "./addTask.js";
import { updateIdElsArr } from "./letterFocus-addTask.js";
export const addBtn = document.querySelector('#addBtn')
let tasks
export function updateTasks() {
    return document.querySelectorAll(".task-container > li"); // Always get latest tasks
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

    const xboxes = document.querySelectorAll(".xbox");
    xboxes.forEach(xbox => {
        xbox.removeEventListener("click", deleteTask);
        xbox.addEventListener("click", deleteTask);
    });
    xboxes.forEach(xbox => {
        xbox.removeEventListener("keydown", deleteTaskKeydown);
        xbox.addEventListener("keydown", deleteTaskKeydown);
    });
}

// Ensure event listeners attach after new task is added
addBtn.addEventListener("click", () => {
    setTimeout(() => {
        attachTaskEvents();
        updateIdElsArr();
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
        addBoxes(e.target);
    }
}

function handleClick(e) {
    e.preventDefault();
    updateIdElsArr();
    addBoxes(e.target);
}

function handleFocus() {
    removeBoxesTabs();
}

function addBoxes(task) {
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
            // task.remove();
            let iTask = [...tasks].indexOf(task)
            task.remove(task)
            tasks.splice(iTask,1)
            setTimeout(() => {
                // attachTaskEvents(); // Reattach event listeners after deletion
                updateIdElsArr();
                updateTasks()
                tasks.forEach(el => console.log(el))
            }, 50);
        }
    }
}

// Initial setup
attachTaskEvents();
