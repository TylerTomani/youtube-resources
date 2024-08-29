const subTopics = document.querySelectorAll('.sub-topic')

subTopics.forEach(subTopic => {
    subTopic.addEventListener('click', e => {
        e.preventDefault()
        let a = e.target.querySelector('a')
        window.location.href =  a.href
    })
    subTopic.addEventListener('keydown', e => {
        let key = e.keyCode
        if(key === 13){
            let a = e.target.querySelector('a')
            window.location.href =  a.href

        }
    })
})

