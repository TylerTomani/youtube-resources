let allEls = document.querySelectorAll('[id]');
const sideBarBtn = document.getElementById('sidebarbtn')
let elsLettered = []
let iLetter = 0
let currentLetter
const copyCodes = document.querySelectorAll('.code-containers > .code-container > pre.copy-code')
let iCopyCodes = 0
const codeContainers = document.querySelector('.code-containers')
codeContainers.addEventListener('focusout', e =>{ 
    console.log('out')
})
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'a'){
        sideBarBtn.focus()
    }
    if(letter == 'c' && !e.metaKey){
        console.log(iCopyCodes)
        if(!e.shiftKey){
            copyCodes[iCopyCodes].focus()
            iCopyCodes = (iCopyCodes + 1) % copyCodes.length

        } else if(e.shiftKey){
            iCopyCodes = (iCopyCodes - 1 + copyCodes.length) % copyCodes.length
            copyCodes[iCopyCodes].focus()
        }   
    }
    if(letter == 'm'){
        // e.preventDefault()
        scrollTo(0,0)
    }
    if(letter != currentLetter){
        iLetter = 0
        elsLettered = []
        allEls.forEach(el => {
            if(letter == el.id[0]){
                elsLettered.push(el)
            }
        })
        
        if(elsLettered.length > 0 && !e.metaKey){
            elsLettered[0].focus()
        }
    }
    
    
    if(letter == currentLetter){
        allEls.forEach(el => {
            if(letter == el.id[0]){
                elsLettered.push(el)
            }
        })
        if(elsLettered.length > 0){
            iLetter = (iLetter + 1) % elsLettered.length
            elsLettered[iLetter].focus()
        }
    }
    currentLetter = letter

});