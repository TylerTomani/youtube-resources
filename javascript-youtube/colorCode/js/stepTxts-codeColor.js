import { togglePlayVidSize } from "./playPauseVideos-colorCode.js";
// ⚠️ NOTE: This behavior with sidebar hiding is not fully understood.
// It works well with step and step-float, so we’re keeping it for now.
// If bugs pop up later related to sidebar visibility, check here first. 
/**  
Search for togglePlayVidSize
and comment out and see sidebar hidden difference
*/
import { mainTargetDiv } from "./letterFocus-sidebar.js";
import { sideBar } from "./toggle-sidebar.js"
import { parts } from "./letterFocus-sidebar.js"
import { enterConsoleFocus } from "./letterFocus-sidebar.js";
import { toggleBar } from "./toggle-sidebar.js";
import { lastClickedLink } from "./inject-content.js";
export let lastStep = null
export let stepFocused
export function stepTxtsFocus() {
    // const videos = document.querySelectorAll('video');
    const allVideos = document.querySelectorAll('video')
    let currentVideo  
    let isPlaying = false    
    const stepStepVids = document.querySelectorAll('.step-vid')

    allVideos.forEach(vid => {
        vid.addEventListener('click', (e) => {
            if (e.target.tagName === 'VIDEO') {
                const video = e.target;
                if (video.paused) {
                    video.play();
                    video.style.border = "2px solid blue";
                    vid.classList.add('enlarge-vid')
                } else {
                    video.pause();
                    vid.classList.remove('enlarge-vid')
                    // video.style.border = "2px solid lime";
                }
            }
        });
    });
    let mainTargetDivFocused = false
    const steps = document.querySelectorAll('.steps-container > .step ,.steps-container > .step-float , .step-col3')

    // Maybe just keep text area with focus
    const copyCodes = document.querySelectorAll('.copy-code')
    const imgVids = document.querySelectorAll('.step-img > img, .step-vid > video')
    const allImgs = document.querySelectorAll('.step-img > img')
    const sectionLessonTitle = document.querySelector('nav.section-lesson-title > h1')
    const hiddenH3 = document.querySelector('.header-codeColor-lesson h3')
    const endNxtLesson = document.querySelector('#endNxtLesson')
    // const sideBar = document.querySelector('main > .side-bar')
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
        mainTargetDivFocused = true
    })
    mainTargetDiv.addEventListener('focus', e => {mainTargetDivFocused = true})
    mainTargetDiv.addEventListener('focusin', e => {
        partsFocused = false
        mainTargetDivFocused = true
    })
    mainTargetDiv.addEventListener('focusout', e => {
        denlargeAllImages()
        denlargeAllVideos()
    })
    endNxtLesson.addEventListener('keydown', e =>{
        let letter = e.key.toLowerCase()
        if(letter == 'm'){
            mainTargetDiv.focus()
            scrollTo(0,0)
            
        }
        if(letter == 'enter'){
            if(sideBar.classList.contains('deactive')){
                sideBar.classList.remove('deactive')
                sideBar.classList.add('active')
            }
            let iParts = [...parts].indexOf(lastClickedLink)
            iParts = (iParts + 1) % parts.length
            
            parts[iParts].focus()
            window.scrollTo({
                top: 0,
                behavior: "smooth" // makes it animate on mobile too
            });         
            
        }
        
        
    })
    parts.forEach(el => {
        el.addEventListener('focus', e => {
            partsFocused = true
            mainTargetDivFocused = false
        })
    })
    allImgs.forEach(img =>{
        img.addEventListener('click', e =>{
            // It needs to be two clicks for mobile
            // console.log(e.target)
            if(e.target.tagName == 'IMG'){
                // console.log(e.target.tagName)
                // e.preventDefault()
                e.target.classList.toggle('enlarge')
            }
        })
    })    
    copyCodes.forEach(el => {
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if (letter == 'enter') {
                e.stopPropagation()
                const step = getStep(e.target.parentElement)
                const vid = step.querySelector('video')
                // if(vid){
                //     if(!vid.classList.contains('enlarge-vid')){
                //         // console.log('no class')
                //         // vid.style.zIndex = '0'
                //         // e.target.style.zIndex = '100 !important'
                //         // console.log(e.target)
                        
                //     }
                // }
                toggleImg(e)
            }
        })
        el.addEventListener('focus', e => {
            denlargeAllVideos()
            denlargeAllImages()
        })
    })
    steps.forEach(el => {
        el.addEventListener('focus', e => {
            pauseAllVideos()
            removeAllTabIndexes()
            denlargeAllImages()
            lastStep = e.target
        })
        el.addEventListener('click', e => {
            const step = getStep(e.target)
            if(step){
                if(e.target.tagName == 'IMG'){
                    console.log(e.target)
                    return 
                } 
                const images = document.querySelectorAll('img') ? document.querySelectorAll('img') : document.querySelectorAll('video')
                images.forEach(el => {
                    if(el.classList.contains('enlarge')){
                        el.classList.remove('enlarge')
                    }
                })
            }
        })

        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            let key = e.keyCode
            if(letter == 'enter'){   
                toggleImg(e)
                addTabIndexes(e)
                togglePlayVidSize(e)
            }
            
        })
    })
    let iImgsContainerImg = 0
    function toggleImg(e){
        const step = getStep(e.target)
        const img = step.querySelector('.step-img > img') ? step.querySelector('.step-img > img') : null
        const vid = step.querySelector('.step-vid > video') ? step.querySelector('.step-vid > video') : null
        const images = step.querySelectorAll('img')
        const imagesArr = [...images]
        if(imagesArr){
            // denlargeAllImages()
            if (imagesArr[iImgsContainerImg]){
                denlargeAllImages()
                imagesArr[iImgsContainerImg].scrollIntoView({behavior: 'smooth',block: 'center'})
                imagesArr[iImgsContainerImg].classList.toggle('enlarge')
                console.log(imagesArr[iImgsContainerImg])
                iImgsContainerImg = (iImgsContainerImg + 1) % imagesArr.length 
            }
        } else {
        if(img){
            toggleImg(img)
            if(currentWidth <= 721 ){
                if (img.classList.contains('enlarge')){
                    sideBar.classList.add('deactive')
                    // 
                    // if(e.target.classList.contains('.copy-code')){
                    //     img.style.zIndex = '100'
                    // }
                } else {
                    sideBar.classList.remove('deactive')
                    
                }
            }
        }

        if(vid){
            // 
            vid.classList.toggle('enlarge-vid')
            if (currentWidth <= 721 && currentWidth >= 601) {
                if (vid.classList.contains('enlarge-vid')) {
                    sideBar.classList.add('deactive')
                    if (e.target.classList.contains('.copy-code')) {
                        // vid.style.zIndex = '100'
                    }
                } else {
                    sideBar.classList.remove('deactive')

                }
            }
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
        copyCodes.forEach(el => {
            el.setAttribute('tabindex', '-1')
        })
    }
    function denlargeAllImages(){
        imgVids.forEach(el => {
            if(el.classList.contains('enlarge')){
                el.classList.remove('enlarge')
            }
            if(el.classList.contains('enlarge-vid')){
                el.classList.remove('enlarge-vid')
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
            if( lastStep){    
                lastStep.focus()
            }
            if(e.target == lastStep){
                mainTargetDiv.focus()
                window.scrollTo(0,0)
            }
        }
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
        if (sideBar.classList.contains('deactive')) {
            mainTargetDivFocused = true
        }
        if (!isNaN(letter) && !enterConsoleFocus && mainTargetDivFocused) {
            if(mainTargetDivFocused){
                let intLet = parseInt(letter)
                if (intLet <= steps.length) {
                    steps[intLet - 1].focus()
                } else {
                    
                    endNxtLesson.focus()
                           }
            }
        }
        if(letter == 'enter'){
            if(sideBar.classList.contains('deactive')){
                mainTargetDiv.classList.add('overflowX-none')
            }
        }
    })
    
    function pauseAllVideos(){
        allVideos.forEach(el => {
            el.pause()

        })
    }
    function denlargeAllVideos(){
        allVideos.forEach(el => {
            el.style.border = 'none'
            el.classList.remove('enlarge-vid')
        })
    }
}
export function getStep(parent){
    // if(parent.classList.contains('step')){
    if (parent.classList.contains('step') || parent.classList.contains('step-float')){
        return parent
    } else if (parent.parentElement){
        return getStep(parent.parentElement)
    } else {
        return null
    }
}
function getStepStepVidParent(parent){
    if (parent.classList.contains('step') || parent.classList.contains('step-float')) {
        return parent
    } else if (parent.parentElement){
        return getStepStepVidParent(parent.parentElement)
    } else {
        return null
    }
}
// DELETE THIS when side bar works
// stepTxtsFocus()