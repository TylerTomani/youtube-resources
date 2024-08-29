import {stepTxts} from './animateImg.js'
import {getStep}  from './animateImg.js'
import { parts } from './tutorial-drops.js'
let tabsAdded = false

function removeTabs(){
    const as = document.querySelectorAll('.step-txt a')
    as.forEach(a => {
        a.setAttribute('tabindex','-1')
    })
    const copyCodes = document.querySelectorAll('.copy-code')
    copyCodes.forEach(pre => {
        pre.setAttribute('tabindex','-1')
    })
    tabsAdded = false
}
removeTabs
stepTxts.forEach(stepTxt => {
    // console.log(stepTxt)
    stepTxt.addEventListener('click', e => {
        if(!tabsAdded){
            const step = getStep(e.target.parentElement)
            const as = step.querySelectorAll('.step-txt a')
            const copyCodes = step.querySelectorAll('.step-txt .code-container > .copy-code ')
            console.log(step)
            as.forEach(a => {
                a.setAttribute('tabindex','1')
            })
            copyCodes.forEach(pre => {
                
                pre.setAttribute('tabindex','1')
            })  
            // tabsAdded = !tabsAdded
        }
    })
    stepTxt.addEventListener('keydown', e => {
        let key = e.keyCode
        
        if(key === 13){
            if(!tabsAdded ){
                const step = getStep(e.target.parentElement)
                const as = step.querySelectorAll('.step-txt a')
                const copyCodes = step.querySelectorAll('.step-txt .code-container > .copy-code ')
                as.forEach(a => {
                    a.setAttribute('tabindex','1')
                })
                copyCodes.forEach(pre => {
                    
                    pre.setAttribute('tabindex','1')
                })
                    tabsAdded = true
            } else {
                removeTabs()
                tabsAdded = false
            }
        }
        
        
    })
    stepTxt.addEventListener('focus', e => {
        tabsAdded = false
        // removeTabs()
    })
    stepTxt.addEventListener('focusin', e => {
        tabsAdded = false
        
    })
    stepTxt.addEventListener('focusout', e => {
        tabsAdded = false
        removeTabs()
    })
})

parts.forEach(part => {
    part.addEventListener('focusin', e => {
    removeTabs()
})
})