addEventListener('keydown', e => {


    const letter = e.key.toLowerCase()
    if (letter.length !== 1 || !/^[a-z0-9]$/.test(letter)){
        return 
    }
    // if (!isNaN(letter) && e.target.classList.contains('drop-topic')){
    if (!isNaN(letter)){
        const intLet = parseInt(letter)
        if(intLet){

        }
        // return
    }
    // console.log('skjdf')
    const allAs = [...document.querySelectorAll('a, [id]')].filter( a => {
        const rect = a.getBoundingClientRect()
        // console.log(a,rect.height)
        return a.offsetParent != null &&  rect.width > 0 && rect.height >0
    })

    const letteredAs = allAs.filter( a =>{
        let text = a.innerText.trim().toLowerCase();
        // if(text.startsWith('0')){
        //     console.log('kjdf')
        //     text = text.slice(3)
        // }
        if (!/^[a-z0-9]/i.test(text)) {
                const match = text.match(/[a-z0-9]/i);
                if (match) {
                    const index = text.indexOf(match[0]);
                    text = text.slice(index);
                }
            }
        console.log(text)
        return text.startsWith(letter)
    })
    // if(letteredAs.length === 0 ){
    //     console.log('return')
    //     return 
    // } 

    const activeEl = document.activeElement
    const iActiveEl = [...allAs].indexOf(activeEl)
    const iLetteredA = letteredAs.indexOf(activeEl)
    
    

    // letteredAs.forEach(el => console.log(el))
    if(letter !== window.lastLetterPressed){
        let iLetter 
        if(e.shiftKey){
            const prev = [...letteredAs].reverse().find(a => allAs.indexOf(a) < iActiveEl)
            iLetter = letteredAs.indexOf(prev)
            if(iLetter === -1) iLetter = letteredAs.length - 1 
        } else {
            const next = letteredAs.find(a => allAs.indexOf(a) > iActiveEl)
            iLetter = letteredAs.indexOf(next)
            if(iLetter === -1) iLetter = 0
        }
        letteredAs[iLetter]?.focus()
    } else { // the else only works when the Letter IS the same Previous Letter, opposite first above
        let iLetter 
        if(e.shiftKey){
            iLetter = (iLetteredA - 1 + letteredAs.length) % letteredAs.length
        } else {
            iLetter = (iLetteredA + 1 ) % letteredAs.length
        }
        letteredAs[iLetter]?.focus();
        // console.log(letteredAs[iLetter])
    } 
    window.lastLetterPressed = letter    


})