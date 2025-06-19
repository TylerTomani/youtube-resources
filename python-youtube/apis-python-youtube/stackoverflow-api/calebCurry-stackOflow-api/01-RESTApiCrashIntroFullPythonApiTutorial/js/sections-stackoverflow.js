import { nav, stepTxtListeners } from "./step-focus-img-temp.js"
import { lastStep } from "./step-focus-img-temp.js"
import { playEnlargeVideos } from "./play-enlarge-vid.js"
export const navBar = document.querySelector('nav.section-lesson-title')
const mainTargetDiv = document.querySelector('#mainTargetDiv')
const header = document.querySelector('header')
export const toggleSideBtn = document.querySelector('#toggleSideBtn')
import { addCopyCodes } from "./copy-code-resources.js"
export const aside = document.querySelector('aside')
const backlink = document.querySelector('#backlink')
const homelink = document.querySelector('#homelink')
const vsCodeShortRegex = document.querySelector('#vsCodeShortRegex')
const programShortcuts = document.querySelector('#programShortcuts')
const tutorialLink = document.querySelector('#tutorialLink')
export  const sections = document.querySelectorAll('.section')
export const lessons = document.querySelectorAll('.section-container > ul > li > a')
const homePageLink = document.getElementById('homePageLink')
let asideFocused = false;
let sectionsFocused = true
let lessonsFocused = false
let mainTargetDivFocus = false
let pageStarted = false
let iSection = 0
let iLesson = 0
export let lastClickedLesson
export let lastClickedSection
let lastFocusedItem  
let autoFocused
addEventListener('DOMContentLoaded', e => {
    lessons.forEach(el => {
        if(el.hasAttribute('autofocus')){
            autoFocused = true
        }
    })
    sections.forEach(el => {
        if(el.hasAttribute('autofocus')){
            autoFocused = true
        }
        el.addEventListener('focus', e => {
            iLesson = -1
        })
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if(letter == 'a'){
                const sectionContainer = getSectionContainer(e.target.parentElement)
                const lessons = sectionContainer.querySelectorAll('.sub-section li a')                
                // This page has really good letter focus cycle
                    if (e.shiftKey) {
                        iLesson = (iLesson - 1 + lessons.length) % lessons.length
                    } else {
                        iLesson = (iLesson + 1) % lessons.length

                    }
                    lessons[iLesson].focus()
                    console.log()
            }
            
        })

    })
    if(!autoFocused){

        fetchLessonHref(homePageLink.href)
    }
});
const keys = {
    shift: {
        pressed: false
    }
}
function fetchLessonHref(href) {
    fetch(href)
    .then(response => response.text())
        .then(html => {
            
            // Inject the retrieved HTML into the target div
            mainTargetDiv.innerHTML = html;
            ////////////// This function is located in lesson-temp.js ////////////////////////////////////////////////////////////////////////////////////
            stepTxtListeners()
            playEnlargeVideos()
            addCopyCodes()
        })
        .catch(error => console.log('Error fetching content.html:', error));

}
navBar.addEventListener('click', e => {
    aside.classList.toggle('hide')
    showToggleSidBarBtn()
})
aside.addEventListener('focusin', e => {asideFocused = true})
navBar.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'enter'){
        aside.classList.toggle('hide')   
    }
    if(letter == 'a'){
        if(aside.classList.contains('hide')){
            aside.classList.remove('hide')
        }
    }
    if(letter == 's'){
        if(aside.classList.contains('hide')){
            aside.classList.remove('hide')
        }
    }
})
aside.addEventListener('focusin', e => {asideFocused = true})
aside.addEventListener('focusout', e => {asideFocused = false})
aside.addEventListener('click', e => {
    asideFocused = true
    aside.classList.toggle('hide')
    showToggleSidBarBtn()
    
})
function hideSubSections(){
    sections.forEach(el => {
        const sectionContainer = getSectionContainer(el.parentElement)
        if(!el.classList.contains('show')){
            const subSection = sectionContainer.querySelector('.sub-section')
            if(subSection){
                if(!subSection.classList.contains('show')){
                    subSection.classList.add('hide')
                } 
            }
        }
    })
}
hideSubSections()
function toggleSubSection(subSection){
    hideSubSections()
    if(subSection){
        subSection.classList.toggle('hide')
    }
}
export function getSectionContainer(parent){
     if (parent.classList.contains('section-container')){
        return parent
    } else if (parent.parentElement){
        return getSectionContainer(parent.parentElement)
    } else {
        return null
    }
}
export function getSubSection(parent){
    if(parent.classList.contains('sub-section')){
        return parent
    } else if (parent.parentElement){
        return getSubSection(parent.parentElement)
    } else {
        return null
    }
}

