const nav = document.querySelector('nav.section-lesson-title')
const mainTargetDiv = document.querySelector('#mainTargetDiv')
const header = document.querySelector('header')
import { addCopyCodes } from "./copy-code-resources.js"
const aside = document.querySelector('aside')
const backlink = document.querySelector('#backlink')
const homelink = document.querySelector('#homelink')
const vsCodeShortRegex = document.querySelector('#vsCodeShortRegex')
const programShortcuts = document.querySelector('#programShortcuts')
const tutorialLink = document.querySelector('#tutorialLink')

const sections = document.querySelectorAll('.section')
const lessons = document.querySelectorAll('.section-container > ul > li > a')
let asideFocused = false;
let sectionsFocused = true
let lessonsFocused = false
let mainTargetDivFocus = false
let pageStarted = false
let iSection = 0
let iLesson = 0
export let lastFocusedSelection
export let lastClicked
const keys = {
    shift: {
        pressed: false
    }
}
aside.addEventListener('focusin', e => {
    asideFocused = true
})
aside.addEventListener('focusout', e => {
    asideFocused = false
    console.log('out')
})

function hideSubSections(){
    sections.forEach(el => {
        if(!el.classList.contains('show')){
            const sectionContainer = getSectionContainer(el.parentElement)
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
    if(subSection){
        subSection.classList.toggle('hide')
    }
}
// hideSubSections()

 function getSectionContainer(parent){
     if (parent.classList.contains('section-container')){
        return parent
    } else if (parent.parentElement){
        return getSectionContainer(parent.parentElement)
    } else {
        return null
    }
}
 function getSubSection(parent){
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
            // stepTxtListeners()
            addCopyCodes()
        })
        .catch(error => console.log('Error fetching content.html:', error));
}


mainTargetDiv.addEventListener('focusin', e => {
    // console.log('kljdf')
    console.log('mainTargetDiv focusin')

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

addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if (letter == 's' && !asideFocused) {
        // console.log('yes')
        if(!lastClicked){
            sections[0].focus()
        } else {
            lastClicked.focus()
        }
    } 
    elIdsFocus(e)
    if(letter == 'r'){vsCodeShortRegex.focus()}

});

function sectionsCycles(shiftKey = false) {
    console.log(shiftKey)
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
sections.forEach(el => {
    el.addEventListener('focus', e => {
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

    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        let sectionContainer = getSectionContainer(e.target.parentElement)
        let lessons = sectionContainer.querySelectorAll('ul.sub-section  > li > a')
        if(lessons[0]){
            if(letter == 'a' && sectionsFocused){
                lessons[0].focus()
            }
        }
        if (!isNaN(letter)) {
            let intLet = parseInt(letter)
            if (sections[intLet - 1]) {
                sections[intLet - 1].focus()
            }
        }
        if(letter == 's' && sectionsFocused){
            let lesson = sectionContainer.querySelector('.section-container > ul > li > a')
            let isShiftPressed = e.shiftKey
            sectionsCycles(e.shiftKey)          
        }
        
    })
})

lessons.forEach(el => {
    el.addEventListener('focus', e => {
        sectionsFocused = false
        lessonsFocused = true
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        fetchLessonHref(e.target.href)
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        let sectionContainer = getSectionContainer(e.target.parentElement)  
        let subSection = sectionContainer.querySelector('.sub-section')
        let lessons = subSection.querySelectorAll('ul  > li > a') 
        if(lessons){
            if(!isNaN(letter)){
                console.log(letter)
                let intLet = parseInt(letter)
                console.log(lessons[intLet - 1])
                if(lessons[intLet - 1]){
                    lessons[intLet - 1].focus()
                }
            }
            if(letter == 's' && lessonsFocused){
                let section = sectionContainer.querySelector('.section')
                section.focus()
                
            }
        }
        
    })
})