export const sideBarBtn = document.querySelector("#sideBarBtn")
const sideBar = document.querySelector('.side-bar')

function toggleSideBar(){
    sideBar.classList.toggle('active')
}


sideBar.addEventListener('click', e => {
    e.preventDefault()
    if (e.target == sideBar) {
        toggleSideBar()

    }
})
sideBarBtn.addEventListener('click', e => {
    e.preventDefault()
    toggleSideBar()
})
sideBarBtn.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase() 
    if(letter == 'enter' ){
        toggleSideBar()
    }
})