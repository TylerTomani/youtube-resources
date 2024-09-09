import { addCopyCodes } from "./copy-code.js"
import { stepTxtListeners } from "./lesson-temp.js"
import { popScriptWindow } from "./popup-script.js"
import { injectJsScripts } from "../sections/loadJsScripts.js"

export const navBar = document.querySelector('.section-lesson-title')
export const mainAside = document.querySelector('main > aside')
export const sections = document.querySelectorAll('.section')
export const lessons = document.querySelectorAll('.sub-section > li > a')
export const header = document.querySelector('header')
const jsCanvasLessons = document.querySelectorAll('.js-canvas-lesson')
const backlink = document.getElementById('backlink')
const homelink = document.getElementById('homelink')
const tutorialLink = document.getElementById('tutorialLink')
const regexCmdsLink = document.getElementById('regexCmds')
const programShorcutsLink = document.getElementById('programShorcuts')
const allEls = document.querySelectorAll('body *')
const sectionTitle = document.getElementById('section-title')
const lessonTitle = document.getElementById('lesson-title')
const subSections = document.querySelectorAll('.sub-section')
export const targetDiv = document.getElementById('targetDiv')
const keys = {
    shift: {
        pressed: false
    }
}
let  iSection,iLesson,currentSection,intLetter,sectionsFocused,lessonsFocused, sectionClicked,asideFocused,targetDivFocused,currentLesson,shiftS
[mainAside, navBar, backlink].forEach(el => {
    el.addEventListener('focus', () => { scrollTo(0, 0) });
})
function setLetVariables(){
    iSection = 0
    iLesson = 0
    currentSection
    intLetter = 0
    sectionsFocused = false
    lessonsFocused = false
    asideFocused = false
    targetDivFocused = false
    currentLesson
    sectionClicked = false
    shiftS = []
}
/** This function, set let variable values, saves space 
in top part of the code */
setLetVariables()
header.addEventListener('focusin', e => { sectionsFocused = false})
header.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(letter == 's' ){
        lastFocusedElement.focus()
    }    
})
/** When the pages first loads, the first .section "Section 1" is the 
lastFocused Element */
export let lastFocusedElement = document.querySelector('.section')
/** If element has autofocus, it is the lastFocusElement*/
addEventListener('DOMContentLoaded',()  => {
    allEls.forEach(el => {
        if(el.hasAttribute('autofocus')){
            fetchLessonHref(el.href)                
            lastFocusedElement = el            
        }
    })
});
subSections.forEach(el =>{
    if(el.hasAttribute('autofocus')){
        sectionsFocused = true
    }
    if(!el.classList.contains('show')){
        el.classList.add('hide')
    }
})
function hideSubSections(){
    subSections.forEach(el =>{
        if(el.classList.contains('show')){
            el.classList.remove('show')
        }
        el.classList.add('hide')
    })
}
function toggleSubSections(e){
    const section = getSectionContainer(e.target.parentElement)
    const subSections = section.querySelector('.sub-section')
    if(subSections){
        if(subSections.classList.contains('show')){
            subSections.classList.remove('show')
        }
        if(subSections.classList.contains('hide')){
            hideSubSections()
            subSections.classList.remove('hide')
        } else{
            subSections.classList.add('hide')
        }
    }
}
mainAside.addEventListener('focus', e => {
    targetDivFocused = false
    sectionsFocused = false
})
mainAside.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(letter == 's' && !sectionsFocused){
        if(lastFocusedElement.classList.contains('section')){
            lastFocusedElement.focus()
            iSection -= 1
        }    
        
    }
    
})
navBar.addEventListener('focus', e => {
    targetDivFocused = false    
})
navBar.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    let key = e.keyCode
    if(key === 13){
        toggleAside()
    }
    targetDivFocused = false
    if (letter == 's' || letter == 'a') {
        showAside()
    }
    if ( letter == 'a') {
        if(currentLesson){
            currentLesson.focus()
        } else {
            lastFocusedElement.focus()
        }
    }
    if(letter == 's' ){
        lastFocusedElement.focus()
        iSection -= 1
    }    
    
})
function toggleAside(){
    const jsCanvasScriptContainer = document.querySelector('#jsCanvasScriptContainer')
    if (!mainAside.classList.contains('hide')){
        mainAside.classList.add('hide')
        // jsCanvasScriptContainer.style.alignSelf = 'center'

    } else {
        mainAside.classList.remove('hide')
        // jsCanvasScriptContainer.style.alignSelf = 'statics'
    }
}
export function showAside(){
    if(mainAside.classList.contains('hide')){
        mainAside.classList.remove('hide')
    }
}
export function hideAside(){
    if(!mainAside.classList.contains('hide')){
        mainAside.classList.add('hide')
    }
}
navBar.addEventListener('click', e => {
    if(!mainAside.classList.contains('hide')){
        mainAside.classList.add('hide')
    } else {
        mainAside.classList.remove('hide')
    }
    targetDivFocused = false
    if (letter == 's'  ){
            lastFocusedElement.focus()
            iSection -= 1
        }    
    
})
targetDiv.addEventListener('focus', e => {
    targetDivFocused = true
    sectionsFocused = false
})
targetDiv.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    sectionsFocused = false
    if(targetDivFocused){
        if (letter == 's' || letter == 'a' ){
            lastFocusedElement.focus()
        }
        
            
    }    
    // if(letter == 'c'){
    //     const mainCode = document.querySelector('#mainCode')
    //     if(mainCode){
    //         mainCode.focus()
    //     }
    // }
})
export function getSectionContainer(parent){
    if(parent.classList.contains('section-container')){
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
/** For Reasons Unknown i Need this function do double click capability 
to focus to targetDiv from lessons */
function clickLesson(e) {
    if (currentLesson == e.target) {
        targetDiv.focus()
    }
    currentLesson = e.target
}
function navSections(letter) {
    if (!keys.shift.pressed && letter == 's' && !targetDivFocused) {
        iSection = (iSection + 1) % sections.length

    } else if (keys.shift.pressed && letter == 's') {
        if (iSection > 0) {
            iSection -= 1
        } else if (iSection <= 0) {
            iSection = sections.length - 1
        }
    }
    sections[iSection].focus()
}
sections.forEach(el => {
    el.addEventListener('focus', e => {
        sectionClicked = false
        lastFocusedElement = e.target
        targetDivFocused = false
        sectionsFocused = true
        lessonsFocused = false
        iSection = [...sections].indexOf(e.target)
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        toggleSubSections(e)
        fetchLessonHref(e.target.href)
        sectionTitle.innerText = e.target.innerText
        lessonTitle.innerText = ''
        currentSection = e.target
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()       
        if (letter == 's'){
            navSections(letter)
        }
        if (letter == 'a') {
            const sectionContainer = getSectionContainer(e.target)
            const subSection = sectionContainer.querySelector('.sub-section')
            const firstLesson = sectionContainer.querySelector('.sub-section > li a')
            if(firstLesson){
                if(subSection.classList.contains('hide')){
                    subSection.classList.remove('hide')
                }
                firstLesson.focus()
            }
        }
        if (letter == 'enter') {
            const sectionContainer = getSectionContainer(e.target.parentElement)
            const subSection = sectionContainer.querySelector('.sub-section')
            if(!subSection){
                if (!subSection && sectionClicked) {
                    targetDiv.focus()            
                    scrollTo(0,0)
                }
                sectionClicked = !sectionClicked
            }
            fetchLessonHref(e.target.href)
            scrollTo(0, 0)
        }
        if(letter == 'c'){
            // const mainCode = document.querySelector('#mainCode')
            targetDivFocused = true
        }        
        if(letter == 'j'){
            const sectionContainer = getSectionContainer(e.target)
            const lessons = sectionContainer.querySelectorAll('.sub-section > li > a')
            lessons.forEach(el => {
                el.classList.contains('js-canvas-lesson')
                el.focus()
            })
        }
    })
})
function navLessons(e, letter) {
    const sectionContainer = getSectionContainer(e.target.parentElement)
    if (sectionContainer) {
        const section = sectionContainer.querySelector('.section')
        const subSection = getSubSection(e.target.parentElement)
        const lessons = subSection.querySelectorAll('li > a')
        if (subSection) {
            if (letter == 's') {
                section.focus()
            }
            if (!isNaN(letter)) {
                let intLetter = parseInt(letter)
                if (intLetter <= lessons.length && intLetter >= 0) {
                    lastFocusedElement = lessons[intLetter - 1]
                    lastFocusedElement.focus()
                }
            }
            if(letter == 'a'){
                iLesson = (iLesson + 1) % lessons.length
                lessons[iLesson].focus()
            }
        }
    }
}
lessons.forEach(el => {
    if (el.hasAttribute('autofocus')) {
        lessonsFocused = true
        currentLesson = el
    }
    el.addEventListener('focus', e => {
        currentLesson = ''
        lastFocusedElement = e.target
        sectionsFocused = false
        lessonsFocused = true
        targetDivFocused = false
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        clickLesson(e)
        fetchLessonHref(e.target.href)
        currentLesson = e.target

    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if (letter == 's') {
            const subSection = getSectionContainer(e.target)
            const section = subSection.querySelector('.section')
            section.focus()
        }
        
        
        if (lessonsFocused) {
            navLessons(e, letter)
        }
        if(letter == 'c'){
            targetDivFocused = true
            
        }
        
    })
})
// This is not working yet, Get "J" to go to js canvas
function navJsCanvasLessons(letter){
    jsCanvasLessons.forEach(el => {
        const subSection = getSubSection(el.parentElement)
        if(subSection.classList.contains('show')){
            el.focus()
        }
    })
}
addEventListener('keyup', e => {
    let letter = e.key.toLowerCase()
    switch (letter) {
        case 'shift':
            keys.shift.pressed = false
            break
    }
})
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()    
    if(letter == 'a' ){
        if(currentLesson){
            currentLesson.focus()
        } 
        
    }
    if(letter == 'j'){
        navJsCanvasLessons()
        
    }
    
    if(letter == 's' && !sectionsFocused ){
        lastFocusedElement.focus()
    }
    if(letter == 'shift'){keys.shift.pressed = true}
    // Controls Section Selection with numbers on keyboard
    if(!targetDivFocused){
        if(!isNaN(letter) && !lessonsFocused && !targetDivFocused){
            let intLetter = parseInt(letter)
            if(intLetter <= sections.length){
                if(sections[intLetter - 1]){
                    sections[intLetter - 1].focus()
                }
            }
        }
    }
    switch(letter){     
        case 'a':
            scrollTo(0,0)
            mainAside.focus()
            break        
        case 'c':
            
            break        
        case 'm':
            scrollTo(0,0)
            targetDiv.focus()
            targetDivFocused = true
            break        
        case 'n':
            navBar.focus()
            break
        case 'b':
            backlink.focus()
            break
        case 'h':
            homelink.focus()
            break
        case 'r':
            regexCmdsLink.focus()
            // regexCmdsLink.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break   
        case 'p':
            const mainCode = document.querySelector("#mainCode")
            if(mainCode){
                mainCode.focus()
                targetDivFocused = true
            }
            if(!keys.shift.pressed){
                // programShorcutsLink.focus()
            }
            break
        case 't':
            tutorialLink.focus()
            break
            
    }
});

function fetchLessonHref(href){
    fetch(href)
    .then(response => response.text())
    .then(html => {
        // Inject the retrieved HTML into the target div
        document.getElementById('targetDiv').innerHTML = html;
////////////// This function is located in lesson-temp.js ////////////////////////////////////////////////////////////////////////////////////
            stepTxtListeners()
            addCopyCodes()
            popScriptWindow()
            injectJsScripts()
    })
    .catch(error => console.log('Error fetching content.html:', error));   
}

