export const nav = document.querySelector('nav.section-lesson-title')
export const mainTargetDiv  = document.querySelector('#mainTargetDiv')
export const aside = document.querySelector('aside')
export const header = document.querySelector('header')
import { sections } from './sections-fcc.js'
import { lessons } from './sections-fcc.js'
export let targetDivFocusIN = false
import { getSubSection } from './sections-fcc.js'
import { currentClickedSelection } from './sections-fcc.js'
import { lastFocusedSelection } from './sections-fcc.js'
export function stepTxtListeners(){
    const allImages = document.querySelectorAll('.step-img > img') ? document.querySelectorAll('.step-img > img') : document.querySelectorAll('.step-video > video')
    const stepTxts = document.querySelectorAll('.step-txt')
    const nxtLesson = document.getElementById('nxtLesson')
    const copyCodes = document.querySelectorAll('.copy-code') 
    const codesStepTxtCol = document.querySelectorAll('.step-txt > .code-container .copy-code ')
    const pAs = document.querySelectorAll('p a') 
    let colCodesFocused = false
    let currentStepIndex = 0
    let imgIndex = 0
    allImages.forEach(el => {
        el.addEventListener('click', e => {
            e.target.classList.toggle('enlarge')
        })
    })
    sections.forEach(el => { el.addEventListener('focus', e => { targetDivFocusIN = false }) })
    lessons.forEach(el => { el.addEventListener('focus', e => { targetDivFocusIN = false }) })
    pAs.forEach(el => {el.setAttribute('tabindex','-1')})
    if(nxtLesson){
        nxtLesson.addEventListener('click', e => {
            const subSection = getSubSection(currentClickedSelection)
            const lessons = subSection.querySelectorAll('li > a')
            let index
            if (subSection) {
                if (!currentClickedSelection) {
                    lastFocusedSelection.focus()
                } else if (currentClickedSelection) {
                    let index = [...lessons].indexOf(currentClickedSelection)
                    if(lessons[index + 1]){
                        lessons[index + 1].focus()
                    } else {
                        // make this so it goes to next section
                        currentClickedSelection.focus()
                        
                    }
                }
            }
        })   
    }
    // This is overkill, target is set to _blank in html
    function openNewTab(e) {open(e.target.href, '_blank')}
    // this redundancy make it work, i think only focus out and keydown is needed but did overkill on this
    mainTargetDiv.addEventListener('focus', e => {targetDivFocusIN = true})
    mainTargetDiv.addEventListener('focusin', e => {targetDivFocusIN = true})
    mainTargetDiv.addEventListener('keydown', e => {targetDivFocusIN = true})
    mainTargetDiv.addEventListener('focusout', e => {
        targetDivFocusIN = false
        denlargeAllImages()

    })
    nav.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        stepFocus(letter)
    })
    function stepFocus(letter) {
        const intLetter = parseInt(letter)
        if (intLetter <= stepTxts.length) {
            denlargeAllImages()
            stepNumberFocus(intLetter)
        } else {
            if(nxtLesson){
                nxtLesson.focus()
            }
        }
    }
    function stepNumberFocus(intLetter) {
        stepTxts[intLetter - 1].focus()
    }
    // The code below handle img enlarge and code within step txt
    
    copyCodes.forEach(el => {
        el.addEventListener('focus', e => {
            denlargeAllImages()
        })
    })
    
    function denlargeAllImages() {
        allImages.forEach(el => {
            el.style.zIndex = "0"
            if (el.classList.contains('enlarge')) {
                el.classList.remove('enlarge')
            }
            if (el.classList.contains('enlarge-col')) {
                el.classList.remove('enlarge-col')
            }
            if (el.classList.contains('enlarged-lg')) {
                el.classList.remove('enlarge-col')
            }
        })
    }    
    function handleStepTabIndex(e) {
        // const stepTxt = getStepTxt(e.target.parentElement)
        const copyCodes = e.target.querySelectorAll('.code-container > .copy-code')
        const as = e.target.querySelectorAll('p a')
        copyCodes.forEach(el =>{
            addTabs(el)
        })
        as.forEach(el => addTabs(el))
    }
    function handleStepCOLTabIndex() {
        const copyCodes = e.target.querySelectorAll('.code-container > .copy-code')
        copyCodes.forEach(el => addTabs(el))
    }
    function addTabs(el) {el.setAttribute('tabindex', '0')}
    function removeTabs(el) {el.setAttribute('tabindex','-1')}
    function removeAllTabs() {
        copyCodes.forEach(el => { el.setAttribute('tabindex','-1') })
        pAs.forEach(el => { el.setAttribute('tabindex','-1') })
    }
    function getStepContainer(parent) {
        if (parent.classList.contains('step')) {
            return parent
        } else if (parent.parentElement) {
            return getStepContainer(parent.parentElement)
        } else {
            return null
        }
    }
    function getStepColContainer(parent) {
        if (parent.classList.contains('step-col')) {
            return parent
        } else if (parent.parentElement) {
            return getStepColContainer(parent.parentElement)
        } else {
            return null
        }
    }

    
    stepTxts.forEach(el => {
        el.addEventListener('focus', e => {
            removeAllTabs()
            imgIndex = 0
            currentStepIndex = [...stepTxts].indexOf(e.target)
            console.log(currentStepIndex)
            // el.scrollIntoView()
        })
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if (letter == 'enter') {
                handleImgSize(e)
                handleStepTabIndex(e)

            }
            if (letter == 'tab') {
                denlargeAllImages()
            }
        })
    })
    // This will handle img and video size enlarge and denlarge
    function handleImgSize(e) {
        const step = getStepContainer(e.target.parentElement)
        const stepCol = getStepColContainer(e.target.parentElement)
        if (step) {
            toggleStepImgSize(step)
        }
        if (stepCol) {
            toggleStepColImages(stepCol)
        }
    }
    function toggleStepColImages(stepCol) {
        const imgContainer = stepCol.querySelector('.img-container')
        const images = imgContainer.querySelectorAll('.step-img > img')
        const img = images[imgIndex]
        // imgIndex = (imgIndex +  )
        denlargeAllImages()
        if (imgIndex < 2) {
            img.classList.add('enlarge-col')
            img.style.zIndex = '1'
            // img.scrollIntoView({ behavior: 'smooth', block: 'end' })
            // scrollTo(0, 2000)

        } else {
            stepCol.focus()
            // stepCol.scrollIntoView()
        }
        imgIndex = (imgIndex + 1) % (images.length + 1)
    }

    function toggleStepImgSize(step) {
        const stepImg = step.querySelector('.step-img')
        const img = stepImg.querySelector('img')
        img.style.zIndex = "1"
        if(!img.classList.contains('lg-enlarge')){
            img.classList.toggle('enlarge')
        } else if(img.classList.contains('lg-enlarge')){
            img.classList.toggle('enlarged-lg')
        }
    }
    addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if (targetDivFocusIN) {
            let letter = e.key.toLowerCase()
            if (!isNaN(letter)) {
                stepFocus(letter)

            }
            if (letter == 'e') {
                nxtLesson.focus()
            }
            // const rect = stepTxts[currentStepIndex].getBoundingClientRect()
            // scrollTo(0, rect.y * .5)
            if(stepTxts.length > 0){
                stepTxts[currentStepIndex].scrollIntoView({block: 'center'})
            }
        }

        if (letter == 'e') {

            nxtLesson.focus()
            nxtLesson.scrollIntoView()
        }

    });
     
}