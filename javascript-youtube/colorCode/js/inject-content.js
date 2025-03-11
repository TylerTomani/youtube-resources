import { stepTxtsFocus } from "./stepTxts-codeColor.js";
import { addCopyCodes } from "../../../js/copy-code.js";
import { letterFocus } from "./letterFocus-sidebar.js";
import { parts } from "./letterFocus-sidebar.js";
import { mainTargetDiv } from "./letterFocus-sidebar.js";
import { sideBar } from "./toggle-sidebar.js";
export let lastFocusedLink = null;
export let lastClickedLink = null
let sidebarLinksFocused = false;
let currentLinkIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    let currentWidth = innerWidth
    addEventListener('resize', e => {
        // currentWidth = e.target.innerWitdth
        currentWidth = innerWidth
        console.log(currentWidth)
    })
    let mainTargetDivFocused = false
    // Inject link content into main-content
    mainTargetDiv.addEventListener('focusout', e => {
        mainTargetDivFocused = false 
    })
    mainTargetDiv.addEventListener('focusin', e => {
        mainTargetDivFocused = true
    })
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
        el.addEventListener('focus', (e) => { 
            mainTargetDivFocused = false
        })
        el.addEventListener('click', (e) => {
            e.preventDefault()
            injectContent(e.target.href);
            if(e.target == lastFocusedLink){
                lastClickedLink = e.target; // Store the last clicked link
            }
            lastFocusedLink = e.target; // Store the last clicked link
            currentLinkIndex = index;  // Update the current index
        });
        el.addEventListener('keydown', (e) => {
            let letter = e.key.toLowerCase()
            if(letter == 'enter'){
                e.preventDefault()
                e.stopPropagation()
                injectContent(e.target.href);
                if(e.target == lastFocusedLink){
                    if(currentWidth < 600){
                        const sideBar = document.querySelector('.side-bar ')
                        sideBar.classList.add('deactive')

                    }
                    mainTargetDiv.focus()
                    scrollTo(0, 0);
                }
                lastClickedLink = e.target; // Store the last clicked link
                lastFocusedLink = e.target; // Store the last clicked link
                currentLinkIndex = index;  // Update the current index
            }
            if(!mainTargetDivFocused) {
                
                if (letter == 'a' && !e.shiftKey) {
                    currentLinkIndex = (currentLinkIndex + 1) % parts.length
                    parts[currentLinkIndex].focus()

                } else if (letter == 'a' && e.shiftKey) {
                    currentLinkIndex = (currentLinkIndex - 1 + parts.length) % parts.length
                    parts[currentLinkIndex].focus()
                }
                if(letter == 'm'){
                    mainTargetDiv.focus()
                    // denlarge images
                    
                }
                
            }
        });
    })
    addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        
        if (!mainTargetDivFocused) {
            if(!isNaN(letter)){
                const intLet = parseInt(letter)
                if(intLet <= parts.length){
                    parts[intLet - 1].focus()
                }
            }
        } else {

            // return
        }
        console.log(mainTargetDivFocused)
    });
    
    letterFocus()    
});
