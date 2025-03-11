import { stepTxtsFocus } from "./stepTxts-codeColor.js";
import { addCopyCodes } from "../../../js/copy-code.js";
import { letterFocus } from "./letterFocus-sidebar.js";
import { parts } from "./letterFocus-sidebar.js";
import { mainTargetDivFocused } from "./letterFocus-sidebar.js";
export const mainTargetDiv = document.querySelector('#mainTargetDiv')
// export const sidebarLinks = document.querySelectorAll('.parts li a')
export let lastFocusedLink = null;
export let lastClickedLink = null
let sidebarLinksFocused = false;
export let currentLinkIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Inject link content into main-content
    function injectContent(href) {
        fetch(href)
            .then(response => response.text())
            .then(html => {
                mainTargetDiv.innerHTML = html;
                addCopyCodes()
                letterFocus()            
                stepTxtsFocus()
            })
            .catch(err => {
                console.error('Failed to load content:', err);
            });
    }    
    
    parts.forEach((el, index) => {
        if(el.hasAttribute('autofocus')){
            injectContent(el.href)
            lastFocusedLink = el
            lastClickedLink = el
        }
        el.addEventListener('click', (e) => {
            e.preventDefault()
            if(e.target == lastFocusedLink){
                injectContent(e.href);
                lastClickedLink = e.target; // Store the last clicked link
            }
            lastFocusedLink = e.target; // Store the last clicked link
            currentLinkIndex = index;  // Update the current index
        });
        el.addEventListener('focus', e => {
            currentLinkIndex = [...parts].indexOf(e.target)
            // console.log(currentLinkIndex)
        })
        el.addEventListener('keydown', (e) => {
            let letter = e.key.toLowerCase()
            if(letter == 'enter'){
                e.preventDefault()
                e.stopPropagation()
                injectContent(e.target.href);
                if(e.target == lastFocusedLink){
                    mainTargetDiv.focus()
                    scrollTo(0, 0);
                }
                lastClickedLink = e.target; // Store the last clicked link
                lastFocusedLink = e.target; // Store the last clicked link
                currentLinkIndex = index;  // Update the current index
            }            
        });
    })
    
});
