import { lastFocusedLink } from "./inject-content.js";
export const parts = document.querySelectorAll('.parts ul > li > a')
export const mainTargetDiv = document.querySelector('#mainTargetDiv')
import { lastClickedLink } from "./inject-content.js";
// import { currentLinkIndex } from "./inject-content.js";
export let mainTargetDivFocused = false
let partsFocused = false
export function letterFocus(currentLinkIndex){
    parts.forEach(el => {
        el.addEventListener('focusin', e => {
            mainTargetDivFocused = false
            partsFocused = true
        })
        el.addEventListener('focusout', e => {
            partsFocused = false
        })
    })
    mainTargetDiv.addEventListener('focusin', e => {
        mainTargetDivFocused = true
        partsFocused = false
    })
    mainTargetDiv.addEventListener('focusout', e => {
        mainTargetDivFocused = false
    })
    document.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase();
        elsFocus(letter)
        

        
    });
    function elsFocus(letter) {
        if(letter == 'a'){
            if(!partsFocused){
                if(lastClickedLink){
                    lastClickedLink.focus()
                } else {
                    parts[0].focus()
                }
            }

        }
        if (letter == 'm') {
            mainTargetDiv.focus()
            scrollTo(0, 0)
            mainTargetDivFocused = true
        }
        if(letter == 'b'){
            const backlink = document.querySelector('#backlink')
            backlink.focus()
        }
        if(letter == 'h'){
            const homelink = document.querySelector('#homelink')
            homelink.focus()
        }
        if(letter == 'd'){
            const darkmodeBtn = document.querySelector('#darkmodeBtn')
            darkmodeBtn.focus()
        }
        if(letter == 'b'){
            const vsCodeShortRegex = document.querySelector('#vsCodeShortRegex')
            vsCodeShortRegex.focus()
        }
        if(letter == 'c'){
            const chatGpt = document.querySelector('#chatGpt')
            chatGpt.focus()
        }
        if(letter == 't'){
            const tutorialLink = document.querySelector('#tutorialLink')
            tutorialLink.focus()
        }
        if(letter == 's'){
            const sideBarBtn = document.querySelector('#sideBarBtn')
            sideBarBtn.focus()
        }        
        
        
    }
}

// letterFocus()

