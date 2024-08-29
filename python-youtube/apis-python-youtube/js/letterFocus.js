const allEls = document.querySelectorAll('body *')

addEventListener('keydown', e => {
    let key = e.key
    allEls.forEach(el => {
        if(el.hasAttribute('tabindex') && key.toLowerCase() == el.id[0].toLowerCase()){
            el.focus()
        }
    })

})
