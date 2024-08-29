const webpagesAs = document.querySelectorAll('.webpage > a')
const tutorialPages = document.querySelectorAll('.tutorial-page')

webpagesAs.forEach(a => {
    a.addEventListener('click', e => {
        const webpage = getWebpage(e.target.parentElement)
        const webPageTutorials = webpage.querySelector('.webpage-tutorials')
        if(webPageTutorials.classList.contains('hide')){
            webPageTutorials.classList.remove("hide")
        } else {
            webPageTutorials.classList.add('hide')
        }
    })
})

function getWebpage(parent){
    if(parent.classList.contains('webpage')){
        return parent
    } else if (parent.parentElement){
        return getWebpage(parent.parentElement)
    } else {
        return null
    }
}

tutorialPages.forEach(tutorialPage => {
    const img = tutorialPage.querySelector('img')
    img.addEventListener('click', e => {
        e.preventDefault()
        const parent = e.target.parentElement
        let a = parent.querySelector('a')
        window.location.href = a.href
        console.log(a)
    })
    tutorialPage.addEventListener('keydown', e => {
        let key = e.keyCode
        if(key === 13){
            let a = e.target.querySelector('a')
            window.location.href = a.href

        }
    })
})