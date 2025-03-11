const sidebarBtn = document.querySelector('#sideBarBtn')
sidebarBtn.addEventListener('click', e =>{
    e.preventDefault()
    const sideBar = document.querySelector('.side-bar')
    e.target.classList.toggle('drop')
    sideBar.classList.toggle('deactive')
})
sidebarBtn.addEventListener('keydown', e =>{
    let letter = e.key.toLowerCase()
    if(letter == 'enter'){
        const sideBar = document.querySelector('.side-bar')
        sidebarBtn.classList.toggle('drop')
        sideBar.classList.toggle('deactive')
        console.log(sidebarBtn)
    }
})