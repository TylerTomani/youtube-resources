import { lastFocusedElement } from "./side-sections-temp.js"
import { getSectionContainer } from "./side-sections-temp.js"
import { mainAside } from "./side-sections-temp.js"
import { showAside } from "./side-sections-temp.js"
import { hideAside } from "./side-sections-temp.js"
import { getSubSection } from "./side-sections-temp.js"
import { sections,lessons } from "./side-sections-temp.js"
import { header } from "./side-sections-temp.js"
let iSection = 0
let iMainCode = 0
let currentSection
export let stepTxts = document.querySelectorAll('.step-txt')
export function stepTxtListeners(){
    const navbar = document.querySelector('.section-lesson-title')
    stepTxts = document.querySelectorAll('.step-txt')
    const allImages = document.querySelectorAll(".step-img > img")
    const allVideos = document.querySelectorAll(".step-vid > video")
    const allStepTxtPAs = document.querySelectorAll('.step-txt > p > a')
    const copyCodes = document.querySelectorAll('.step-txt > .code-container > .copy-code')
    const nextLesson = document.getElementById('nxtLesson') ? document.getElementById('nxtLesson') : null
    const targetDiv = document.getElementById('targetDiv')
    const stepTxtInsCopyCodes = document.querySelectorAll('.step-txt-in > .code-container > .copy-code')
    const keys = {
        meta: {
            pressed: false
        }
    }
    const mainCodes = document.querySelectorAll('.main-code')
    let iMainCodes
    let mainCodesFocused = false
    let targetDivFocus = false
    let stepFocused = false
    let playing = false
    
    sections.forEach(el => {
        el.addEventListener('focus', e => {
            mainCodesFocused = false
            stepFocused = false
        })

        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if(letter == 'c' && !keys.meta.pressed){
                const mainCode = document.querySelector('#mainCode')
                if (mainCode && !mainCodesFocused && !stepFocused) {
                    mainCode.focus()
                }
            }
            
        })
    })
    lessons.forEach(el => {
        el.addEventListener('focus', e => {
            mainCodesFocused = false
            stepFocused = false
        })
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if (letter == 'c' && !keys.meta.pressed ){
                const mainCode = document.querySelector('#mainCode')
                if(mainCode && !mainCodesFocused){
                    mainCode.focus()
                }
            }
            
        })
    })
    header.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if (letter == 'c' && !keys.meta.pressed) {
            if (mainCodes.length > 0) {
                mainCodes[iMainCode].focus()
            }
        }
    })
    navbar.addEventListener('keydown',e =>{
        let letter = e.key.toLowerCase()
        if(letter == 'e'){
            if(nextLesson){
                nextLesson.focus()
            }   
        }
        if(!isNaN(letter)){
            let intLetter = parseInt(letter)
            if(mainAside.classList.contains('hide')){
                stepNumFocus(intLetter)
            } else {
                // sections[intLetter - 1].focus()
                stepNumFocus(intLetter)
            }
        }  
        if (letter == 'c' && !keys.meta.pressed) {
            if (mainCodes.length > 0) {
                mainCodes[iMainCode].focus()
            }
        }

    })
    function getStep(parent) {
        if (parent.classList.contains('step') || parent.classList.contains('step-col')) {
            return parent
        } else if (parent.parentElement) {
            return getStep(parent.parentElement)
        } else {
            return null
        }
    }
    // copy code & a elements handling
    function handleCopyCodes(e) {
        const step = getStep(e.target.parentElement)
        const copyCodes = step.querySelectorAll('.step-txt > .code-container > .copy-code')
        addTabIndex(copyCodes)
    }
    allStepTxtPAs.forEach(el => {
        el.addEventListener('focus', () => {
            denlargeAllImages()
            denlargeAllImages()
        })
        el.addEventListener('focusin', () => {
            denlargeAllImages()
        })
        el.addEventListener('click', e => {
            e.preventDefault()
            open(e.target.href, '_blank')
        })
    })
    function addTabIndex(els){
        els.forEach(el => {
            el.setAttribute('tabindex','0')
        })
    }
    function removeAllTabIndex(){
        allStepTxtPAs.forEach(el => {
            el.setAttribute('tabindex','-1')
        })
        copyCodes.forEach(el => {
            el.setAttribute('tabindex','-1')
        })
    }
    // image handling
    allImages.forEach(el => {
        el.addEventListener('click', e => {
            toggleImgSize(e = e.target)
        })
    })

    /** Go BACK and ADD video denlarge here!!!! */
    function denlargeAllImages() {
        if(!keys.meta.pressed){
            allImages.forEach(el => {
                if (el.classList.contains('enlarge')) {
                    el.classList.remove('enlarge')
                }
            })
            allVideos.forEach(el => {
                if (el.classList.contains('enlarge-vid')) {
                    el.classList.remove('enlarge-vid')
                    el.pause()
                }
            })
        }
    }
    mainCodes.forEach(el => {
        el.addEventListener('focus', e => {
            mainCodesFocused = true
            stepFocused = false
            iMainCode = [...mainCodes].indexOf(e.target)
        });
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if ((letter == 'c' && !keys.meta.pressed) && mainCodesFocused) {
                console.log(iMainCode)
                e.preventDefault()
                iMainCode = (iMainCode + 1) % mainCodes.length
                mainCodes[iMainCode].focus()
                console.log(mainCodes[iMainCode])
            }
        });
    })
    stepTxts.forEach(el => {    
        el.addEventListener('focus', e => {
            mainCodesFocused = false
            stepFocused = true
            removeAllTabIndex()
            denlargeAllImages()
            pauseAllVideos()
            e.target.scrollIntoView({ behavior: "smooth", block: "center", inline: "end" });
        })
        el.addEventListener('focusout', e => {
            denlargeAllImages()
        })
        el.addEventListener('click', e => {
            e.preventDefault()
            denlargeAllImages()
            toggleImgSize(e)
            handleVideo(vid)
            pauseAllVideos()
            
        })
        el.addEventListener('keydown', e => {
            let key = e.keyCode
            let letter = e.key.toLowerCase()
            const stepTxt = e.target
            const as = stepTxt.querySelectorAll('a')
            const step = getStep(stepTxt.parentElement)
            const vid = step.querySelector('.step-vid > video')
            if (vid) {
                handleVideo(vid, key,e)
                videoPlayKeyDown(vid, key, e)
            }
            if(key === 13){
                addTabIndex(as)
                handleCopyCodes(e)
                if(step){
                    const img = step.querySelector('.step-img > img')
                    handleImg(img, key, e)
                }
            } 
            if((letter == 'c' && !keys.meta.pressed) &&  stepFocused && !mainCodesFocused){
                if(step.parentElement.classList.contains('step-col')){
                    const mainCode = step.parentElement.querySelector('.main-code')
                    mainCode.focus()

                }
            }
        })    
    })
    stepTxtInsCopyCodes.forEach(el => {    
        
        el.addEventListener('keydown', e => {
            let key = e.keyCode
            let letter = e.key.toLowerCase()
            const stepTxt = e.target
            const as = stepTxt.querySelectorAll('a')
            const step = getStep(stepTxt.parentElement)
            const vid = step.querySelector('.step-vid > video')
            const img = step.querySelector('.step-img > img')
            if (vid) {
                handleVideo(vid, key,e)
                videoPlayKeyDown(vid, key, e)
            }
            if(key === 13){
                addTabIndex(as)
                handleCopyCodes(e)
            }      
            if(img){
                handleImg(img,key, e)
            }
            // if(letter == 'c' && !stepFocused && mainCodesFocused){
            //     if(mainCodes.length > 0){
            //         mainCodes[iMainCode].focus()
            //         iMainCode = (iMainCode + 1) % mainCodes.length
            //     }
            // }
            
        })    
    })
    function handleImg(vid, key, e) {
        if (key == 13) {
            if (e.target.classList.contains('step-txt')) {
                toggleImgSize(vid, true, e)
            }
            if (e.target.classList.contains('main-code')) {
                toggleImgSize(vid, true,e)
            }

        }
    }
    function toggleImgSize(img,zoomBack,e) {
        if (!zoomBack) {
            if (!img.classList.contains('enlarge')) {
                img.classList.add('enlarge')
                hideAside()
                img.style.zIndex = 10
                // img.scrollIntoView({ behavior: "instant", block: "center", inline: "end" });
            } else {
                // e.target.scrollIntoView({ behavior: "smooth", block: "center", inline: "end" });
                img.classList.remove('enlarge')
                img.style.zIndex = 0
            }
        } else {
            if (!img.classList.contains('enlarge')) {
                img.classList.add('enlarge')

                // img.scrollIntoView({ behavior: "smooth", block: "center", inline: "end" });
                img.style.zIndex = 10
            } else {
                e.target.scrollIntoView({ behavior: "smooth", block: "center", inline: "end" });
                img.classList.remove('enlarge')
                img.style.zIndex = 0
            }
        }

    }
    // video handling
    
    allVideos.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault()
            let vid = e.target
            console.log(vid)
        
            videoPlayClick(vid)
            // console.log(e.target)
            if(!vid.play){
                denlargeAllImages()
            }
        })
    })
    function videoPlayClick(vid) {
        console.log(vid)
        console.log(playing)
        toggleVideoSize(vid)
        playPauseVideo(vid)
    }
    function handleVideo(vid,key,e){
        if(key == 13){
            if(e.target.classList.contains('step-txt')){
                toggleVideoSize(vid,false)
            } 
            if(e.target.classList.contains('main-code')){
                toggleVideoSize(vid, true,e)
            }
            
        }
    }
    function toggleVideoSize(vid,zoomBack,e){
        if(!zoomBack){
            if (!vid.classList.contains('enlarge-vid')) {
                vid.classList.add('enlarge-vid')
                vid.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
                playing = true
                // console.log(key)
            } else {
                vid.classList.remove('enlarge-vid')
                playing = false
            }
        } else {
            if (!vid.classList.contains('enlarge-vid')) {
                vid.classList.add('enlarge-vid')
                vid.scrollIntoView({ behavior: "smooth", block: "center", inline: "end" });
                playing = true
                // console.log(key)
            } else {
                e.target.scrollIntoView({ behavior: "smooth", block: "center", inline: "end" });
                vid.classList.remove('enlarge-vid')
                playing = false
            }
        }
    }
    function videoPlayKeyDown(vid,key,e){
        if (key == 32) {
            e.preventDefault()
            playing = !playing
        }
        if (key == 37) {
            e.preventDefault()
            vid.currentTime -= 2
        }
        if (key == 39) {
            e.preventDefault()
            if (vid.currentTime < vid.duration) {
                vid.currentTime += 2
            } else {
                vid.pause()
                // denlargeAllImages()
            }
        }
        playPauseVideo(vid)
    }
    function playPauseVideo(vid){
        if (playing) {
            vid.play()
            vid.style.border = '1px solid green'
        } else{
            vid.style.border = '1px solid blue'
            vid.pause()
        } 
        if (vid.currentTime == vid.duration) {
            vid.style.border = '2px solid red'
            playing = false
            vid.pause()
        }
    }
    function pauseAllVideos(){
        allVideos.forEach(el => {
            el.pause()
            el.style.border = '1px solid blue'
        })
    }
    // Numpad focus to invidiual steps txt focus
    addEventListener('keyup', e => {
        let letter = e.key.toLowerCase()
        if(letter == 'meta'){
            keys.meta.pressed = false
        }
    })
    targetDiv.addEventListener('focus', e => { targetDivFocus = true })
    targetDiv.addEventListener('focusin', e => { targetDivFocus = true })
    targetDiv.addEventListener('focusout', e => {
        targetDivFocus = false
        denlargeAllImages()

    })
    targetDiv.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        let key = e.keyCode
        if(letter == 'p'){
            targetDivFocus = true
            
        }
        
        if (letter == 'c' && !keys.meta.pressed ) {
            if(mainCodes.length > 0){
                mainCodes[iMainCode].focus()
            }
        }
        if (letter == 'e') {
            if (nextLesson) {
                nextLesson.focus()
            }
        }   
        if(letter == 'meta'){
            keys.meta.pressed = true        
        }
        if(letter != 'n'){
            if(!isNaN(letter)){
                denlargeAllImages()
                pauseAllVideos()
            }

        }
            
        if(targetDivFocus){
            if(!isNaN(letter) && key != 32 ){
                let intLetter = parseInt(letter)
                if(intLetter > stepTxts.length){
                    nextLesson.focus()
                } else {
                }
                stepNumFocus(intLetter)
            } else {
                if(letter == 'e'){
                    if(nextLesson){
                        nextLesson.focus()
                    } else {
                        stepTxts[stepTxts.length - 1 ].focus()
                    }
                }        
            }
        }            
        if(key === 32 && playing){
            // e.preventDefault()
        }
    });

    // The playing variable is asscoiated with img size so it is placed in here
    if(nextLesson){
        nextLesson.addEventListener('focus', e => {
            removeAllTabIndex()
        })
        nextLesson.addEventListener('click', e => {
            const subSection = getSubSection(lastFocusedElement)
            showAside()
            if(subSection){
                const lessons = subSection.querySelectorAll('li > a')
                let iLesson = [...lessons].indexOf(lastFocusedElement) + 1
                if(lessons[iLesson]){
                    lessons[iLesson].focus()
                } else {
                    lastFocusedElement.focus()
                }
            } else {
                console.log(currentSection)
                if(sections[iSection + 1]){
                    sections[iSection + 1].focus()
                } else {
                    sections[0].focus()
                }
            }        
        })
        nextLesson.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if(letter == 'c'){
                if(mainCodes.length > 0){
                    // console.log('slkjd')
                    // console.log(mainCodes[0])
                    mainCodes[iMainCode].focus()
                } else {
                    const mainCode = document.querySelector('#mainCode')
                    mainCode.focus()
                }
            }
            if(letter == 'a'){
                lastFocusedElement.focus()
            }
            if(letter == 'enter'){   
            }
        })
    }
}
export function stepNumFocus(intLetter) {
    stepTxts[intLetter - 1].focus()
}