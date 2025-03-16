import { lastFocusedLink } from "./inject-content.js";
export const parts = document.querySelectorAll('.parts ul > li > a')
export const mainTargetDiv = document.querySelector('#mainTargetDiv')
import { lastClickedLink } from "./inject-content.js";
import { lastStep } from "./stepTxts-codeColor.js";
export const navBar = document.querySelector('nav.section-lesson-title')
export let mainTargetDivFocused = false
let partsFocused = false
let enterConsoleFocus = false
let enterConsole
const header = document.querySelector('body > header')

export function letterFocus(){
    // if(enterConsole){
        //     console.log(enterConsole)
        
        // }
    async function extractElementEnterConsole() {
        const enterConsole = await getEnterConsole();
        if (enterConsole) {
            enterConsole.addEventListener('focus', e => {
                enterConsoleFocus = true
            })
            enterConsole.addEventListener('focusout', e => {
                enterConsoleFocus = false 
            })
        }
    }
    extractElementEnterConsole()
    


    parts.forEach(el => {
        el.addEventListener('focus', e => {
            mainTargetDivFocused = false
            partsFocused = true
        })
    })
    // header.addEventListener('keydown', e=> {
    //     let letter = e.key.toLowerCase()
    //     if(letter == 'a'){
    //         console.log(letter)
    //         if(!partsFocused){
    //             if(lastClickedLink){
    //                 lastClickedLink.focus()
    //             } else {
    //                 parts[0].focus()
    //             }
    //         }

    //     }
    // })

    mainTargetDiv.addEventListener('focusin', e => {
        mainTargetDivFocused = true
        partsFocused = false
    })
    mainTargetDiv.addEventListener('focusout', e => {
        mainTargetDivFocused = false
    })
    document.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase();
        if(enterConsoleFocus){
            return 
        } else {
            elsFocus(e,letter)
        }

        
    });
    function elsFocus(e,letter) {
        if(letter == 'a'){
            if(!partsFocused){
                if(lastClickedLink){
                    lastClickedLink.focus()
                } else {
                    parts[0].focus()
                }
            }

        }
        if (letter == 'm' && lastStep) {
            mainTargetDivFocused = true
            lastStep.focus()
            if(e.target == lastStep && letter == 'm'){
                mainTargetDiv.focus()
                scrollTo(0, 0)

            }
        }
        if(letter == 'b'){
            const backlink = document.querySelector('#backlink')
            backlink.focus()
        }
        
        if (!e.shiftKey && letter == 'c') {
            const chatGpt = document.querySelector('#chatGpt')
            
            chatGpt.focus()
        }
        if(letter == 'd'){
            const darkmodeBtn = document.querySelector('#darkmodeBtn')
            darkmodeBtn.focus()
        }
        if (letter == 'h') {
            const homelink = document.querySelector('#homelink')
            homelink.focus()
        }
        if(letter == 'n'){
            
            navBar.setAttribute('tabindex', '1')
            navBar.focus()
        }
        if(letter == 't'){
            const tutorialLink = document.querySelector('#tutorialLink')
            tutorialLink.focus()
        }
        if(letter == 's'){
            const sideBarBtn = document.querySelector('#sideBarBtn')
            sideBarBtn.focus()
            scrollTo(0,0)
        }        
        if (letter == 'v') {
            const vsCodeShortRegex = document.querySelector('#vsCodeShortRegex')
            vsCodeShortRegex.focus()
        }
        
    }
    
    function getEnterConsole(){
        return new Promise(function(resolve,reject){
            resolve(document.querySelector('#enterConsole'))
        })
    }
}