function elIdsFocus(e) {
    const letter = e.key.toLowerCase();
    const elIds = document.querySelectorAll('[id]');
    const isShift = e.shiftKey
    elIds.forEach(el => {
        if (el.parentElement.id == 'nav-section-lesson-titles'){return}
        if (letter === el.id[0] && !isShift){
            el.focus();
        }
        if (letter == 'c') {
            const chatGpt = document.querySelector('#chatGpt')
            const codeComandShortcuts = document.querySelector('#codeComandShortcuts')

            if (e.target == codeComandShortcuts) {
                chatGpt.focus()
            } else {
                codeComandShortcuts.focus()
            }
        } 
        
        if (letter === 'm') {
            scrollTo(0, 0);
        }
    });
}
sections.forEach(el => {
    if(el.hasAttribute('autofocus')){
        iSection = [...sections].indexOf(el)
        lastClickedSection = el
    } 
    el.addEventListener('focus', e => {
        iSection = [...sections].indexOf(e.target)
        asideFocused = true
        sectionsFocused = true
        lessonsFocused = false
        lastFocusedItem
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        const sectionContainer = getSectionContainer(e.target)
        const subSection = sectionContainer.querySelector('.sub-section')
        toggleSubSection(subSection)
        lastClickedSection = e.target
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        let sectionContainer = getSectionContainer(e.target.parentElement)
        let lessons = sectionContainer.querySelectorAll('ul.sub-section  > li > a')
        if(letter == 'a' ){
            if (!sectionsFocused){
                if(!lastClickedLesson){
                    if(lessons){

                        lessons[0].focus()
                    }
                } 
            } else {
                
            }
            
        }
        // if (!isNaN(letter)) {
        //     let intLet = parseInt(letter)
        //     if (sections[intLet - 1]) {
        //         sections[intLet - 1].focus()
        //     }
        // }
        if(letter == 's' && sectionsFocused){
            let lesson = sectionContainer.querySelector('.section-container > ul > li > a')
            let isShiftPressed = e.shiftKey
            sectionsCycles(e.shiftKey)          
        }
        if(letter == 'enter'){
            
            lastClickedSection = e.target
        }
    })
})
function sectionsCycles(shiftKey = false) {
    if (shiftKey) {
        iSection--
        if (iSection < 0) {
            iSection = sections.length - 1
        }
    } else {
        iSection++
        if (iSection >= sections.length) {
            iSection = 0
        }
    }
    sections[iSection].focus()
}
mainTargetDiv.addEventListener('focusin', e => {
    console.log(e.target)
    sectionsFocused = false
})

