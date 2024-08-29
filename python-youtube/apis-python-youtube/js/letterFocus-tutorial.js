const home = document.getElementById('home')
const tutorial = document.getElementById('tutorial')
const part = document.getElementById('p')
import {parts} from '../js/tutorial-drops.js'
let partsFocus = true
import { stepTxts } from './animateImg.js'
let stepFocus = false
const stepImages = document.querySelectorAll('.step-img > img')



export function deanimateImages(){
    stepImages.forEach(img => {
        img.classList.add('deanimate')
    })
}
deanimateImages()

addEventListener('keydown', e => {
    let key = e.key
    if(key.toLowerCase() === 'p'){
        part.focus()
    }   
    if(key.toLowerCase() === 'h'){
        home.focus()
    }
    if(key.toLowerCase() === 't'){
        tutorial.focus()
    }
    if(partsFocus){
        parts.forEach(part => {
            if(key === part.innerHTML[5]){
                part.focus()
            }
        })
    } 
})

stepTxts.forEach(stepTxt => {
    stepTxt.addEventListener('focus', e => {
        partsFocus = false
        stepFocus = true
        deanimateImages()
    })
    stepTxt.addEventListener('focusout', e => {        
        deanimateImages()
    })
    stepTxt.addEventListener('keydown', e => {
        let key = e.key
        let parent = getStepsContainer(e.target.parentElement)
        let stepNums = parent.querySelectorAll('.step-txt > h4')
        stepNums.forEach(stepNum => {
            if(key === stepNum.innerText[1]){
                stepNum.parentElement.focus()    
            }
        })
    })
})
parts.forEach(part=> {
    part.addEventListener('focus', e => {
        partsFocus = true
        stepFocus = false
    })
})

function getStepsContainer(parent){
    if(parent.classList.contains('steps-container')){
        return parent
    } else if(parent.parentElement){
        return getStepsContainer(parent.parentElement)
    } else {
        return null
    }
}