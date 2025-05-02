import { lastFocusedLink } from "./inject-content.js";
export const parts = document.querySelectorAll('.parts ul > li > a')
export const mainTargetDiv = document.querySelector('#mainTargetDiv')
import { lastClickedLink } from "./inject-content.js";
import { lastStep } from "./stepTxts-codeColor.js";
export const navBar = document.querySelector('nav.section-lesson-title')
export let mainTargetDivFocused = false
let partsFocused = false
export let enterConsoleFocus = false
const header = document.querySelector('body > header')
// async variables
let enterConsole, endNxtLessonBtn
export function letterFocus(){
    header.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if (letter == 'a') {    
            if (!partsFocused) {
                if (lastClickedLink) {
                    lastClickedLink.focus()
                } else {
                    parts[0].focus()
                }
            }

        }
    })
    async function extractElementEnterConsole() {
        enterConsole = await getEnterConsole();
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
        if(e.metaKey && letter == 'c'){
            e.preventDefault()
            return
        }
        if(letter == 'a'){
            if(!partsFocused){
                if(lastClickedLink){
                    lastClickedLink.focus()
                } else {
                    parts[0].focus()
                }
            }
        }
        if (letter == 'e') {
            async function extractEndNxtLessonBtn() {
                endNxtLessonBtn = await getEndNxtLessonBtn();
                if (endNxtLessonBtn) {
                    endNxtLessonBtn.focus()
                }
            }
            extractEndNxtLessonBtn()
        }
        if (letter == 'm' && lastStep) {
            mainTargetDivFocused = true
            lastStep.focus()
            
            if(e.target == lastStep && letter == 'm'){
                mainTargetDiv.focus()
                scrollTo(0, 0)
            }
        }
         
        if (!e.shiftKey && letter == 'c') {
            const chatGpt = document.querySelector('#chatGpt')
            chatGpt.focus()
        } 
        if (e.shiftKey && letter == 'c') {
            // const enterConsole = getEnterConsole()
            enterConsole.scrollIntoView({behavior: 'smooth', block:'center'})
            
        }
        if(letter == 'd'){
            const darkmodeBtn = document.querySelector('#darkmodeBtn')
            darkmodeBtn.focus()
        }
        if (letter == 'b') {
            const backlink = document.querySelector('#backlink')
            backlink.focus()
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
    // async functions
    function getEnterConsole(){
        return new Promise(function(resolve,reject){
            resolve(document.querySelector('#enterConsole'))
        })
    }
    function getEndNxtLessonBtn(){
        return new Promise(function(resolve,reject){
            resolve(document.querySelector('#endNxtLesson'))
        })
    }
}

