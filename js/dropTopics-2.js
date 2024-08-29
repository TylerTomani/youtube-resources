const dropTopics = document.querySelectorAll('.dropTopic')
const subResourcesContainers = document.querySelectorAll('.sub-resources-container')

function hideSubResources(){
    subResourcesContainers.forEach(el => {
        if(!el.classList.contains('show')){
            const resources = el.querySelectorAll('.resource')
            resources.forEach(el => {
                el.classList.add('hide')
            })
        }
    })
}
hideSubResources()

dropTopics.forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault()
        // subResourcesToggle(e)
        toggleResources(e)
        console.log(e.target)
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if(letter == 'enter'){   
            // e.preventDefault()
            toggleResources(e)
        }
    })
})
function toggleResources(e){
    const topicContainer = getTopicContainer(e.target.parentElement)
    const subResourcesContainer = topicContainer.querySelector('.sub-resources-container')
    const resources = subResourcesContainer.querySelectorAll('.resource')

    resources.forEach(el => {
        el.classList.toggle('hide')
    })
}


function getTopicContainer(parent){
    if(parent.classList.contains('topic-container')){
        return parent
    } else if (parent.parentElement){
        return getTopicContainer(parent.parentElement)
    } else {
        return null
    }
}