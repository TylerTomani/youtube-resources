const part03Link = document.getElementById('part03Link')
const part3 = document.getElementById('part03')
part03Link.addEventListener('click', e => {
    e.preventDefault()
    e.stopPropagation()
    part3.focus()
})

const allStepTxtAs = document.querySelectorAll('.step-txt > p > a')

allStepTxtAs.forEach(a => {
    a.addEventListener('click', e => {
        open(a.href)
        console.log('hdjhf')
    })
    a.addEventListener('keydown', e => {
        let key = e.keyCode
        if(key === 13){
             
            
            open(a.href)
            console.log('hdjhf')
        }
    })
})
