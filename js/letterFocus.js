(function(){
    const allIdEls = document.querySelectorAll('[id]')
    // iLetter is index to increment up thru letterIds
    let iLetter
    let currentLetter
    let currentEl
    let currentResourceFocus = false
    let letterIds = []
    let lastIndex, nextIndex
    addEventListener('DOMContentLoaded', e => {

    })
    addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()

        /** Slight problem, when Freecodecamp is collapsed, pressing the 'f' key 
         * does not go to the next element showing which right now is FHIR
         */
        
        letterIds = []
        if(letter == 'h'){
            scrollTo(0,0)
        }
        
            
        allIdEls.forEach(el => {
            if (letter == el.id[0].toLowerCase() && !el.classList.contains('hide')) {
                letterIds.push(el)
            }
        })
        console.log(letterIds)
        if(letterIds){
            if (currentLetter == letter ) {
                iLetter = (iLetter + 1) % letterIds.length
                letterIds[iLetter].focus()
                
            } else if (letterIds.length > 0) {
                iLetter = 0
                letterIds[0].focus()
            }
        }
        currentLetter = letter
        currentEl = e.target
    });


}())