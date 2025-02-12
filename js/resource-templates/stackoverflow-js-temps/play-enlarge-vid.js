

export function playEnlargeVideos(){
    let playing = false
    const stepVidsSteps = document.querySelectorAll('.step-vid')
    const vids = document.querySelectorAll('.step-vid > video')
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
            console.log(key)
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
        } else {
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
        vid.addEventListener('webkitbeginfullscreen', e =>{
            e.preventDefault()
        })
    })
    function toggleVidSize(vid){
        if (!playing) {
            vid.classList.add('enlarge-vid')
            vid.style.zIndex = '5'
            vid.play()
            vid.style.border = "1px solid blue"
        } else if (playing) {
            vid.classList.remove('enlarge-vid')
            vid.pause()
            vid.style.zIndex = '2'
            vid.style.border = "1px dotted red"
        }
        playing = !playing
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
playEnlargeVideos()


