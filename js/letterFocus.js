addEventListener('keydown', e => {
    const allAs = document.querySelectorAll('a')
    let letter = e.key.toLowerCase()
    let letteredAs = [...allAs].filter( a => {
        const rect = a.getBoundingClientRect()
        console.log(a,rect.height)
        return a.offsetParent != null &&  rect.width > 0 && rect.height >0
    })

})