const sidebarBtn = document.querySelector('#sideBarBtn')
const sideBarContainer = document.querySelector(".sideBarBtn-container")
export const sideBar = document.querySelector('.side-bar')
import { parts } from "./letterFocus-sidebar.js"
import { lastClickedLink } from "./inject-content.js"
import { mainTargetDiv } from "./letterFocus-sidebar.js"
import { navBar } from "./letterFocus-sidebar.js"
mainTargetDiv.addEventListener('keydown', e =>{
    let letter = e.key.toLowerCase()
    if(letter == 's' || letter == 'a'){
        if(sideBar.classList.contains('deactive')){
            sideBar.classList.remove('deactive')
        }
        
    }
    
})
sidebarBtn.addEventListener('click', e =>{
    e.preventDefault()
    e.target.classList.toggle('drop')
    sideBar.classList.toggle('deactive')
})
sidebarBtn.addEventListener('keydown', e =>{
    let letter = e.key.toLowerCase()
    if(letter == 'enter'){ 
        sidebarBtn.classList.toggle('drop')
        sideBar.classList.toggle('deactive')
    }
    if(letter == 'a' && sideBar.classList.contains('deactive')){
                    sideBar.classList.remove('deactive')
                    console.log('yes')
    }    
    if(letter == 'a' && lastClickedLink){
        lastClickedLink.focus()
        
    } else if(letter == 'a' && !lastClickedLink){
        parts[0].focus()
    }
    
})

navBar.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if (letter == 'enter') {
        sideBar.classList.toggle('deactive')

    }
})
navBar.addEventListener('click', e => {
    e.preventDefault()
    sideBar.classList.toggle('deactive')
})

sideBar.addEventListener('click', e => {
    // e.preventDefault()
    sideBar.classList.toggle('deactive')
})