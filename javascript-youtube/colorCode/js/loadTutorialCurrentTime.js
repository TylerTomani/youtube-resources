import { parts } from "./letterFocus-sidebar.js";
export function loadTutorialCurrentTime(){
    const tutorialLink = document.querySelector('#tutorialLink')
    parts.forEach(el => {
        el.addEventListener('click', e => {
            const currentTimeLink = e.target.getAtttribute('data-video')
            if(!currentTimeLink){
                return 
            }
            tutorialLink.href = currentTimeLink
        })
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            
            if(letter == 'enter'){
                const currentTimeLink = e.target.getAttribute('data-video')
                if(!currentTimeLink){
                    return 
                }
                tutorialLink.href = currentTimeLink
            }
        })
    })
}
loadTutorialCurrentTime()