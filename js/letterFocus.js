(function(){
    const allIdEls = document.querySelectorAll('[id]')
    // iLetter is index to increment up thru letterIds
    let iLetter = 0
    let currentLetter
    let currentEl
    let currentResourceFocus = false
    let letterIds = []
    let lastIndex, nextIndex
    addEventListener('DOMContentLoaded', e => {

    })
    addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        letterIds = []
        if(letter == 'h'){
            scrollTo(0,0)
        }
        allIdEls.forEach(el => {
            if (letter == el.id[0].toLowerCase() && !el.classList.contains('hide')) {
                letterIds.push(el)
            }
        })
    
            
        if(letterIds.length == 0 ){return}

        if (letter != currentLetter ) {
            iLetter = 0
            letterIds[iLetter].focus()
        } else {
            if(!e.shiftKey){
                iLetter = (iLetter + 1) % letterIds.length
            } else {
                iLetter = (iLetter - 1 + letterIds.length) % letterIds.length
                
                letterIds[iLetter].focus()
            }
        } 
        console.log(iLetter, letterIds[iLetter])
        letterIds[iLetter].focus()
        
        currentLetter = letter
        currentEl = e.target
    });


}())