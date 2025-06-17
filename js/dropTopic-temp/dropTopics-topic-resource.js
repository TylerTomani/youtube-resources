(function(){
    const dropTopics = document.querySelectorAll('.drop-topic')
    const subResourcesContainers = document.querySelectorAll('.sub-resources-container')
    const subTopicsContainers = document.querySelectorAll('.sub-topics-container')
    function hideSubResources() {
        subResourcesContainers.forEach(el => {
            if (!el.classList.contains('show')) {
                const resources = el.querySelectorAll('.resource')
                resources.forEach(el => {
                    el.classList.add('hide')
                })
            }
        })
    }
    function hdieSubTopicsContainers() {
        if(subTopicsContainers){
            subTopicsContainers.forEach(el => {
                if (!el.classList.contains('show')) {
                    el.classList.add('hide')
                }
            })
        }
    }
    hideSubResources()
    hdieSubTopicsContainers()

    dropTopics.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault()
            // subResourcesToggle(e)
            toggleResources(e)
        })
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if (letter == 'enter') {
                e.preventDefault()
                toggleResources(e)
            }
        })
    })
    function toggleResources(e) {
        const topicContainer = getTopicContainer(e.target.parentElement)
        if(topicContainer){
            const subResourcesContainer = topicContainer.querySelector('.sub-resources-container')
            if(subResourcesContainer){
                const resources = subResourcesContainer.querySelectorAll('.resource')
                if(resources){    
                    resources.forEach(el => {
                        el.classList.toggle('hide')
                    })
                }
            }
            const subTopicsContainer = topicContainer.querySelector('.sub-topics-container')
            if(subTopicsContainer){
                subTopicsContainer.classList.toggle('hide')
                console.log(subTopicsContainer)
                const projects = subTopicsContainer.querySelectorAll('.project')
                if(projects){
                    projects.forEach(el =>{
                        el.classList.toggle('hide')
                    })

                }
            }
        }
    }


    function getTopicContainer(parent) {
        if (parent.classList.contains('topic-container')) {
            return parent
        } else if (parent.parentElement) {
            return getTopicContainer(parent.parentElement)
        } else {
            return null
        }
    }
}())