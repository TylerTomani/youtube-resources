let allEls = document.querySelectorAll('[id]');
const sideBarBtn = document.getElementById('sidebarbtn')
let elsLettered = []
let iLetter = 0
let currentLetter
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'a'){
        sideBarBtn.focus()
    }
    if(letter == 'm'){
        e.preventDefault()
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
        
        if(elsLettered.length > 0){
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