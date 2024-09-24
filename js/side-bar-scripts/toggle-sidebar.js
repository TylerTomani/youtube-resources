const sideBarBtn = document.querySelector("#sideBarBtn")
const sideBar = document.querySelector('.side-bar')

function toggleSideBar(){
    sideBar.classList.toggle('active')
}
sideBarBtn.onClick = function(){
    toggleSideBar()
}

sideBarBtn.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase() 
    if(letter == 'enter' ){
        toggleSideBar()
    }
})