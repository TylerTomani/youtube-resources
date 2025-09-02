// playStepVid.js
let playing = false
export function handleVideo(vid,e){
    toggleVideoSize(vid,e)
    videoControls(vid,e)
    // console.log(e.key)
}
function toggleVideoSize(vid,e){
    let key = e.key.toLowerCase()
    if(key === 'enter'){
        vid.classList.toggle('enlarge')
        vid.scrollIntoView({behavior: 'instant', block: 'center'})
    }
}

function videoControls(vid,e){
    let key = e.keyCode
    switch (key){
        case 13:
            if (vid.currentTime === vid.duration) {
                vid.style.border = 'none'
                vid.currentTime = 0
                playing = true
            } else {
                playing = true
            }
            break 
        case 32:
            e.preventDefault()
            console.log('here')
            if (vid.currentTime === vid.duration) {
                vid.style.border = 'none'
                vid.currentTime = 0
                // playing = true
                playing = !playing
            } else playing = !playing
            break 
        case 37:
            
            vid.currentTime -= .5
            playing = true
            break 
        case 39:
            vid.currentTime += .5
            playing = true
            break 
        
    }
    if(vid.currentTime === vid.duration){
        vid.style.border = '4px solid red'
        playing = false
    }
    if (playing) {
        vid.play().catch(err => {
            if (err.name !== "AbortError") {
                console.error("Video play failed:", err);
            }
        });
        vid.playing = true;
        vid.style.border = 'none';
    } else {
        vid.pause();
        vid.playing = false;
        if (vid.currentTime !== vid.duration) {
            vid.style.border = '3px solid blue';
        }
    }

}
export function pauseDenlargeAllVideos(allVids){
    allVids.forEach(vid => {
        if(vid.classList.contains('enlarge')){
            vid.classList.remove('enlarge')
        } 
        if(playing){
            playing = false
        }
        console.log(vid)
    })
}