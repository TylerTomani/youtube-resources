const tutorials = document.querySelectorAll('.tutorial')
const backlink = document.getElementById('backlink')
const homelink = document.getElementById('homelink')

addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(!isNaN(letter)){
        const intlet = parseInt(letter)
        if(intlet <= tutorials.length){

            tutorials[intlet - 1].focus()
        }
    }
    switch(letter){
        case 'h':
            homelink.focus()
            break
        case 'b':
            backlink.focus()
            break
        case 't':
            tutorialLink.focus()
            break
        
    }
});
