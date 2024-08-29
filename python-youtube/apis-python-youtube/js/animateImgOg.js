export const stepTxts = document.querySelectorAll('.step-txt')
export let enlarged = false

stepTxts.forEach(stepTxt => {
    stepTxt.addEventListener('click', e => {
        const parent = getStep(e.target.parentElement)
        const img = parent.querySelector('.step-img > img')
        animate(img)
    })
    stepTxt.addEventListener('keydown', e => {
        let keyCode = e.keyCode
        if(keyCode === 13){
            const parent = getStep(e.target.parentElement)
            const img = parent.querySelector('.step-img > img')
            animate(img)
        }
    })
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
    console.log(enlarged)
    
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
    } else {
        // el.classList.add('deanimate')
        el.classList.remove('animate')
        el.classList.remove('lg-animate')
        // enlarged = false
    }
    enlarged = !enlarged
    console.log(el)
}