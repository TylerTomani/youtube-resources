import { lastFocusedLink } from "./inject-content.js";
export const parts = document.querySelectorAll('.parts ul > li > a')
export const mainTargetDiv = document.querySelector('#mainTargetDiv')
import { lastClickedLink } from "./inject-content.js";
import { currentLinkIndex } from "./inject-content.js";
export let mainTargetDivFocused = false
export function letterFocus(currentLinkIndex){
    mainTargetDiv.addEventListener('focusin', e => {
        mainTargetDivFocused = true
    })
    mainTargetDiv.addEventListener('focusout', e => {
        mainTargetDivFocused = false
    })
    document.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase();
        if(letter == 'a'){
            if(lastClickedLink){
                lastClickedLink.focus()
            } else {
                parts[0].focus()
            }

        }
        parts.forEach(el =>{
            
            el.addEventListener('keydown', e  =>{
                let letter = e.key.toLowerCase()
                console.log(letter)
                if (letter == 'a' && !e.shiftKey) {
                    currentLinkIndex = (currentLinkIndex + 1) % parts.length
                    // parts[currentLinkIndex].focus()

                } else if (letter == 'a' && e.shiftKey) {
                    currentLinkIndex = (currentLinkIndex - 1 + parts.length) % parts.length
                    console.log(currentLinkIndex)
                    parts[currentLinkIndex].focus()
                }                
            })
        })
        
    });
    
}

// letterFocus()

