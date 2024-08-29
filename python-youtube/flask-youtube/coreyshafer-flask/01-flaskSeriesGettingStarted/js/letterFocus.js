// const allAs = document.querySelectorAll('a')
const subjects = document.querySelectorAll('.subject')
const homeLink = document.querySelector('.home-link')
const projects = document.querySelectorAll('.dropPart')
addEventListener('keydown', e => {
    let key = e.key
    // projects variable located in loadpage.js
    if(projects){
        projects.forEach(project => {
            const projectId = project.getAttribute('id')
            if(key === projectId[0]){
                project.focus()
            }
        })
    }

    
 
})

