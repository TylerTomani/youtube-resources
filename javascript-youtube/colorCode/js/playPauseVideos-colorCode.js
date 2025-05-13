import { getStep } from "./stepTxts-codeColor.js"
import { currentWidth } from "./inject-content.js"
import { toggleBar } from "./toggle-sidebar.js"
let playing = false

export function togglePlayVidSize(e) {
    let letter = e.key.toLowerCase()
    const step = getStep(e.target)
    const vid = step.querySelector('video')
    if (letter == 'enter') {
        if (vid) {
            vid.classList.toggle('enlarge-vid')
            if (currentWidth < 721) {
                toggleBar()
            }
            // vid.classList.toggle('enlarge')
        }

    }
    playPause(e)
    // const vid =  step.querySelector('video')
}
function playPause(e) {
        let key = e.keyCode
        const step = getStep(e.target)
        const vid = step.querySelector('video')
        if(vid){    
            switch (key) {
                case 13:
                    playing = true
                    break
                case 32:
                    // e.preventDefault()
                    e.stopPropagation()
                    playing = !playing
                    break;
                // left arrow
                case 37:
                    e.preventDefault()
                    if (vid.currentTime > 0) {
                        vid.currentTime = vid.currentTime - 1
                    }
                    console.log(vid.currentTime)
                    if (vid.currentTime == 0) {
                        console.log('yes')
                        playing = false
                        vid.style.border = '12px solid red'
                    }
                    break
                // right arrow
                case 39:
                    vid.currentTime = vid.currentTime + 2
                    // if (vid.currentTime >= vid.duration) {
                    //     vid.style.border = '14px solid red'
                    //     vid.pause()
                    //     vid.currentTime = vid.duration()
                    // }
                    break

            }    

            if (playing) {                
                vid.style.border = "1px solid blue"
                vid.play()
            } else {
                vid.style.border = "none"
                vid.pause()    
            }
            
            
            
        }
    }