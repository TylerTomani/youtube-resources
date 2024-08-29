export const stepTxts = document.querySelectorAll('.step-txt')
const playVidClicks = document.querySelectorAll('.playVid-click')
const videos = document.querySelectorAll('video')
const images = document.querySelectorAll('img')

let enlarged = false
let playing = false
export function deanimateAllImagesVideos(){
    videos.forEach(vid => {
        vid.classList.remove('animate')
        vid.classList.remove('lg-animate')
    })
    images.forEach(img=> {
        img.classList.remove('animate')
        img.classList.remove('lg-animate')
    })
}
function stopAllVideos(){
    videos.forEach(vid => {
        vid.currentTime = 0
        vid.pause()
        vid.classList.remove('animate')
        vid.classList.remove('lg-animate')
    })
}

playVidClicks.forEach(playVidClick => {
    playVidClick.addEventListener('click', e => {
        let parent = getStep(e.target.parentElement)
    })
    playVidClick.addEventListener('keydown', e => {
        let key = e.keyCode
        let parent = getStep(e.target.parentElement)
        if(key === 13){   
            let vid = queryVideo(parent)
            vid.play()
            animate(vid)
        }
    })
    
})

stepTxts.forEach(stepTxt => {
    stepTxt.addEventListener('click', e => {
        const parent = getStep(e.target.parentElement)
        const img = parent.querySelector('.step-img > img')
        if(img){
            animate(img)
        }
    })
    stepTxt.addEventListener('keydown', e => {
        let key = e.keyCode
        if(key === 13){
            const parent = getStep(e.target.parentElement)
            if(parent){
            console.log(parent)
            const img = parent.querySelector('.step-img > img')
                animate(img)
            }
        }
    })
    stepTxt.addEventListener('focusin', e => {
        let parent = getStep(e.target.parentElement)
        let vid = queryVideo(parent)
    })
    stepTxt.addEventListener('focus', e => {
        // console.log('focus out')
        stopAllVideos()
    })
    let innerEls = stepTxt.querySelectorAll('*')
    stepTxt.addEventListener('focusin', e => {
        console.log('focusin')

    })
    if(innerEls){

        innerEls.forEach(el => {
            el.addEventListener('focus', e => {
                let step = getStep(e.target.parentElement)
                deanimateAllImagesVideos()            
                enlarged =false
                
            })
        })
    }
})

export function getStep(parent){
    if(parent.classList.contains('step')){
        return parent
    } else if(parent.parentElement){
        return getStep(parent.parentElement)
    } else {
        null
    }
}

function animate(el){   
    if(!enlarged){
        if(el.classList.contains('deanimate')){
            el.classList.remove('deanimate')
        }
        if(!el.classList.contains('animate') && !el.classList.contains('animate-lg')){
            el.classList.add('animate')
        }
        
        if(el.classList.contains('animate-lg')){
            // el.classList.remove('deanimate')
            el.classList.add('lg-animate')
        }
        if(el.classList.contains('animate-xlg')){
            // el.classList.remove('deanimate')
            el.classList.add('xlg-animate')
        }
    } else {
        el.classList.add('deanimate')
        el.classList.remove('animate')
        el.classList.remove('lg-animate')
        el.classList.remove('xlg-animate')
    }
    enlarged = !enlarged
}
function queryVideo(parent){
    if(parent){

        let stepVid = parent.querySelector('.step-vid')
        let vid = parent.querySelector('.step-vid > video')
        // console.log(vid)
        // animate(vid)
        // vid.play()
        if(vid){
            
            return vid
        }
    }
}