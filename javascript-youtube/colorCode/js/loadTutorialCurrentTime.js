import { parts } from "./letterFocus-sidebar.js";
const tutorialLink = document.querySelector('#tutorialLink')
export function loadTutorialCurrentTimee(){
    parts.forEach(el => {
        el.addEventListener('click', e => {
            const currentTimeLink = e.target.getAtttribute('data-video')
            if(!currentTimeLink){
                return 
            }
            console.log(currentTimeLink)
            tutorialLink.href = currentTimeLink
        })
    })
}