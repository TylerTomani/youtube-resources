const dropParts = document.querySelectorAll('.dropPart')
const parts = document.querySelectorAll('.part')
let stepContainerFocused = false
addEventListener('keydown', e => {
    let key = e.key
    // dropParts variable is in dropPart.js
    dropParts.forEach(dropPart => {
        const dropPartId = dropPart.getAttribute('id') 
        if(dropPartId && !stepContainerFocused){
            if(key === dropPartId[dropPartId.length - 1]){
                dropPart.focus()
            }
        }
    })
})

function hidedropParts(){
    dropParts.forEach(dropPart => {
        const parent = dropPart.parentElement
        const stepsContainer = parent.querySelector('.steps-container')
        if(stepsContainer){
            stepsContainer.classList.add('hide')
        }
    })
}
hidedropParts()

dropParts.forEach(dropPart=> {
    dropPart.addEventListener('keydown', e => {
        if(e.keyCode === 13){
            e.preventDefault()
            removeTabToImages()
            togglePart(e)
        } 
    })
    dropPart.addEventListener('click', e => {
        e.preventDefault()
        removeTabToImages()
        togglePart(e)
    })
    dropPart.addEventListener('focusin', e => {
        delargeAllVideo()
        removeTabToImages()
        removeAsTabIndex(e)
    })
    dropPart.addEventListener('focusout', e => {
        delargeAllVideo()
        removeTabToImages()
        removeAsTabIndex(e)
    })
})

function togglePart(e) {
    let parent = getPartContainer(e.target.parentElement)
    let stepsContainer = parent.querySelector('.steps-container')
    // console.log(stepsContainer)
    if(stepsContainer.classList.contains('show')){
        stepsContainer.classList.remove('show')
        stepsContainer.classList.remove('hide')
    }
    if(stepsContainer.classList.contains('hide')){
        stepsContainer.classList.remove('hide')
    } else {
        stepsContainer.classList.add('hide')
    }
}

function getPartContainer(parent){
    if(parent.classList.contains('part')){
        return parent
    } else if (parent.parentElement){
        return getPartContainer(parent.parentElement)
    } else {
        return null
    }
}
