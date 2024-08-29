const homeLink = document.querySelector('.home-link > a')
const notesTextArea = document.querySelector('#notesTextArea')
addEventListener('keydown', e => {
    let key = e.key

    switch (key){
        case 'h' || 'H':
            homeLink.focus()
            break;
        case 'n' || 'N':
            notesTextArea.value = ''
            notesTextArea.focus()
    }
    
 
})

