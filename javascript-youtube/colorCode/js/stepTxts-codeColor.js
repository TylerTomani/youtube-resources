import { mainTargetDivFocused } from "./letterFocus-sidebar.js"
import { mainTargetDiv } from "./letterFocus-sidebar.js";
import { sideBar } from "./toggle-sidebar.js"
import { parts } from "./letterFocus-sidebar.js"
import { enterConsoleFocus } from "./letterFocus-sidebar.js";
import { toggleBar } from "./toggle-sidebar.js";
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
    let currentVideo
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
            toggleImg(e)
        })
    })    
    tabIndexElements.forEach(el => {
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if (letter == 'enter') {
                e.stopPropagation()
                toggleImg(e)
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
            let key = e.keyCode
            if(key === 32){
                e.preventDefault()
                e.stopPropagation()
            }
            if(letter == 'enter'){   
                toggleImg(e)
                addTabIndexes(e)
                
            }
            togglePlayVidSize(e,letter)
            
        })
    })
    let playing = false
    function toggleImg(e){
        const step = getStep(e.target)
        const img = step.querySelector('img')
        if(img){
            img.classList.toggle('enlarge')
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
        

    }
    function togglePlayVidSize(e, letter) {
        playPause(e)
        const step = getStep(e.target)
        const vid = step.querySelector('video')
        if(letter == 'enter'){
            vid.classList.toggle('enlarge-vid')
            if(currentWidth < 721){
                toggleBar()
                console.log(currentWidth)
            }
        }
        
        // const vid =  step.querySelector('video')
    }
    function playPause(e) {
        let key = e.key
        const step = getStep(e.target)
        const vid = step.querySelector('video')
        playing = !playing
        if(vid){
            switch (key) {
                case 13:
                    vid.currentTime = 0
                    vid.play()
                    break
                case 32:
                    e.preventDefault()
                    console.log('yes')
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
                // right arrow
                case 39:
                    vid.currentTime = vid.currentTime + 2
                    if (vid.currentTime >= vid.duration) {
                        vid.style.border = '14px solid red'
                        vid.pause()
                        vid.currentTime = vid.duration()
                    }
                    break

            }    

            if (playing) {                
                vid.play()
                vid.style.border = "4px solid blue"
            } else {
                vid.style.border = "none"
                vid.pause()    
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
        if(e.metaKey && letter == 'c'){
            e.preventDefault()
            return
        }
        if(letter == 'm'){
            if(!mainTargetDivFocused && lastStep){    
                lastStep.focus()
            }
        }
        
        if(!mainTargetDivFocused){}
        if (!e.metaKey && (e.shiftKey && letter == 'c')) {
            // e.preventDefault()
            // const enterConsole = document.querySelector('#enterConsole')
            // if(enterConsole){
            //     enterConsole.focus()
            // } else{

            //     const chagGpt = document.querySelector('#chatGpt')
            //     chagGpt.scrollIntoView({behavior: 'smooth', block: 'center'})
            // }
        }

        if (!isNaN(letter) && !enterConsoleFocus && mainTargetDivFocused) {
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
// stepTxtsFocus()