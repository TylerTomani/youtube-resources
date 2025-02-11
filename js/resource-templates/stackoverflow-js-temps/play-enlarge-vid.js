

export function playEnlargeVideos(){
    let playing = false
    const stepVids = document.querySelectorAll('.step-vid')
    stepVids.forEach(el => {
        const step = getStepVidStep(el.parentElement)
        const stepTxt = step.querySelector('.step-txt')
        stepTxt.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            const video = step.querySelector('video')
            playPauseVideo(e,video)
            
        })
    })
    function playPauseVideo(e, vid) {
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
            // const stepVid = vid.parentElement
            vid.classList.add('enlarge-vid')
            vid.play()
            vid.style.border = "1px solid blue"
        } else if (!playing) {
            // vid.classList.remove('enlarge-vid')
            vid.pause()
            vid.style.border = "1px dotted red"
        }
        // playing = !playing
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


