export const nav = document.querySelector('nav.section-lesson-title')
export const mainTargetDiv  = document.querySelector('#mainTargetDiv')
export const aside = document.querySelector('aside')
export const header = document.querySelector('header')
export let targetDivFocusIN = false
export let lastStep
import { getSubSection }  from './sections-stackoverflow.js'
import { lastClickedLesson }  from './sections-stackoverflow.js'
import { lastClickedSection }  from './sections-stackoverflow.js'
import { sections } from './sections-stackoverflow.js'
import { lessons } from './sections-stackoverflow.js'
export function stepTxtListeners(){
    let playing = false
    const allImages = document.querySelectorAll('.step-img > img') 
    const stepTxts = document.querySelectorAll('.step-txt')
    const allVideos = document.querySelectorAll(".step-vid > video")
    let stepTxtsFocused =false
    const endNxtLesson = document.getElementById('endNxtLesson')
    const copyCodes = document.querySelectorAll('.copy-code') 
    const codesStepTxtCol = document.querySelectorAll('.step-txt > .code-container .copy-code ')
    const pAs = document.querySelectorAll('p a') 
    let colCodesFocused = false
    let currentStepIndex = 0
    let imgIndex = 0
    allImages.forEach(el => {
        el.addEventListener('click', e => {
            handleImgSize(e)
            handleStepTabIndex(e)
            addTabs(e.target)
            // addTabs(e.target)
        })
    })
    // sections.forEach(el => { el.addEventListener('focus', e => { targetDivFocusIN = false }) })
    // lessons.forEach(el => { el.addEventListener('focus', e => { targetDivFocusIN = false }) })
    pAs.forEach(el => {el.setAttribute('tabindex','-1')})
    if(endNxtLesson){
        endNxtLesson.addEventListener('click', e => {
            const subSection = getSubSection(lastClickedLesson)
            // const lessons = subSection.querySelectorAll('li > a')
            
            if(aside.classList.contains('hide'))  {
                aside.classList.remove('hide')
            }
            lastClickedLesson.focus()
            scrollTo(0,0)
        })   
    }
    // This is overkill, target is set to _blank in html
    function openNewTab(e) {open(e.target.href, '_blank')}
    // this redundancy make it work, i think only focus out and keydown is needed but did overkill on this
    mainTargetDiv.addEventListener('focus', e => {
        targetDivFocusIN = true
        stepTxtsFocused = false
    })
    mainTargetDiv.addEventListener('focusin', e => {targetDivFocusIN = true})
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
            // denlargeAllImages()
            stepNumberFocus(intLetter)
        } else {
        }
    }
    function stepNumberFocus(intLetter) {stepTxts[intLetter - 1].focus()}
    // The code below handle img enlarge and code within step txt
    copyCodes.forEach(el => {
        el.addEventListener('focus', e => {
            // denlargeAllImages()
        })
    })
    function handleStepTabIndex(e) {
        // const stepTxt = getStepTxt(e.target.parentElement)
        const copyCodes = e.target.querySelectorAll('.code-container > .copy-code')
        const as = e.target.querySelectorAll('p a')
        copyCodes.forEach(el =>{
            addTabs(el)
        })
        as.forEach(el => addTabs(el))
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
    function getStep(parent) {
        if (parent.classList.contains('step')) {
            return parent
        } else if (parent.parentElement) {
            return getStep(parent.parentElement)
        } else {
            return null
        }
    }
    stepTxts.forEach(el => {
        el.addEventListener('focusout', e => {
        })
        el.addEventListener('focus', e => {
            removeAllTabs()
            lastStep = e.target
            stepTxtsFocused = true
            imgIndex = 0
            currentStepIndex = [...stepTxts].indexOf(e.target)
        })
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if (letter == 'enter') {
                handleImgSize(e)
                handleStepTabIndex(e)
                addTabs(e.target)
                // handleVideos(e)
            }
            if (letter == 'tab') {
            }
        })
    })
    // This will handle img and video size enlarge and denlarge
    function handleImgSize(e) {
        const step = getStepContainer(e.target.parentElement)
        
        if (step) {
            toggleStepImgSize(step)
        }
    }
    function denlargeAllImages() {
        // if (aside.classList.contains('hide')) {
        //     aside.classList.remove('hide')
        // }
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
    function toggleStepImgSize(step) {
        const stepImg = step.querySelector('.step-img')
        if(stepImg){
            const img = stepImg.querySelector('img') ? stepImg.querySelector('img') : stepImg.querySelector('video')
            if (img) {
                img.style.zIndex = "1"
                img.classList.toggle('enlarge')
                if(img.classList.contains('enlarge')){
                    aside.classList.add('hide')
                } else aside.classList.remove('hide')
            }

        }
    }
    function toggleStepColImages(stepCol) {
        const imgContainer = stepCol.querySelector('.img-container')
        const images = imgContainer.querySelectorAll('.step-img > img')
        const img = images[imgIndex]
        // denlargeAllImages()
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
    addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if (targetDivFocusIN) {
            let letter = e.key.toLowerCase()
            if(!isNaN(letter)) {
                stepFocus(letter)
            }
            if(stepTxts.length > 0){
                stepTxts[currentStepIndex].scrollIntoView({block: 'center'})
            }
            if(letter == 'n'){
                nav.focus()
                scrollTo(0,0)   
            }     
        }
        if (letter == 'm' && lastStep) {
            lastStep.focus()
        }       
        if(letter == 'e' && endNxtLesson){
            endNxtLesson.scrollIntoView({behavior:'instant',block:'center'})   
        }
    });
    
    function handleVideos(e) {
        const step = getStep(e.target.parentElement)
        const vid = step.querySelector('.step-vid > video')
        if(vid){
            vid.classList.toggle('enlarge-play-vid')
            handleAsideWithImg(vid)
            playPauseVideo(e,vid)
        }

    }
    function playPauseVideo(e,vid){
        // if (vid.classList.contains('enlarge-play-vid')){
        //     vid.play()
        // } else {
        //     vid.pause()
        // }
        let key = e.keyCode
        console.log(key)
        switch (key) {
            case 32:
                e.preventDefault()
                // 
                if (!playing) {
                    vid.play()
                    vid.style.border = "2px solid blue"
                } else if (!playing) {
                    vid.pause()
                    vid.style.border = "1px dotted red"
                }
                playing = !playing
                break;
            // left arrow
            case 37:
                e.preventDefault()
                if (vid.currentTime > 0) {
                    vid.currentTime = vid.currentTime - 1
                }
                if (vid.currentTime < vid.duration) {
                    vid.style.border = '2px solid blue'
                }
                break
            case 39:
                vid.currentTime = vid.currentTime + 2
                if (vid.currentTime >= vid.duration) {
                    vid.style.border = '14px solid red'
                    vid.pause()
                    vid.currentTime = vid.duration()
                }
                break
            default:
                playing = !playing
        }
        if (playing) {
            vid.play()
            vid.style.border = "1px solid blue"
        } else if (!playing) {
            vid.pause()
            vid.style.border = "1px dotted red"
        }
        

    }
    
}

stepTxtListeners()
