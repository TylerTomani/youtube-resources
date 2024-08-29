import { stepTxts } from "./animateImg.js"
const stepColTxts = document.querySelectorAll('.step-col > .step-txt')
const stepTxtsPAs = document.querySelectorAll('.step-txt > p > a')
const allImgs = document.querySelectorAll('.step-img > img')
const img2CopyCodes = document.querySelectorAll('.img-2-container > .code-container > .copy-code')
import { deanimateAllImagesVideos } from "./animateImg.js"
stepColTxts.forEach(stepColTxt => {
    stepColTxt.addEventListener('click', e => {
        addTabToImages(e)
        // removeElargeAllImgs()
    })
    stepColTxt.addEventListener('keydown', e => {
        if(e.keyCode === 13){
            addTabIndex(e)
            addTabToImages(e)
            // removeElargeAllImgs()
        }
    })
    stepColTxt.addEventListener('focus', e => {
        removeAsTabIndex(e)
        removeTabToImages(e)
      
    })
})

stepTxts.forEach(stepTxt => {
    stepTxt.addEventListener('focus', e => {
        allImgs.forEach(img => {
            img.removeAttribute('tabindex')
        })
    })
})

function getStepColContainer(parent){
    if(parent.classList.contains('step-col')){
        return parent 
    } else if (parent.parentElement){
        return getStepColContainer(parent.parentElement)
    } else {
        return null
    }
}

function addTabToImages(e){
    const parent = getStepColContainer(e.target.parentElement)
    if(parent){
        const imgContainerStpImgs = parent.querySelectorAll('.img-2-container > .step-img > img')
        if(imgContainerStpImgs){
            imgContainerStpImgs.forEach(img => {
                img.setAttribute('tabindex','1')
               
            })
        }
    }
}
function removeTabToImages(e){
    const parent = getStepColContainer(e.target.parentElement)
    console.log(parent)
    if(parent){
        const imgContainerStpImgs = parent.querySelectorAll('.img-2-container > .step-img > img')
        if(imgContainerStpImgs){
            imgContainerStpImgs.forEach(img => {
                img.removeAttribute('tabindex')
               
            })
        }
    }
}
stepTxtsPAs.forEach(stepTxtsPA =>{
    stepTxtsPA.addEventListener('focus', e => {
        // delargeImg() and () functions are in enlargeImg.js
        delargeImg(e)   
        deanimateAllImagesVideos(e)   
    })
})


// Enlarge Images

allImgs.forEach(img => {
    img.addEventListener('click', e => {
        console.log(e.target)
        e.preventDefault()
        // removeElargeAllImgs()
        toggleImgSize(e)
    })
    img.addEventListener('keydown', e => {
        if(e.keyCode === 13){   
            e.preventDefault()
            // removeElargeAllImgs()
            toggleImgSize(e)
        }
    })
    img.addEventListener('focusout', e => {
        // removeElargeAllImgs()
        })
})

function toggleImgSize(e){
    const parent = e.target.parentElement
    console.log(parent)
    const img = parent.querySelector('.step-img > img')
    img.classList.remove('deanimate')
    if(img){
        if(!img.classList.contains('animate') ){
            img.classList.add('animate')
        } else {
            img.classList.remove('animate')
        }
    }
}
function toggleImg2ContainerSize(e){
    const parent = getImg2Container(e.target.parentElement)
    console.log(parent)
    const img = parent.querySelector('.step-img > img')
    img.classList.remove('deanimate')
    if(img){
        if(!img.classList.contains('animate') ){
            img.classList.add('animate')
        } else {
            img.classList.remove('animate')
        }
    }

}

function delargeImg(e){
    const parent = getStepContainer(e.target.parentElement)

    if(parent){
        const img = parent.querySelector('.step-img > img')
        if(img){
            img.classList.remove('animate')   
            img.classList.remove('animate')   
        }
        const vid = parent.querySelector('.step-vid > video')
        if(vid){
            vid.classList.remove('animate')   
        }
    }
}
img2CopyCodes.forEach(img2CopyCode => {
    img2CopyCode.addEventListener('click', e => {
        toggleImg2ContainerSize(e)
        // removeElargeAllImgs()
    })
    img2CopyCode.addEventListener('keydown', e => {
        if(e.keyCode === 13){
            // removeElargeAllImgs()
            toggleImg2ContainerSize(e)
        }
    })
    img2CopyCode.addEventListener('focus', e => {
        // removeAsTabIndex(e)
        // removeTabToImages(e)
      
    })
})
function getImg2Container(parent){
    if(parent.classList.contains('img-2-container')){
        return parent 
    } else if (parent.parentElement){
        return getImg2Container(parent.parentElement)
    } else {
        return null
    }
}

function addTabIndex(e){
    const parent = e.target.parentElement
    const as = parent.querySelectorAll('a')
    const copyCodes = parent.querySelectorAll('.copy-code')
    if(as){
        as.forEach(a => {
            a.setAttribute('tabindex',"1")
        })
    }
    if(copyCodes){
        copyCodes.forEach(copyCode => {
            copyCode.setAttribute('tabindex','1')
        })
    }
}
function removeAsTabIndex(e){
    stepTxtsPAs.forEach(stepTxtsPA => {
        stepTxtsPA.removeAttribute('tabindex')
    })
}

