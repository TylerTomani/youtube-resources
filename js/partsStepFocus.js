const dropParts = document.querySelectorAll('.dropPart')
const homelink = document.getElementById('homelink')
const backlink = document.getElementById('backlink')
const tutorialLink = document.getElementById('tutorialLink')
let iParts = 0
let partsFocused = true
let stepsFocused = false
let shiftP = []
let pressedShiftP = false
const keys = {
    shift : {
        pressed : false
    }
}

addEventListener('keyup', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'shift'){
        keys.shift.pressed = false
    }
    
});
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'shift'){
        keys.shift.pressed = true
        console.log(keys.shift.pressed)
    }
    shiftP.push(letter)
    // if(shiftP.length > 2){
    //     shiftP.shift()
    // }
    // if(shiftP[0] == 'shift' && shiftP[1] == 'p'){
    //     pressedShiftP = true
    // } else {
    //     pressedShiftP = false
    // }
    // backlink,homlink,tutorialLink focus in switch()
    switch(letter){
        case 'b':
            backlink.focus()
            break
        case 'h':
            homelink.focus()
            break
        case 't':
            tutorialLink.focus()
            break
    }
    if(partsFocused){
        if (letter == 'p' && !keys.shift.pressed) {
            dropParts[iParts].focus()
            iParts = (iParts + 1) % dropParts.length
        } else
        if (letter == 'p' && keys.shift.pressed) {
            console.log(iParts)
            if(iParts == -1){
                iParts = dropParts.length
                dropParts[iParts].focus()
            } else {
                iParts -= 1
                dropParts[iParts].focus()
            }
        }
        
    }
});

function getPart(parent){
    if(parent.classList.contains('part')){
        return parent
    } else if (parent.parentElement){
        return getPart(parent.parentElement)
    } else {
        return null
    }
}