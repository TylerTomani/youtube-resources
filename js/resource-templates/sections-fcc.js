
import {header,nav, mainTargetDiv, targetDivFocusIN} from "./lessons-temp-fcc.js"
import { stepTxtListeners } from "./lessons-temp-fcc.js"
import { addCopyCodes } from "./copy-code-resources.js"
const aside = document.querySelector('aside')
const backlink = document.querySelector('#backlink')
const homelink = document.querySelector('#homelink')
const regexCmds = document.querySelector('#regexCmds')
const programShortcuts = document.querySelector('#programShortcuts')
const tutorialLink = document.querySelector('#tutorialLink')

export const lessons = document.querySelectorAll('.sub-section > li > a')
export const sections = document.querySelectorAll('.section')
let sectionsFocused = true
let lessonsFocused = false
// let targetDivFocus = false
let pageStarted = false
let iSection = 0
export let lastFocusedSelection
export let currentClickedSelection
const keys = {
    shift: {
        pressed: false
    }
}
function hideSubSections(){
    sections.forEach(el => {
        const sectionContainer = getSectionContainer(el.parentElement)

        const subSection = sectionContainer.querySelector('.sub-section')
        if(subSection){

            if(!subSection.classList.contains('show')){
                subSection.classList.add('hide')
            } 
        }
    })
}
function toggleSubSection(e){
    const sectionContainer = getSectionContainer(e.target.parentElement)
    const el = sectionContainer.querySelector('.sub-section')
    if(el){

        if(el.classList.contains('show')){
            el.classList.remove('show')
        } 
        else  if(!el.classList.contains('hide')){
            el.classList.add('hide')
        } else if(el.classList.contains('hide') && el.classList.contains("show")) {
            el.classList.remove('show')
            el.classList.remove('hide')
        } else {
            el.classList.remove('hide')
            
        }
    }
}
hideSubSections()
header.addEventListener('focus', e => {
    sectionsFocused = true
})
// mainTargetDiv.addEventListener('focus', e => {
//     targetDivFocus = true
// })
header.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    
    if(!lastFocusedSelection && letter == 's'){
        showAide()
        sections[0].focus()
    } else if (lastFocusedSelection && letter == 's') {
        showAide()
        lastFocusedSelection.focus()
    }

    handleSectionsFocus(letter)
    
})
function showAide(){
    if(aside.classList.contains('hide')){
        aside.classList.remove('hide')
    }

}
mainTargetDiv.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(!lastFocusedSelection && letter == 's'){
        sections[0].focus()
    } else if (lastFocusedSelection && letter == 's') {
        lastFocusedSelection.focus()
    }
    if(!currentClickedSelection && letter == 'a'){
        lastFocusedSelection.focus()
    }
})
nav.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(letter == 's'){
        if(aside.classList.contains('hide')){
            aside.classList.remove('hide')
        }
        if(!lastFocusedSelection ){
            sections[0].focus()
        } else if(lastFocusedSelection ){
            lastFocusedSelection.focus()
        }
    }
    if(letter == 'a'){
        if(aside.classList.contains('hide')){
            aside.classList.remove('hide')
        }
        if(!currentClickedSelection ){
            lastFocusedSelection.focus()
        } else if (currentClickedSelection ){
            currentClickedSelection.focus()
        }
    }
    if(letter == 'enter'){
        aside.classList.toggle('hide')
        if (!currentClickedSelection) {
            lastFocusedSelection.focus()
        } else if (currentClickedSelection) {
            currentClickedSelection.focus()
        }
    }
})
nav.addEventListener('click', ()=>{
    aside.classList.toggle('hide')
})

addEventListener('keyup', e => {
    let letter = e.key.toLowerCase()
    if (letter == 'shift') {
        keys.shift.pressed = false
    }
})

