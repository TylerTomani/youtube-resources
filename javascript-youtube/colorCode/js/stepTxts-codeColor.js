import { mainTargetDivFocused } from "./letterFocus-sidebar.js"
import { mainTargetDiv } from "./letterFocus-sidebar.js";
import { sideBar } from "./toggle-sidebar.js"
import { parts } from "./letterFocus-sidebar.js"
import { enterConsoleFocus } from "./letterFocus-sidebar.js";
export let lastStep = null
export let stepFocused
export function stepTxtsFocus() {
    const steps = document.querySelectorAll('.steps-container > .step , .step-float , .step-col3')
    // const tabIndexElements = document.querySelectorAll('.copy-code, textarea')
    // Maybe just keep text area with focus
    const tabIndexElements = document.querySelectorAll('.copy-code')
    const  imgVids = document.querySelectorAll('.step-img > img, .step-vid, video')
    const sectionLessonTitle = document.querySelector('nav.section-lesson-title > h1')
    const hiddenH3 = document.querySelector('.header-codeColor-lesson h3')
    const endNxtLesson = document.querySelector('#endNxtLesson')
    let currentWidth
    let partsFocused = false
    sectionLessonTitle.innerText = hiddenH3.innerText
    currentWidth = innerWidth
    addEventListener('resize', e => {currentWidth = innerWidth})
    mainTargetDiv.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if (letter == 'm' && lastStep) {
            lastStep.focus()
        }

    })
    mainTargetDiv.addEventListener('focusin', e => {
        partsFocused = false
        // mainTargetDivFocused = true

    })
    endNxtLesson.addEventListener('keydown', e =>{
        let letter = e.key.toLowerCase()
        if(letter == 'm'){
            mainTargetDiv.focus()
            scrollTo(0,0)
            
        }
        
    })
    parts.forEach(el => {
        el.addEventListener('focus', e => {
            partsFocused = true
        })
    })
    imgVids.forEach(imgVid =>{
        imgVid.addEventListener('click', e =>{
            e.preventDefault()
            toggleImgVid(e)
        })
    })    
    tabIndexElements.forEach(el => {
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if (letter == 'enter') {
                e.stopPropagation()
                toggleImgVid(e)
            }
        })
        el.addEventListener('focus', e => {
            deenlargeAllImgVid()
        })
    })
    steps.forEach(el => {
        el.addEventListener('focus', e => {
            removeAllTabIndexes()
            deenlargeAllImgVid()
            lastStep = e.target
        })
        
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if(letter == 'enter'){   
                toggleImgVid(e)
                addTabIndexes(e)
            }
        })
    })
    function toggleImgVid(e){
        const step = getStep(e.target)
        const img = step.querySelector('img')
        if(img){
            img.classList.toggle('enlarge')
        }
        
        if(currentWidth <= 721 && currentWidth >= 601){
            if(img.classList.contains('enlarge')){
                sideBar.classList.add('deactive')
            } else {
                sideBar.classList.remove('deactive')
                
            }
        }
        if (currentWidth <= 600) {
            if (img.classList.contains('enlarge')) {
                sideBar.classList.add('deactive')
            }
        }
        

    }
    function addTabIndexes(e){
        const tabEls = e.target.querySelectorAll('.copy-code, textarea')
        tabEls.forEach(el => {
            el.setAttribute('tabindex', '0')
        })
    }
    function removeAllTabIndexes(){
        tabIndexElements.forEach(el => {
            el.setAttribute('tabindex', '-1')
        })
    }
    function deenlargeAllImgVid(){
        imgVids.forEach(el => {
            if(el.classList.contains('enlarge')){
                el.classList.remove('enlarge')
            }
        })
    }
    addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        
        if(letter == 'm'){
            if(!mainTargetDivFocused && lastStep){    
                lastStep.focus()
            } else {
                // mainTargetDiv.focus()
            }
        }
        if(!mainTargetDivFocused){
        }
        if (!e.metaKey && (e.shiftKey && letter == 'c')) {
            e.preventDefault()
            const enterConsole = document.querySelector('#enterConsole')
            if(enterConsole){
                enterConsole.focus()
            } else{

                const chagGpt = document.querySelector('#chatGpt')
                chagGpt.scrollIntoView({behavior: 'smooth', block: 'center'})
            }
        }
        // xyz
        if (!isNaN(letter) && !enterConsoleFocus) {
            if(!partsFocused){
                let intLet = parseInt(letter)
                if (intLet <= steps.length) {
                    steps[intLet - 1].focus()
                } else {
                    
                    endNxtLesson.focus()
                }
            }
        }
    })
    
}

function getStep(parent){
    // if(parent.classList.contains('step')){
    if (parent.classList.contains('step') || parent.classList.contains('step-float')){
        return parent
    } else if (parent.parentElement){
        return getStep(parent.parentElement)
    } else {
        return null
    }
}

// DELETE THIS when side bar works
stepTxtsFocus()