addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    // if(letter.length != 1 || /^[a-z][0-9]$/.test(letter)) return 
    const allAs = [...document.querySelectorAll('a')].filter(a => {
        const rect = a.getBoundingClientRect()
        return a.offsetParent !== null && rect.width > 0 && rect.height > 0;
    })
    const letteredAs = allAs.filter(a =>{
        // return a.textContent.trim()
        const text =  a.textContent.trim().toLowerCase()
        return text.startsWith(letter)
    })
    if(letter == 'enter'){
        letteredAs.forEach(el => console.log(el)) 
    }
    
})