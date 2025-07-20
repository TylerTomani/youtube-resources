// import { parts } from "./letterFocus-sidebar.js"
// const mainContent = document.querySelector('.main-content')

// parts.forEach(el => {
//     if(el.hasAttribute('autofocus')){
//         injectPage(el.href)
//     }
//     el.addEventListener('click', e => {
//         e.preventDefault()
//         e.stopPropagation()
//         injectPage(e.target.href)
//     })
// })
// function injectPage(href){
//     fetch(href)
//     // .then(response => {
//     //     return response.text()
//     // })
//     /** Below does the same as above */
//     .then(response => response.text())
//     .then(html => {
//         // console.log(html)
//         mainContent.innerHTML = ``
//         mainContent.innerHTML = html

//     })
// }