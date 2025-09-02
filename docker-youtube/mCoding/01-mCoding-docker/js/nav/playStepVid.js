// playStepVid.js
let playing = false
function firstVidToggleSize(vid) {
    if (!vid.classList.contains('first-vid-enlarge')) {
        vid.classList.add('first-vid-enlarge');
    } else {
        vid.classList.remove('first-vid-enlarge');
    }
}

export function handleVideo(vid,e,steps){
    if(e.target == steps[0]){
        // firstVidToggleSize(vid)
    } else {
        // toggleVideoSize(vid,e)
    }
    videoControls(vid,e)
}
function videoControls(vid, e) {
    let key = e.keyCode
    console.log(key)
    switch (key) {
        case 13:
            // if (vid.currentTime === vid.duration) {
            //     vid.style.border = 'none'
            //     vid.currentTime = 0
            //     playing = true
            // } else {
            //     playing = true
            // }
            console.log('enter')

            break
        case 32:
            e.preventDefault()
            if (vid.currentTime === vid.duration) {
                vid.style.border = 'none'
                vid.currentTime = 0
                // playing = true
                playing = false
            } else {
                playing = !playing
            }
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
    if (vid.currentTime === vid.duration) {
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
export function toggleVideoSize(vid,e,steps){
    let key = e.key.toLowerCase()
    console.log(e.target)
    if(key === 'enter'){
        vid.classList.toggle('enlarge')
        vid.scrollIntoView({behavior: 'instant', block: 'center'})
    }
    // console.log(key)
    if(key === ' '){
        playing = !playing
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
    })
    
}