export const dropTopics = document.querySelectorAll('.dropTopic')
const subTopicsContainers = document.querySelectorAll('.sub-topics-container')
function hideSubTopics(){
    subTopicsContainers.forEach(el => {
        if(!el.classList.contains('show')){
            const subTopics = el.querySelectorAll('.sub-topic')
            subTopics.forEach(el => {
                el.classList.add('hide')
            })
        }
        // if(el.classList.contains('show'))
    })
}
hideSubTopics()
dropTopics.forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault()
        // subResourcesToggle(e)
        toggleTopics(e)
        console.log(e.target)
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if(letter == 'enter'){   
            // e.preventDefault()
            toggleTopics(e)
        }
    })
})
function toggleTopics(e){
    const topicContainer = getTopicContainer(e.target.parentElement)
    const subTopicsContainer = topicContainer.querySelector('.sub-topics-container')
    const subTopics = subTopicsContainer.querySelectorAll('.sub-topic')

    subTopics.forEach(el => {
        if(el.classList.contains('hide')){
            el.classList.remove('hide')
        } else {
            el.classList.add('hide')

        }
    })
}
export function getTopicContainer(parent){
    if(parent.classList.contains('topic-container')){
        return parent
    } else if (parent.parentElement){
        return getTopicContainer(parent.parentElement)
    } else {
        return null
    }
}