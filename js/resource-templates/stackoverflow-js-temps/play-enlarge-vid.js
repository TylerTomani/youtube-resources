import { aside } from "./step-focus-img-temp.js"
import { nav } from "./step-focus-img-temp.js"

export function playEnlargeVideos(){
    let playing = false
    let imgFocused = false
    const stepVidsSteps = document.querySelectorAll('.step-vid')
    const vids = document.querySelectorAll('.step-vid > video')
    const images = document.querySelector('.step-img > img')

    
    
    function stopAllVids(){vids.forEach(el =>{el.pause()})}

    nav.addEventListener('click', stopAllVids)
    nav.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if(letter == 'enter'){
            stopAllVids()
        }
        
    })
    stepVidsSteps.forEach(el => {
        const step = getStepVidStep(el.parentElement)
        const stepTxt = step.querySelector('.step-txt')
        stepTxt.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            let key = e.keyCode
            const vid = step.querySelector('video')
            if(letter == 'enter'){
                playing = true
                
            }
            // if(key == 32){
            //     playing = !playing
                
            // }
            
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
    function playPause(vid){
                if(vid){
            if (playing) {
                vid.play()
                vid.style.border = "none"
            } else {
                vid.style.border = "1px solid blue"
                vid.pause()
            }
        }
    }
    function videoControls(e, vid, key){
       
        switch (key) {
            case 13:
                toggleVidSize(vid)
                playing = true
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
        playPause(vid)
    }
    vids.forEach(vid => {
        vid.addEventListener('click', e =>{
            // playing = !playing
            e.preventDefault()
            let step = getStepVidStep(e.target.parentElement)
            let vid = step.querySelector('.step-vid video')
            videoControls(e,vid)
            toggleVidSize(vid)
            
        })
        vid.addEventListener('keydown', e =>{
            let step = getStepVidStep(e.target.parentElement)
            let vid = step.querySelector('.step-vid video')
            console.log(e.target)
            // videoControls(e,vid)
            
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
        vid.classList.toggle('enlarge-vid')
        if(vid.classList.contains('enlarge-vid')){
            aside.classList.add('hide')
            vid.style.zIndex = 5
        } else {
            vid.style.zIndex = 1
            aside.classList.remove('hide')
            // vid.pause()
            // playing = !playing
            // playPause(vid)
            // console.log(vid.stop)
        }
        
    }
    addEventListener('click', e => {
        let key = e.keyCode
        vids.forEach(vid => {
            if(vid.classList.contains('enlarge-vid')){
                vid.play()
            }
        })
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


