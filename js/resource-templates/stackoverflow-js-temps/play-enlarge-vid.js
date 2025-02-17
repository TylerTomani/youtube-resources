import { aside } from "./lessons-temp-stackoverflow.js"

export function playEnlargeVideos(){
    let playing = false
    let imgFocused = false
    const stepVidsSteps = document.querySelectorAll('.step-vid')
    const vids = document.querySelectorAll('.step-vid > video')
    const images = document.querySelector('.step-img > img')
    stepVidsSteps.forEach(el => {
        const step = getStepVidStep(el.parentElement)
        const stepTxt = step.querySelector('.step-txt')
        stepTxt.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            let key = e.keyCode
            const vid = step.querySelector('video')
            if(letter == 'enter'){
                toggleVidSize(vid)
            } 
            if(key == 32){
                e.preventDefault()
                playPause(vid)
            }
            else {
                // videoControls(key,vid,e)
            }
        })
        stepTxt.addEventListener('click', e => {
            e.preventDefault()
            const step = getStepVidStep(e.target)
            const vid = step.querySelector('video')
            playPause(vid)            
        })
    })
    function playPause(vid){
        if (!playing) {
            vid.play()
            vid.style.border = "none"
        } else {
            vid.style.border = "1px solid blue"
            vid.pause()
        }
        playing = !playing
    }
    function videoControls(key,vid,e){
        switch (key) {
            case 13:
                break
            case 32:
                e.preventDefault()
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
        if (!playing) {
            vid.play()
        } else {
            vid.pause()
        }
    }
    vids.forEach(vid => {
        vid.addEventListener('click', e =>{
            e.preventDefault()
            toggleVidSize(e.target)
        })
        vid.addEventListener('focus', e =>{
            e.preventDefault()
            imgFocused = true
        })
        /** ************** 
         * STOPS VIDEOS  from opeing FULL screen on Mobile*/
        vid.addEventListener('webkitbeginfullscreen', e =>{
            e.preventDefault()
        })
    })
    function toggleVidSize(vid){
        
        if (!playing) {
            vid.classList.add('enlarge-vid')
            vid.style.zIndex = '2'
            vid.play()
            aside.classList.add('hide')
        } else if (playing) {
            aside.classList.remove('hide')
            vid.classList.remove('enlarge-vid')
            vid.pause()
            vid.style.zIndex = '0'
        }
        playing = !playing
    }
    addEventListener('keydown', e => {
        let key = e.keyCode
        if(imgFocused && key == 32){
            e.preventDefault()

        }
    })
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
playEnlargeVideos()


