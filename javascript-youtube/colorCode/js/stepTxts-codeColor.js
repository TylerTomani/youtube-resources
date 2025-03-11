import { mainTargetDivFocused } from "./letterFocus-sidebar.js"
export let lastStep = null
export let stepFocused
export function stepTxtsFocus() {
    const steps = document.querySelectorAll('.step , .step-float , .step-col3')
    // const tabIndexElements = document.querySelectorAll('.copy-code, textarea')
    // Maybe just keep text area with focus
    const tabIndexElements = document.querySelectorAll('.copy-code')
    const  imgVids = document.querySelectorAll('.step-img > img, .step-vid, video')
    
    
    
    tabIndexElements.forEach(el => {
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if (letter == 'enter') {
                e.stopPropagation()
                toggleImgVid(e)
            }
        })
        el.addEventListener('focus', e => {
            deEnlargeAllImgVid()
        })
    })
    steps.forEach(el => {
        el.addEventListener('focus', e => {
            removeAllTabIndexes()
            deEnlargeAllImgVid()
            lastStep = e.target
        })
        
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if(letter == 'enter'){   
                toggleImgVid(e)
                addTabIndexes(e)
            }
        })
    })
    function toggleImgVid(e){
        const step = getStep(e.target)
        const img = step.querySelector('img')
        if(img){
            img.classList.toggle('enlarge')
        }
        

    }
    function addTabIndexes(e){
        const tabEls = e.target.querySelectorAll('.copy-code, textarea')
        tabEls.forEach(el => {
            el.setAttribute('tabindex', '0')
        })
    }
    function removeAllTabIndexes(){
        tabIndexElements.forEach(el => {
            el.setAttribute('tabindex', '-1')
        })
    }
    function deEnlargeAllImgVid(){
        imgVids.forEach(el => {
            if(el.classList.contains('enlarge')){
                el.classList.remove('enlarge')
            }
        })
    }
    addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if(letter == 'm' && lastStep){
            lastStep.focus()
        }
        if(!mainTargetDivFocused){
        }
        if (letter == 'c' && !e.metaKey) {
            const consoleEntry = document.querySelector('.consoleEntry')
            e.preventDefault()
            consoleEntry.focus()
        }
        
        if (!isNaN(letter) ) {
            let intLet = parseInt(letter)
            if (intLet <= steps.length) {
                steps[intLet - 1].focus()
            } else {
                const endNxtLesson = document.querySelector('#endNxtLesson')
                endNxtLesson.focus()
            }
        }
    })
}

function getStep(parent){
    // if(parent.classList.contains('step')){
    if (parent.classList.contains('step') || parent.classList.contains('step-float')){
        return parent
    } else if (parent.parentElement){
        return getStep(parent.parentElement)
    } else {
        return null
    }
}

// DELETE THIS when side bar works
// stepTxtsFocus()