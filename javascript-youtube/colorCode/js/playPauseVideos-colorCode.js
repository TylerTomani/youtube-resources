import { getStep } from "./stepTxts-codeColor.js"
import { currentWidth } from "./inject-content.js"
import { toggleBar } from "./toggle-sidebar.js"
import { sideBar } from "./toggle-sidebar.js"
let playing = false
export function togglePlayVidSize(e,playing) {
    
    let letter = e.key.toLowerCase()
    const step = getStep(e.target)
    const vid = step.querySelector('video')
    e.target.scrollIntoView({behavior: 'smooth',block: 'center'})
    playPause(e)
    if(letter == ' '){
        e.preventDefault()
        e.stopPropagation()
    }
    if (letter == 'enter') {
        if (vid) {
            vid.classList.toggle('enlarge-vid')
            if (currentWidth < 721) {
                toggleBar()
            } else if
             (currentWidth < 721 && playing) {
                console.log('less')
                return
            }
        }

    }    
}

function playPause(e) {
    const step = getStep(e.target)
    const vid = step.querySelector('video')
    if (!vid) return

    if (e.keyCode === 13) { // Enter
        playing = true
        vid.currentTime = 0
    }

    if (e.keyCode === 32) { // Spacebar
        e.preventDefault()
        e.stopPropagation()
        playing = !playing
    }

    if (e.keyCode === 37) { // Left arrow
        e.preventDefault()
        if (vid.currentTime > 0){
            vid.style.border = "2px solid blue"
            vid.currentTime -= 1
        }
        
            
    }

    if (e.keyCode === 39) { // Right arrow
        vid.currentTime += 2
    }

    // 🔴 Red border if at the end
    console.log(typeof(vid.currentTime))
    if(vid.currentTime == 0){
        vid.style.border = "none"
        // vid.pause()
    } 
    if (vid.currentTime >= vid.duration) {
        vid.style.border = "2px solid red"
        vid.pause()
        playing = false
    } else if (playing) {
        // 🔵 Blue border if playing
        vid.style.border = "2px solid blue"
        vid.play()
    } else {
        // 🟢 Lime green border if paused
        vid.style.border = "2px solid lime"
        vid.pause()
    }
}

