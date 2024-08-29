const stepTxts = document.querySelectorAll('.step > .step-txt')
const stepColTxts = document.querySelectorAll('.step-col > .step-txt')
const stepTxtsPAs = document.querySelectorAll('.step-txt > p > a')

const copycodesTabs = document.querySelectorAll('.code-container > .copy-code')

const allImgs = document.querySelectorAll('.step-img > img')

stepTxts.forEach(stepTxt => {
    stepTxt.addEventListener('click', e => {
        console.log('step-txt: click')
        // e.preventDefault()
        addTabIndex(e)
        // removeElargeAllImgs()
        toggleStepImgSize(e)
    })
    stepTxt.addEventListener('keydown', e => {
        // e.preventDefault()
        if(e.keyCode === 13){
            console.log('step-txt: keydown ')
            addTabIndex(e)
            // removeElargeAllImgs()
            
            toggleStepImgSize(e)
        }
    })
    stepTxt.addEventListener('focus', e => {
        delargeAllVideo()
        removeTabToImages()
        removeAsTabIndex(e)
        removeElargeAllImgs()
        // delargeImg(e)
        // delargeVid(e)
        removeCopyCodeTabIndex()
        
    })
    stepTxt.addEventListener('focusout', e => {        
        console.log('focus out')
        removeElargeAllImgs()
        removeTabToImages()
        delargeAllVideo()
        delargeImg(e)
    })
    
})

function toggleStepImgSize(e){
    const step = getStepContainer(e.target.parentElement)
    const img = step.querySelector('.step-img > img')
    if(img.classList.contains('denlargeImg')){
        img.classList.remove('denlargeImg')
        img.classList.add('enlargeImg')
    } else
    if(!img.classList.contains('enlargeImg')){
        img.classList.add('enlargeImg')
        // enlarged = true
    } else if(img.classList.contains('enlargeImg'))  {
        img.classList.remove('enlargeImg')
        // console.log(img)
        img.classList.add('denlargeImg')
        // removeElargeAllImgs()
        // enlarged = false 
    }
    // console.log(enlarged)
        // } else  {
        //     img.classList.remove('enlargeImg')
        //     img.classList.add('delargeImg')
        // }
        
    
    

}
stepColTxts.forEach(stepColTxt => {
    stepColTxt.addEventListener('click', e => {
        addTabToImages(e)

        // let children = e.target.querySelectorAll('*')
        // children.forEach(child => {
        //     child.addEventListener('click', () => {
        //         tabImgEnlarge(e)

        //     })
        // })
        removeElargeAllImgs()

    })
    stepColTxt.addEventListener('keydown', e => {
        if(e.keyCode === 13){
            addTabIndex(e)
            addTabToImages(e)
            removeElargeAllImgs()
        }
    })
    stepColTxt.addEventListener('focus', e => {
        removeAsTabIndex(e)
        removeTabToImages(e)
        // removeAsTabIndex()
        removeCopyCodeTabIndex()
      
    })
  
    
})

function getStepColContainer(parent){
    if(parent.classList.contains('step-col')){
        return parent 
    } else if (parent.parentElement){
        return getStepContainer(parent.parentElement)
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
    allImgs.forEach(img => {
        img.removeAttribute('tabindex ')
    })

}
stepTxtsPAs.forEach(stepTxtsPA =>{
    stepTxtsPA.addEventListener('focus', e => {
        // delargeImg() and delargeVid() functions are in enlargeImg.js
        delargeImg(e)   
        // delargeVid(e)   
    })
})

// Enlarge Images
allImgs.forEach(img => {
    img.addEventListener('click', e => {
        e.preventDefault()
        // removeElargeAllImgs()
        toggleImgClickEnlarge(e)
    })
    img.addEventListener('keydown', e => {
        if(e.keyCode === 13){   
            e.preventDefault()
            // removeElargeAllImgs()
            toggleImgClickEnlarge(e)
        }
    })
    img.addEventListener('focusout', e => {
        removeElargeAllImgs()
        })
})

function toggleImgClickEnlarge(e){
    const img = e.target
    if(img.classList.contains('img-l') && !img.classList.contains('left-enlargeImg')){
        removeElargeAllImgs()
        img.classList.add('left-enlargeImg')
    } else {
        img.classList.remove('left-enlargeImg')
        // img.classList.remove('right-enlargeImg')
    }
    if(img.classList.contains('img-r') && !img.classList.contains('right-enlargeImg')){
        removeElargeAllImgs()
        img.classList.add('right-enlargeImg')
    } else {
        img.classList.remove('right-enlargeImg')
    }
}

function delargeImg(e){

    const parent = getStepContainer(e.target.parentElement)
    if(parent){

        const img = parent.querySelector('.step-img > img')
        if(img){
            img.classList.remove('enlargeImg')   
        }
        const vid = parent.querySelector('.step-vid > video')
        if(vid){
            vid.classList.remove('enlargeImg')   
        }
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
function removeElargeAllImgs(){
    allImgs.forEach(img => {
        if(img.classList.contains('left-enlargeImg') || 
            img.classList.contains('right-enlargeImg') ||
            img.classList.contains('enlargeImg') 
            ){
            img.classList.remove('left-enlargeImg')
            img.classList.remove('right-enlargeImg')
            img.classList.remove('enlargeImg')
        }
    })
}
//  Tricky bit, get img-2-2-container bigger in sequence 

// const imgs2By2Container = document.querySelectorAll('.img-2-container > .step-img')

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
function removeCopyCodeTabIndex(){
    copycodesTabs.forEach(copyCode => {
        copyCode.removeAttribute('tabindex')
    })
}

