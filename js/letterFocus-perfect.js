import { idEls, inputBox } from "./addTask.js";

let inputBoxFocused = false;
let lastPressedLetter = "";
let iLetter = 0;
let currentIndex = -1;

// Convert NodeList to Array for filtering and indexing
let idElsArr = Array.from(idEls);
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

    if (letteredArr.length === 0) return; // No matching elements, exit

    let focusedEl = document.activeElement;
    let focusedIndex = idElsArr.indexOf(focusedEl);

    // If pressing a different letter, find the closest match below
    if (lastPressedLetter !== letter) {
        let closestIndex = letteredArr.findIndex(el => idElsArr.indexOf(el) > focusedIndex);
        iLetter = closestIndex !== -1 ? closestIndex : 0; // If none found below, start from first
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
});
