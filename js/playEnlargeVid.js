const playVidClicks = document.querySelectorAll('.playVid-click')
const videos = document.querySelectorAll('video')

playVidClicks.forEach(playVidClick => {
    playVidClick.addEventListener('click', e => {
        enlargeVid(e)
    })
    playVidClick.addEventListener('keydown', e => {
        if(e.keyCode === 13){
            enlargeVid(e)
        }        
    })
    playVidClick.addEventListener('focusout', e => {
        delargeAllVideo()
    })
})

videos.forEach(vid => {
    vid.addEventListener('click', e => {
        if(!e.target.classList.contains('enlarge')){
            e.target.classList.add('enlarge')
        } else {
            e.target.classList.remove('enlarge')
        }
    })
})

function enlargeVid(e){
    const parent = getStepContainer(e.target.parentElement)
    const vid = parent.querySelector('.step-vid > video')
    // console.log(vid)
    if(vid){
        if(!vid.classList.contains('enlarge') && vid.classList.contains('denlarge')){
            vid.classList.add('enlarge')
            vid.classList.remove('denlarge')
            vid.play()
            vid.currentTime = 0
        } else if (!vid.classList.contains('enlarge')){
            vid.classList.add('enlarge')
            vid.play()
            vid.currentTime = 0
        } else {
            vid.classList.remove('enlarge')
        }
    }

}
function delargeVid(e){
    const parent = getStepContainer(e.target.parentElement)
    const vid = parent.querySelector('.step-vid > video')
    if(vid){

        vid.classList.remove('enlarge')
        videos.forEach(video => {
            video.classList.remove('enlarge')
            // video.currentTime = 0
            video.pause()
        })
    }

}

function getStepContainer(parent){
    if(parent.classList.contains('step')){
        return parent 
    } else if (parent.parentElement){
        return getStepContainer(parent.parentElement)
    } else {
        return null
    }
}

function delargeAllVideo(){
    videos.forEach(video => {
        video.classList.remove('enlarge')
        // video.currentTime = 0
        video.pause()
    })
}