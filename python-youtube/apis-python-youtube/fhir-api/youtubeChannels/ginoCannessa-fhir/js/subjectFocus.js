// const allAs = document.querySelectorAll('a')
const subjects = document.querySelectorAll('.subject')
addEventListener('keydown', e => {
    let key = e.key
    if(subjects){
        subjects.forEach(subject => {
            const subjectId = subject.getAttribute('id')
            if(key === subjectId[0]){
                subject.focus()
            }
        })
    }
})