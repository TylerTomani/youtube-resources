const playVidClicks = document.querySelectorAll('.playVid-click')
const videos = document.querySelectorAll('video')

playVidClicks.forEach(playVidClick => {
    playVidClick.addEventListener('click', e => {
        removeElargeAllImgs()
        enlargeVid(e)
    })
    playVidClick.addEventListener('keydown', e => {
        if(e.keyCode === 13){
            removeElargeAllImgs()
            enlargeVid(e)
        }        
    })
})

function enlargeVid(e){
    const parent = getStepContainer(e.target.parentElement)
    const vid = parent.querySelector('.step-vid > video')
    // console.log(vid)
    if(vid){
        if(!vid.classList.contains('enlargeImg') && vid.classList.contains('delargeImg')){
            vid.classList.add('enlargeImg')
            vid.classList.remove('delargeImg')
            vid.play()
            vid.currentTime = 0
        } else if (!vid.classList.contains('enlargeImg')){
            vid.classList.add('enlargeImg')
            vid.play()
            vid.currentTime = 0
        } else {
            vid.classList.remove('enlargeImg')
        }
    }

}
function delargeVid(e){
    const parent = getStepContainer(e.target.parentElement)
    const vid = parent.querySelector('.step-vid > video')
    if(vid){

        vid.classList.remove('enlargeImg')
        videos.forEach(video => {
            video.classList.remove('enlargeImg')
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
        video.classList.remove('enlargeImg')
        // video.currentTime = 0
        video.pause()
    })
}