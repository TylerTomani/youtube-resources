import { lastFocusedLink } from "./inject-content.js";
export const parts = document.querySelectorAll('li > a')
import { mainTargetDiv,sideBar } from "./inject-content.js";
import { lastClickedLink } from "./main-script.js";
import { lastStep } from "./stepTxtFocus.js";
export const navBar = document.querySelector('nav.section-lesson-title')
let partsFocused = false
export let enterConsoleFocus = false
const header = document.querySelector('header.page-header')
export function letterFocus() {
    const nxtLessonBtn = document.querySelector('#nxtLessonBtn')
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
    parts.forEach(el => {
        el.addEventListener('focus', e => {
            partsFocused = true

        })
    })
    mainTargetDiv.addEventListener('focusin', e => {
        partsFocused = false
    })
    mainTargetDiv.addEventListener('focusout', e => {
    })

    nxtLessonBtn.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if (letter == 'enter') {
            if (lastClickedLink) {
                lastClickedLink.focus()
            }

        }

    })
    nxtLessonBtn.addEventListener('click', e => {
        lastClickedLink.focus()
    })
    document.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase();
        if (enterConsoleFocus) {
            return
        } else {
            elsFocus(e, letter)
        }
        if (sideBar) {
            // 
        }
    });
    function elsFocus(e, letter) {
        if (e.metaKey && letter == 'c') {
            e.preventDefault()
            return
        }
        if (letter == 'a') {
            if (!partsFocused) {
                if (lastClickedLink) {
                    lastClickedLink.focus()
                } else {
                    parts[0].focus()
                }
            }
        }
        if (letter == 'e') {
            if (nxtLessonBtn) {
                nxtLessonBtn.focus()
            }

        }
        if (letter == 'm' && lastStep) {
            lastStep.focus()

            if (e.target == lastStep && letter == 'm') {
                mainTargetDiv.focus()
                scrollTo(0, 0)
            }
        }
        //  This is very sloppy handling of letterFocus
        if (letter == 'c') {
            const chatGpt = document.querySelector('#chatGpt')
            const codeComandShortcuts = document.querySelector('#codeComandShortcuts')

            if (e.target == codeComandShortcuts) {
                chatGpt.focus()
            } else {
                codeComandShortcuts.focus()
            }
        }
        
        if (letter == 'd') {
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
        if (letter == 'n') {

            navBar.setAttribute('tabindex', '1')
            navBar.focus()
        }
        if (letter == 't') {
            const tutorialLink = document.querySelector('#tutorialLink')
            tutorialLink.focus()
        }
        if (letter == 's') {
            const sideBarBtn = document.querySelector('#sideBarBtn')
            sideBarBtn.focus()
            scrollTo(0, 0)
        }
        if (letter == 'v') {
            const vsCodeShortRegex = document.querySelector('#vsCodeShortRegex')
            vsCodeShortRegex.focus()
        }
    }
    // async functions
    function getEnterConsole() {
        return new Promise(function (resolve, reject) {
            resolve(document.querySelector('#enterConsole'))
        })
    }
    // function getEndNxtLessonBtn(){
    //     return new Promise(function(resolve,reject){
    //         resolve(document.querySelector('#endNxtLesson'))
    //     })
    // }

}

// letterFocus()