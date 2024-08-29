const tutorials = document.querySelectorAll('.tutorial')
const homelink = document.getElementById('homelink')

addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    
    tutorials.forEach(el => {
        const h3 = el.querySelector('a > h3')
        console.log(h3.innerText[1])
        if(letter == el.innerText[1] || letter == el.innerText[5]){
            el.focus()
        }
    })
    if(letter == 'h'){
        homelink.focus()
    }
    
})