function handleLessonsFocus(e,letter){
    if (letter === 'tab') {
        return; /* default Tab behavior work naturally Very important, lessons were not working,
         this makes the tab key work, Not Sure where this is breaking out to.
        */
    }
    const sectionContainaer = getSectionContainer(e.target.parentElement)
    const section = sectionContainaer.querySelector('.section') 
    const lessons = sectionContainaer.querySelectorAll('.sub-section > li > a')
    if(letter == 's'){   
        section.focus()
    }
    if(!isNaN(letter)){
        const intLetter = parseInt(letter)
        if(intLetter <= lessons.length){

            lessons[intLetter - 1].focus()
        }
    }
}
// handle shift key up
sections.forEach(el => {
    if (el.hasAttribute('autofocus')) {
        fetchLessonHref(el.href)
        sectionsFocused = true
    }
    el.addEventListener('focus', e => {
        sectionsFocused = true
        lessonsFocused = false
        iSection = [...sections].indexOf(el)
        lastFocusedSelection = el
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        hideSubSections()
        toggleSubSection(e)
        fetchLessonHref(e.target.href)
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if(sectionsFocused){
            handleSectionsFocus(letter)
        } else {
            return
        }
        if(letter == 'enter'){
            hideSubSections()
            toggleSubSection(e) 
            fetchLessonHref(e.target.href)           
        }
        
    })
})
lessons.forEach(el => {
    if(el.hasAttribute('autofocus')){
        fetchLessonHref(el.href)
        lessonsFocused = true
        currentClickedSelection = el
    }
    el.addEventListener('focus', e => {
        sectionsFocused = false
        lessonsFocused = true
        lastFocusedSelection = e.target

    })
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        fetchLessonHref(e.target.href)
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if (lessonsFocused) {
            handleLessonsFocus(e, letter)
        }
        if (letter == 'enter') {
            fetchLessonHref(e.target.href)
            if (e.target == currentClickedSelection) {
                mainTargetDiv.focus()
            }
            currentClickedSelection = e.target
        }
    })
})
function handleSectionsFocus(letter) {
    if(!isNaN(letter)){
        const intLetter = parseInt(letter)
        if(intLetter <= sections.length){
            sections[intLetter - 1 ].focus()
        }
    } 
    if (letter == 's') {
        if (!keys.shift.pressed) {
            iSection = (iSection + 1) % sections.length
        } else if (keys.shift.pressed) {
            iSection = (iSection - 1 + sections.length) % sections.length;            
        }
        console.log(iSection)
        sections[iSection].focus()
    }
}
function pageElementsFocus(letter){
    switch(letter){
        case 'b':
            backlink.focus()
            break
        case 'h':
            homelink.focus()
            break
        case 'r':
            regexCmds.focus()
            break
        case 'p':
            programShortcuts.focus()
            break
        case 't':
            tutorialLink.focus()
            break
        case 'm':
            mainTargetDiv.focus()
            break
        case 'n':
            nav.focus()
            break
    }
    scrollTo(0,0)
}
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if (letter === 'tab') {
        return; /* default Tab behavior work naturally Very important, lessons were not working,
         this makes the tab key work, Not Sure where this is breaking out to.
        */
    }
    if (letter == 'shift') {
        keys.shift.pressed = true
    }

    if (!pageStarted && letter == 's') {
        sections[0].focus()
        pageStarted = true
    }
    if(letter == 'a'){
        if(currentClickedSelection){
            currentClickedSelection.focus()
        } else {
            lastFocusedSelection.focus()
        }
        
    }
    
    pageElementsFocus(letter)

});
function getSectionContainer(parent){
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

function fetchLessonHref(href) {
    fetch(href)
        .then(response => response.text())
        .then(html => {
            // Inject the retrieved HTML into the target div
            mainTargetDiv.innerHTML = html;
            ////////////// This function is located in lesson-temp.js ////////////////////////////////////////////////////////////////////////////////////
            stepTxtListeners()
            addCopyCodes()
        })
        .catch(error => console.log('Error fetching content.html:', error));
}

