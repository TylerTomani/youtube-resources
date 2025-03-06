// import { parts } from "./side-bar-scripts/letterFocus-sidebar.js";
// import { parts } from "./letterFocus-sidebar.js";
import { sideBarBtn } from "./letterFocus-sidebar.js";
import { executeCodeExample } from "./execute-codeExample.js";
const body = document.querySelector('body')
const mainContent = document.querySelector('.main-content')
let currentClicked
function hrefText(response){
    let html = response.text()
    return html
}
function displayHtml(html){
    mainContent.innerHTML = html
    return html
}
function fetchHref(href) {
    fetch(href)
        .then(hrefText)
        .then(displayHtml)
        .then(findScriptTag)
        
}
function clickLesson(e) {
    let href = e.target.href
    fetchHref(href)
    if(e.target == currentClicked){
        scrollTo(0,0)
    }
    currentClicked = e.target
}
// parts.forEach(el => {
//     if(el.hasAttribute('autofocus')){
//         console.log(el.innerText)
//         fetchHref(el.href)
//     }
//     el.addEventListener('click', e => {
//         e.preventDefault()
//         let href = e.target.href
//         let promise = clickLesson(e)
//     })
// })
function findScriptTag(html){
    let scriptTag = mainContent.querySelector('#addScript')
    if (scriptTag){
        mainContent.querySelector('.steps-container').removeChild(scriptTag)
        executeCodeExample()
    }
    body.append(scriptTag)
}