addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    
    const allAs = [...document.querySelectorAll('a')].filter( a => {
        const rect = a.getBoundingClientRect()
        // console.log(a,rect.height)
        return a.offsetParent != null &&  rect.width > 0 && rect.height >0
    })

    const letteredAs = allAs.filter( a =>{
        const text = a.innerText.trim().toLowerCase();
        console.log(text)
        return text.startsWith(letter)
    })

    if(letteredAs === 0 ) return 

    const activeEl = document.activeElement
    const iAllAs = [...allAs].indexOf(activeEl)
    const iLetteredAs = [letteredAs].indexOf(activeEl)
    
    if(letter !== window.lastLetterPressed){
        let iLetter 
        if(e.shiftKey){
            iLetter = iLetter
        }      
    }
    


})