(function () {

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight * .7

let lastKey = ''
let playerSpeed = 2
const keys = {
    up:{
        pressed: false
    },
    right:{
        pressed: false
    },
    down: {
        pressed: false
    }
    ,
    left:{
        pressed: false
    }
}
addEventListener('keyup', e => {
    let key = e.keyCode
    switch (key){
        case 38:
            keys.up.pressed = false
            lastKey = 'up'
            break
        case 39:
            keys.right.pressed = false
            lastKey = 'right'
            break
        case 40:
            keys.down.pressed = false
            lastKey = 'down'
            break
        case 37:
            keys.left.pressed = false
            lastKey = 'left'
            break
    }    
});
addEventListener('keydown', e => {
    let key = e.keyCode
    console.log(key)
    switch (key){
        case 38:
            e.preventDefault()
            keys.up.pressed = true
            break
        case 39:
            e.preventDefault()
            keys.right.pressed = true
            break
        case 40:
            e.preventDefault()
            keys.down.pressed = true
            break
        case 37:
            e.preventDefault()
            keys.left.pressed = true
            break
    }    
});
//Boundaries
class Boundary {
    static width = 30
    static height = 30
    constructor({ position }) {
        this.position = position
        this.width = 30
        this.height = 30
    }
    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

    }
}
//Pacman
class Pacman {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 15
    }
    draw() {
        c.beginPath()
        c.fillStyle = 'yellow'
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fill()
        c.closePath()
    }
    update(){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.draw()
    }
}
const pacman = new Pacman({
    position: {
        x: Boundary.width + (Boundary.width * .5),
        y: Boundary.height + (Boundary.height * .5),
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const map = [
    ['-', '-', '-', '-', '-', '-'],
    ['-', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', '-', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', '-'],
    ['-', '-', '-', '-', '-', '-']
]
const boundaries = []
map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    }
                }))
                break
        }
    })
})
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    pacman.velocity.x = 0
    pacman.velocity.y = 0
    if (keys.up.pressed && lastKey != 'up') {
        pacman.velocity.y -= playerSpeed
    }else if(keys.right.pressed && lastKey != 'right'){
        pacman.velocity.x += playerSpeed
    } else if (keys.left.pressed && lastKey != 'left'){
        pacman.velocity.x -= playerSpeed
    }else if (keys.down.pressed && lastKey != 'down'){
        pacman.velocity.y += playerSpeed
    } 
    boundaries.forEach(el => {
        el.draw()
    })
    pacman.update()
}
animate()


}())
