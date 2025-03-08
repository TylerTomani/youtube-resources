export let mainTargetDivFocused = false;
export const sideBarBtn = document.getElementById('sideBarBtn');
// import {executeCodeExample} from './execute-codeExample.js'

import { stepTextAreasCodeFocused } from './step-focus-codeColor.js';
import { stepTextAreasCodeFocus } from './step-focus-codeColor.js';
import { stepTxtsFocus } from './stepTxts-codeColor.js';

import { addCopyCodes } from '../../../js/copy-code.js';
document.addEventListener('DOMContentLoaded', () => {
    const aside = document.querySelector('aside');
    let sidebarLinks = document.querySelectorAll('aside.side-bar ul > li > a');
    const mainTargetDiv = document.querySelector('#mainTargetDiv');
    let currentLinkIndex = 0;
    let lastFocusedLink = null;
    let lastClickedLink = null 
    let sidebarLinksFocused = false;
    
    sidebarLinks = [...sidebarLinks]    
    aside.addEventListener('click', e => {
        if(e.target == aside){
            toggleSidebar()
        }
    }
    )
    // Track focus state of the sidebar
    sidebarLinks.forEach((el, i, arr) => {        
        el.addEventListener('focusin', e => {
            sidebarLinksFocused = true;
            currentLinkIndex = arr.indexOf(el)
            
        });
        el.addEventListener('focusout', () => {
            sidebarLinksFocused = false;
            lastFocusedLink = ''
        });
        el.addEventListener('keydown', (e) => {
            let letter = e.key.toLowerCase()
            if(letter == 'enter'){
                lastClickedLink = e.target
                injectContent(e);   
            }
        });
    })
    mainTargetDiv.addEventListener('focusin', () => {mainTargetDivFocused = true;});
    mainTargetDiv.addEventListener('focusout', () => {mainTargetDivFocused = false;});
    // Toggle sidebar active state
    function toggleSidebar() {
        const sidebar = document.querySelector('aside.side-bar');
        sidebar.classList.toggle('active');
    }
    // Focus on the next or previous link
    /* next if false when shift is pressed down*/
    function focusSidebarLink(next = true) {
        if (sidebarLinks.length === 0) return;

        currentLinkIndex = next
            ? (currentLinkIndex + 1) % sidebarLinks.length
            : (currentLinkIndex - 1 + sidebarLinks.length) % sidebarLinks.length;

        sidebarLinks[currentLinkIndex].focus();
    }

    // Inject link content into main-content
    function injectContent(event) {
        event.preventDefault();
        const targetLink = event.target;
        const href = targetLink.getAttribute('href');

        fetch(href)
            .then(response => response.text())
            .then(html => {
                mainTargetDiv.innerHTML = html;
                if (targetLink.dataset.clickedOnce) {
                    mainTargetDiv.focus();
                    // executeCodeExample()
                    stepTextAreasCodeFocus()
                    addCopyCodes()
                    stepTxtsFocus()
                } else {
                    targetLink.dataset.clickedOnce = true;
                    setTimeout(() => delete targetLink.dataset.clickedOnce, 500);
                }
            })
            .catch(err => {
                console.error('Failed to load content:', err);
            });
    }

    // Keydown event listener
    document.addEventListener('keydown', (e) => {
        const letter = e.key.toLowerCase();
        
        
        if (!stepTextAreasCodeFocused) {
            if (letter === 's') {
                e.preventDefault();
                sideBarBtn.focus();
            } else
            if (letter === 'm') {
                e.preventDefault();
                mainTargetDiv.focus();
                scrollTo(0, 0);
            } else
            if (letter === 'a') {
                e.preventDefault();
                // Navigate within the sidebar links
                const isShiftPressed = e.shiftKey;
                if (lastClickedLink && !sidebarLinksFocused) {
                    lastClickedLink.focus();
                } else {
                    focusSidebarLink(!isShiftPressed);
                    sidebarLinks[currentLinkIndex].focus(); // Default to the current index
                }
                if (sidebarLinksFocused) {
                    // Return focus to the last clicked sidebar link
                }
            } else {
                
                elIdsFocus(e);
            }
        }
        if (!mainTargetDivFocused ){
            if(!isNaN(letter)){
                e.preventDefault()
                let intLet = parseInt(letter)
                if(intLet <= sidebarLinks.length){
                    sidebarLinks[intLet - 1].focus()
                    
                }
            }
        } else {
            return
        }
    });
    // Focus elements by their ID's first letter
    function elIdsFocus(e) {
        const letter = e.key.toLowerCase();
        const elIds = document.querySelectorAll('[id]');
        elIds.forEach(el => {
            if (letter === el.id[0]) {
                el.focus();
            }
        });
    }
    // Event listeners for sidebar button and links
    sideBarBtn.addEventListener('click', toggleSidebar);
    sideBarBtn.addEventListener('keydown', (e) => {
        let letter = e.key.toLowerCase()
        if (letter === 'enter') {
            toggleSidebar();
        }
        if(lastFocusedLink && (letter == 'a')){
            lastFocusedLink.focus()
        }
    });
    sidebarLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            if(e.target == lastFocusedLink){
                injectContent(e);
                mainTargetDiv.focus()
                scrollTo(0, 0);
            }
            lastFocusedLink = e.target; // Store the last clicked link
            currentLinkIndex = index;  // Update the current index
        });
        link.addEventListener('keydown', (e) => {
            // injectContent(e);
            let letter = e.key.toLowerCase()
            if(letter == 'enter'){
                if(e.target == lastFocusedLink){
                    injectContent(e);
                    mainTargetDiv.focus()
                    scrollTo(0, 0);
                }
            }
            lastFocusedLink = e.target; // Store the last clicked link
            currentLinkIndex = index;  // Update the current index
        });
    });

    
});
