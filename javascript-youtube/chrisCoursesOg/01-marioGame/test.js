(function () {
/** @type {HTMLCanvasElement} */
const platformImage = new Image();
const groundImage = new Image();
const hillsImage = new Image();
platformImage.src = './img/platform.png';
groundImage.src = './img/platform.png';
const backgroundSrc = './img/background.png';
const hillsSrc = './img/hills.png';
const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight * .66
const c = canvas.getContext('2d')
const gravity = 1.5
const playerSpeed = 9
let playterSpeed = 9
let backgroundSpeed = 3

function createImage(imgSrc){
    const image = new Image()
    image.src = imgSrc
    return image
}
const keys = {
    left: {
        pressed: false
    },
    up: {
        pressed: false
    },
    right: {
        pressed: false
    },
    down: {
        pressed: false
    },
}
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = canvas.width * .05
        this.height = canvas.width * .05
    }
    draw() {
        c.fillStyle = 'lime'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.draw()
        if (player.position.y + player.height + player.velocity.y < canvas.height) {
            this.velocity.y += gravity
        } else {
            // this.velocity.y = 0
        }
    }
}
class Platform {
    constructor({ x, y, height = 10, image }) {
        // this.position = {
        //     x: x,
        //     y: y
        // }
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = height
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}
class Ground {
    constructor({ x, y, image }) {
        // this.position = {
        //     x: x,
        //     y: y
        // }
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}
class GenericObject {
    constructor({ x, y, height = 10, image }) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = height
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}
let platforms = []
let groundArray = []
let backgroundImages = []
let player = new Player()
let scrollOffset = 0

function init(){
    platforms = []
    platforms.push(new Platform({ x: canvas.width * .8, y: canvas.height * .7, image: platformImage }))
    platforms.push(new Platform({ x: canvas.width * 2, y: canvas.height * .3, image: platformImage }))
    platforms.push(new Platform({ x: canvas.width * 1.1, y: canvas.height * .4, image: platformImage }))
    platforms.push(new Platform({ x: platformImage.width * 9, y: canvas.height * .8, image: platformImage }))
    platforms.push(new Platform({ x: platformImage.width * 5.6, y: canvas.height * .3, image: platformImage }))
    groundArray = []
    groundArray.push(new Ground({ x: 0, y: canvas.height * .9, image: groundImage }))
    groundArray.push(new Ground({ x: groundImage.width, y: canvas.height * .9, image: groundImage }))
    groundArray.push(new Ground({ x: groundImage.width * 3, y: canvas.height * .9, image: groundImage }))
    groundArray.push(new Ground({ x: groundImage.width * 2.5, y: canvas.height * .9, image: groundImage }))
    groundArray.push(new Ground({ x: groundImage.width * 3.5, y: canvas.height * .9, image: groundImage }))
    groundArray.push(new Ground({ x: groundImage.width * 5, y: canvas.height * .9, image: groundImage }))
    groundArray.push(new Ground({ x: groundImage.width * 6.5, y: canvas.height * .9, image: groundImage }))
    groundArray.push(new Ground({ x: groundImage.width * 7.5, y: canvas.height * .9, image: groundImage }))

    backgroundImages = []
    backgroundImages.push(new GenericObject({
        x: 0,
        y: 0,
        image: createImage(backgroundSrc)
    }))
    backgroundImages.push(new GenericObject({
        x: 0,
        y: 0,
        image: createImage(hillsSrc)
    }))
        player = new Player()
    let scrollOffset = 0
}
init()


function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    backgroundImages.forEach(platform => {
        platform.draw()
    })
    platforms.forEach(platform => {
        platform.draw()
    })
    groundArray.forEach(ground => {
        ground.draw()
    })

    // Right Left Direction
    if (keys.right.pressed && player.position.x < canvas.width * .5) {
        player.velocity.x = playerSpeed
    } else if ((keys.left.pressed && player.position.x > 100)
        || keys.left.pressed && scrollOffset > 0
        && player.position.x > canvas.width * .1 ) 
            {
        player.velocity.x = -playerSpeed
    } else {
        console.log('dlfkjs')
        player.velocity.x = 0
        // player.position.x = scrollOffset
        // player.position.x = 0
        console.log(scrollOffset)
        if (keys.right.pressed) {
            scrollOffset += playerSpeed
            platforms.forEach(platform => {
                platform.position.x -= playterSpeed
            })
            groundArray.forEach(ground => {
                ground.position.x -= playterSpeed
            })
            backgroundImages.forEach(el => {
                el.position.x -= backgroundSpeed
            })
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= playerSpeed
            platforms.forEach(platform => {
                platform.position.x += playterSpeed
            })
            groundArray.forEach(ground => {
                ground.position.x += playterSpeed
            })
            backgroundImages.forEach(el => {
                el.position.x += backgroundSpeed
            })

        }
    }
    // Up Down Direction
    
    // Platform collision detections
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y
            && player.position.y + player.height + player.velocity.y >= platform.position.y
            && player.position.x + player.width >= platform.position.x
            && player.position.x < platform.position.x + platform.width) {
            player.velocity.y = 0
        }

    })
    // Ground collision detections

    groundArray.forEach(ground => {
        if (player.position.y + player.height <= ground.position.y
            && player.position.y + player.height + player.velocity.y >= ground.position.y
            && player.position.x + player.width >= ground.position.x
            && player.position.x < ground.position.x + ground.width) {
            player.velocity.y = 0
        }
    })
    if (keys.up.pressed && player.position.y > 0) {
        player.velocity.y = -17
    }
    if (scrollOffset > 28000) {
        console.log('you win')
    }
    if(player.position.y > canvas.height){
        init()
    }
    
    player.update()
}
animate()



    addEventListener('keyup', e => {
        let letter = e.key.toLowerCase()
        switch (letter) {
            case 'a':
                keys.left.pressed = false
                break
            case 'w':
                keys.up.pressed = false
                break
            case 'd':
                keys.right.pressed = false
                break
            case 's':
                keys.down.pressed = false
                break
        }
    })
    addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        switch (letter) {
            case 'a':
                keys.left.pressed = true
                break
            case 'w':
                keys.up.pressed = true
                break
            case 'd':
                keys.right.pressed = true
                break
            case 's':
                keys.down.pressed = true
                break

        }

    });
    


}())