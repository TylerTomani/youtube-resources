export const parts = document.querySelectorAll('.part > h3 > a')

function hideStepContainers(){
    const stepContainers = document.querySelectorAll('.steps-container')
    stepContainers.forEach(stepContainer => {
        if(!stepContainer.classList.contains('show')){
            stepContainer.classList.add('hide')
        }
    })
}
hideStepContainers()

parts.forEach(part => {
    part.addEventListener('click', e => {
        let parent = getPart(e.target.parentElement)
        let stepsContainer = queryStepsContainer(parent)
        toggleDisplay(stepsContainer)

    })
})

function getPart(parent){
    if(parent.classList.contains('part')){
        return parent
    } else if(parent.parentElement){
        return getPart(parent.parentElement)
    } else {
        return null
    }
}
function queryStepsContainer(parent){
    return parent.querySelector('.steps-container')

}

function toggleDisplay(el){
    if(el.classList.contains('show')){
        el.classList.remove('show')
    }
    if(!el.classList.contains('hide')){
        el.classList.add('hide')
    } else {
        el.classList.remove('hide')
    }
}