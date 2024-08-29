const topics = document.querySelectorAll('.topic > header > h2 > a')
// import { subTopics } from "./loadPage.js";

topics.forEach(topic => {
    topic.addEventListener('click', e => {
        let parent = getTopic(e.target.parentElement)
        const subTopicsContainer = parent.querySelector('.sub-topics-container')
        if(subTopicsContainer.classList.contains('hide')){
            subTopicsContainer.classList.remove('hide')
        } else {
            subTopicsContainer.classList.add('hide')
        }
    })
})
function getTopic(parent){
    if(parent.classList.contains('topic')){
        return parent
    } else if(parent.parentElement){
        return getTopic(parent.parentElement)
    } else {
        return null
    }
}