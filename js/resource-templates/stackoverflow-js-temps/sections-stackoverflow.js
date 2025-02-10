import { nav, stepTxtListeners } from "./lessons-temp-stackoverflow.js"
import { lastStep } from "./lessons-temp-stackoverflow.js"
const navBar = document.querySelector('nav.section-lesson-title')
const mainTargetDiv = document.querySelector('#mainTargetDiv')
const header = document.querySelector('header')
import { addCopyCodes } from "../copy-code-resources.js"
const aside = document.querySelector('aside')
const backlink = document.querySelector('#backlink')
const homelink = document.querySelector('#homelink')
const vsCodeShortRegex = document.querySelector('#vsCodeShortRegex')
const programShortcuts = document.querySelector('#programShortcuts')
const tutorialLink = document.querySelector('#tutorialLink')
export  const sections = document.querySelectorAll('.section')
export const lessons = document.querySelectorAll('.section-container > ul > li > a')
let asideFocused = false;
let sectionsFocused = true
let lessonsFocused = false
let mainTargetDivFocus = false
let pageStarted = false
let iSection = 0
let iLesson = 0
export let lastClickedLesson
export let lastClickedSection
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
            addCopyCodes()
        })
        .catch(error => console.log('Error fetching content.html:', error));

}
navBar.addEventListener('click', e => {aside.classList.toggle('hide')})
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
    console.log('click')
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
mainTargetDiv.addEventListener('focusin', e => {

})
function elIdsFocus(e) {
    const letter = e.key.toLowerCase();
    const elIds = document.querySelectorAll('[id]');
    elIds.forEach(el => {
        if (letter === el.id[0]) {
            el.focus();
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
        if(lessons[0]){
            if(letter == 'a' && sectionsFocused){
                lessons[0].focus()
                if(!lastClickedLesson){
                } 
                // else 
                // lastClickedLesson.focus()
            }
        }
        if (!isNaN(letter)) {
            let intLet = parseInt(letter)
            sections[intLet - 1].focus()
            if (sections[intLet - 1]) {
            }
        }
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
lessons.forEach(el => {
    if(el.hasAttribute('autofocus')){
        fetchLessonHref(el.href)
        lastClickedLesson = el
        const subSection = getSubSection(el.parentElement)
        const lessons = subSection.querySelectorAll('li > a')
        lessonsFocused = true
        sectionsFocused = false
    }
    el.addEventListener('focus', e => {
        sectionsFocused = false
        lessonsFocused = true
        // iLesson = [...lessons].indexOf(el)
        // iLesson += 1
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        fetchLessonHref(e.target.href)
        if(e.target == lastClickedLesson){
            mainTargetDiv.scrollIntoView({behavior:'instant', block:'center'})
        }
        lastClickedLesson = e.target
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
                lessonsCycle(lessons,e.shiftKey)
            }
            // if(letter == 'enter' ){ 
                
            // }   
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
    lessons[iLesson].scrollIntoView({ behavior: 'instant', block: 'center' })
    lessons[iLesson].focus()
}
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()   
    if (letter == 's' && !asideFocused) {
        if(lastClickedSection){
            lastClickedSection.focus()
        }
         else if(lastClickedLesson){
            lastClickedLesson.scrollIntoView({ behavior: 'instant', block: 'center' })
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
    elIdsFocus(e)
    if (letter == 'r') { vsCodeShortRegex.focus() }
    if (letter == 'a' || letter == 's') {
        if (aside.classList.contains('hide')) {
            aside.classList.remove('hide')
        } 
    }
    if(aside.classList.contains('hide')){
        const toggleSideBtmBtn = document.querySelector('#toggleSideBtmBtn')
        toggleSideBtmBtn.classList.add('active')
    } else toggleSideBtmBtn.classList.remove('active')
    
});
/// I don't know if i need this here
stepTxtListeners()