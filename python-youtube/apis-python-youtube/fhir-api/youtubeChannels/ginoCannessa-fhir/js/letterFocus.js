const allAs = document.querySelectorAll('a')
const subjects = document.querySelectorAll('.subject')
// const hLink = document.querySelector('.home-link > a')
// const notesTextArea = document.querySelector('#notesTextArea')
addEventListener('keydown', e => {
    let key = e.key

    switch (key){
        case 'h' || 'H':
            hLink.focus()
            break;
        case 'n' || 'N':
            // notesTextArea.value = ''
            // notesTextArea.focus()
            break;
    }
})


addEventListener('keydown', e => {
    let key = e.key
    allAs.forEach(a => {
        if(a.hasAttribute('id')){
            const aId = a.getAttribute('id')
            if(key == aId[0]){
                a.focus()
            }
        }
    })
})