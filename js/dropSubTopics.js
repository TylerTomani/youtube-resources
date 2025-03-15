
const dropSubTopics = document.querySelectorAll('.drop-sub-topic')
const topicsContainers = document.querySelectorAll('.topics-container')
const subTopicContainer = document.querySelectorAll('.sub-topic-container')


dropSubTopics.forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault()
        toggleSubTopic(e)
    })
})
hideAllSUBTopicsContainers()

function toggleSubTopic(e) {
    const subTopic = getSubTopic(e.target.parentElement)
    const subTopicsContainer = subTopic.querySelector('.sub-topic-container')
    console.log(subTopicContainer)
    if (subTopicsContainer) {
        subTopicsContainer.classList.toggle('hide')
    }
}


function hideAllSUBTopicsContainers() {

    subTopicContainer.forEach(el => {
        if (!el.classList.contains('show')) {
            el.classList.add('hide')
        }
    })
}
function getSubTopicsContainer(parent) {
    if (parent.classList.contains('sub-topics-container')) {
        return parent
    } else if (parent.parentElement) {
        return getSubTopicsContainer(parent.parentElement)
    } else {
        return null
    }
}
function getSubTopic(parent) {
    if (parent.classList.contains('sub-topic')) {
        return parent
    } else if (parent.parentElement) {
        return getSubTopic(parent.parentElement)
    } else {
        return null
    }
}
