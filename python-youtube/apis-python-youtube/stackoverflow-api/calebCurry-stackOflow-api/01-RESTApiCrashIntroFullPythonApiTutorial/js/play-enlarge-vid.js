import { aside } from "./step-focus-img-temp.js"
import { nav } from "./step-focus-img-temp.js"
import { toggleSideBtn } from "./sections-stackoverflow.js"

export function playEnlargeVideos(){
    let playing = false
    let imgFocused = false
    const stepVidsSteps = document.querySelectorAll('.step-vid')
    // Terrible code i shouldn't repeat stepTxts here
    const stepTxts = document.querySelectorAll('.step  .step-txt')
    const vids = document.querySelectorAll('.step-vid > video')
    const images = document.querySelector('.step-img > img')

    
    
    function stopAllVids() {vids.forEach(el => {el.pause()})}
    function denlargeAllVids() {vids.forEach(el => {
        if(el.classList.contains('enlarge-vid')){
            el.classList.remove('enlarge-vid')
        }
    })}

    nav.addEventListener('click', stopAllVids)
    nav.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if(letter == 'enter'){
            stopAllVids()
        }
        
    })
    stepTxts.forEach(el => {
        el.addEventListener('focus', () =>{
            stopAllVids()
        })
    })
    stepVidsSteps.forEach(el => {
        const step = getStepVidStep(el.parentElement)
        const stepTxt = step.querySelector('.step-txt')
        stepTxt.addEventListener('focus', e => {

            stopAllVids()
            denlargeAllVids()
        })
        stepTxt.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            let key = e.keyCode
            const vid = step.querySelector('video')
            stopAllVids()                       
            videoControls(e,vid,key)
        })
        stepTxt.addEventListener('click', e => {
            e.preventDefault()
            const step = getStepVidStep(e.target)
            const vid = step.querySelector('video')
            playing = !playing
            playPause(vid)            
        })
    })
    function videoControls(e, vid, key){
        
        switch (key) {
            case 13:
                stopAllVids()
                toggleVidSize(vid)
                playing = true
                break
            case 32:
                e.preventDefault()
                e.stopPropagation()
                playing = !playing
                break;
            // left arrow
            case 37:
                e.preventDefault()
                e.stopPropagation()
                if (vid.currentTime > 0) {
                    vid.currentTime = vid.currentTime - 1
                }
                if (vid.currentTime < vid.duration) {
                }
                break
            // right arrow
            case 39:
                e.preventDefault()
                e.stopPropagation()
                vid.currentTime = vid.currentTime + 2
                if (vid.currentTime >= vid.duration) {
                    // vid.style.border = '14px solid red'
                    vid.pause()
                    vid.currentTime = vid.duration()
                }
                break
        }
        playPause(vid)
    }
    function playPause(vid) {
        
        if (vid) {
            if (playing) {
                vid.play()
                vid.style.border = "2px solid blue"
                if ([...vids].indexOf(vid) == 0) {
                    vid.style.marginTop = '15%'
                } else {

                    vid.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    // vid.style.border = "none"
                }
            } else {
                vid.style.border = "2px solid green"
                vid.style.marginTop = '10%'
                vid.pause()
            }
        }
    }
    vids.forEach(vid => {
        vid.addEventListener('click', e =>{
            playing = !playing
            e.preventDefault()
            let step = getStepVidStep(e.target.parentElement)
            let vid = step.querySelector('.step-vid video')
            playPause(vid)
            toggleVidSize(vid)
            
            
        })
        vid.addEventListener('keydown', e =>{
            let step = getStepVidStep(e.target.parentElement)
            let vid = step.querySelector('.step-vid video')
            // lesson
            videoControls(e, vid)
            
        })
        vid.addEventListener('focus', e =>{
            e.preventDefault()
            imgFocused = true
            stopAllVids()
        })
        /** ************** 
         * STOPS VIDEOS  from opeing FULL screen on Mobile*/
        vid.addEventListener('webkitbeginfullscreen', e =>{
            e.preventDefault()
        })
    })
    function toggleVidSize(vid){
        vid.classList.toggle('enlarge-vid')
        // console.log(toggleSideBtn)
        if(vid.classList.contains('enlarge-vid')){
            aside.classList.add('hide')
            if(toggleSideBtn.classList.contains('hide')){
                toggleSideBtn.classList.remove('hide')
            }
            if(!toggleSideBtn.classList.contains('active')){
                toggleSideBtn.classList.add('active')
            }
            vid.style.zIndex = 5
        } else {
            vid.style.zIndex = 1
            aside.classList.remove('hide')
        }
        
    }
   
}
function getStepVidStep(parent){
    if(parent.classList.contains('step')){
        return parent
    } else if (parent.parentElement){
        return getStepVidStep(parent.parentElement)
    } else {
        return null
    }
}
// playEnlargeVideos()