function getParentA(parent){
    if(parent.tagName == 'A'){
        return parent
    } else if (parent.parentElement){
        return getParentA(parent.parentElement)
    } else {
        return null
    }
}
lessons.forEach(el => {
    if(el.hasAttribute('autofocus')){
        lastClickedLesson = el
        const subSection = getSubSection(el.parentElement)
        if(subSection.classList.contains('hide')){
            subSection.classList.remove('hide')
        }
        if(subSection){
            const lessons = subSection.querySelectorAll('li > a')
            lessonsFocused = true
            sectionsFocused = false
            fetchLessonHref(el.href)
        }
        
    }
    el.addEventListener('focus', e => {
        sectionsFocused = false
        lessonsFocused = true
        lastFocusedItem = e.target
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        if(e.target.tagName != "A"){
            // console.log(e.target.parentElement)
            const a = getParentA(e.target.parentElement)
            if(a){
                fetchLessonHref(a.href)
                
            }
        } else {
            fetchLessonHref(e.target.href)
            lastClickedLesson = e.target
            
        }
        // if(e.target == lastClickedLesson){
        //     mainTargetDiv.scrollIntoView({behavior:'instant', block:'start'})
        // }
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        let sectionContainer = getSectionContainer(e.target.parentElement)  
        let subSection = sectionContainer.querySelector('.sub-section')
        let lessons = subSection.querySelectorAll('ul  > li > a') 
        if(lessons){
            if(!isNaN(letter)){
                let intLet = parseInt(letter)
                if(lessons[intLet - 1]){
                    lessons[intLet - 1].focus()
                }
                iLesson = intLet - 1
            }
            if(letter == 's' && lessonsFocused){
                let section = sectionContainer.querySelector('.section')
                section.scrollIntoView({behavior:'instant',block:'center'})
                section.focus()
            }
            if(letter == 'a' && lessonsFocused){
                let isShiftPressed = e.shiftKey
                lessonsCycle(lessons,isShiftPressed)
            }
            if(letter == 'enter'){
                if (e.target == lastFocusedItem && e.target == lastClickedLesson){
                    mainTargetDiv.focus()
                }
                lastClickedLesson = e.target             
            }
        }
    })
})
function lessonsCycle(lessons,shiftKey = false) {
    if (shiftKey) {
        iLesson--
        if (iLesson < 0) {
            iLesson = lessons.length - 1
        }
    } else {
        iLesson++
        if (iLesson >= lessons.length) {
            iLesson = 0
        }
    }
    if(lessons[iLesson]){
        lessons[iLesson].scrollIntoView({ behavior: 'instant', block: 'center' })
        lessons[iLesson].focus()
    }
}
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()   
    const isMeta = e.metaKey
    let key = e.keyCode
    
    if (!isMeta) {
        
        elIdsFocus(e)
    }
    if ((letter == 's' )  && !asideFocused) {
        
        if(lastClickedSection){
            lastClickedSection.focus()
        }
         else if(lastClickedLesson){
            // lastClickedLesson.scrollIntoView({ behavior: 'instant', block: 'center' })
            lastClickedLesson.focus()
        }else {
            sections[0].scrollIntoView({ behavior: 'instant', block: 'center' })
            sections[0].focus()
        }
    }
    if (letter == 'a' && !asideFocused) {
        if (lastClickedLesson) {
            lastClickedLesson.focus()
            lastClickedLesson.scrollIntoView({behavior:'instant',block:'center'})
        } else if(!lastClickedLesson && lastClickedSection){
            lastClickedSection.focus()
        }
    }
    
    if(sectionsFocused){
        if (!isNaN(letter)) {
            let intLet = parseInt(letter)
            if (sections[intLet - 1]) {
                sections[intLet - 1].focus()
            }
        }
    }
    if (letter == 'r') { vsCodeShortRegex.focus() }
    if (letter == 'a' || letter == 's') {
        if (aside.classList.contains('hide')) {
            aside.classList.remove('hide')
        } 
    }
    showToggleSidBarBtn()
    
});

/// I don't know if i need this here
stepTxtListeners()

function showToggleSidBarBtn(){
    if (aside.classList.contains('hide')) {
        toggleSideBtn.classList.add('active')
        toggleSideBtn.setAttribute('tabindex', 0)

    } else{
        toggleSideBtn.removeAttribute('tabindex')
        // toggleSideBtn.classList.remove('active')
    }
}
toggleSideBtn.addEventListener('click', e => {
    // e.preventDefault()
    if(aside.classList.contains('hide')){
        aside.classList.remove('hide')
    }
    toggleSideBtn.classList.add('hide')
})
toggleSideBtn.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'enter'){   
        aside.classList.toggle('hide')
    }
})
addEventListener('click', e => {
    if (!aside.classList.contains('hide')) {
        toggleSideBtn.classList.add('hide')
        toggleSideBtn.classList.remove('active')
    }
});