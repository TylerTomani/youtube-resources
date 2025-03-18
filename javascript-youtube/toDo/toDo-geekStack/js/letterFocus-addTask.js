import { idEls, inputBox } from "./addTask.js";

let inputBoxFocused = false;
let currentLetter = '';
let iLetter = 0;

// Sort elements in natural DOM order
let idElsArr = Array.from(idEls).sort((a, b) => a.compareDocumentPosition(b) & 2 ? 1 : -1);

// Track input focus
inputBox.addEventListener('focus', () => inputBoxFocused = true);
inputBox.addEventListener('blur', () => inputBoxFocused = false);

// Keydown event listener
document.addEventListener('keydown', (e) => {
    if (inputBoxFocused) return; // Ignore if typing in input box

    let letter = e.key.toLowerCase();
    if (letter === "i") e.preventDefault(); // Prevent unwanted behavior for "i"

    // Filter elements that start with the pressed letter
    let letteredArr = idElsArr.filter(el => el.id.startsWith(letter));

    // Ensure letteredArr has at least one element
    if (letteredArr.length === 0) return;

    // Get the currently focused element
    let focusedEl = document.activeElement;

    // Find the index of the focused element in letteredArr
    let focusedIndex = letteredArr.indexOf(focusedEl);

    if (focusedIndex === -1) {
        // If no focused element, start with the first one in the list
        iLetter = 0;
    } else {
        // If the same letter is pressed, move to the next element down
        iLetter = (focusedIndex + 1) % letteredArr.length;
    }

    // Focus the next element
    letteredArr[iLetter].focus();
    currentLetter = letter;
});
