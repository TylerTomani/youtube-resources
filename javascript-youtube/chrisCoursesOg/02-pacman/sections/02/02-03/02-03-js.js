(function () {
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')
    canvas.width = innerWidth
    canvas.height = innerHeight * .7

    let canavsRect
    let clickX
    let clickY
    let lastDirection = ''
    /** Get this so when first container is clicked this 
        gets focused, AND when steps are clicked, this pop up follows the 
        step-txt and shows the change in the code in this popup
    */

    let lastKey = ''
    let playerSpeed = 2


    const keys = {
        up: {
            pressed: false
        },
        right: {
            pressed: false
        },
        down: {
            pressed: false
        }
        ,
        left: {
            pressed: false
        }
    }

    //Boundary Class


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

    //Pacman Class



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
        update() {
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

    // Boundaries & Map

    const map = [
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', '-', '-', '-', '-', '-', '-'],
        [' ', '-', ' ', ' ', ' ', ' ', '-'],
        [' ', '-', ' ', '-', '-', ' ', '-'],
        [' ', '-', ' ', ' ', ' ', ' ', '-'],
        [' ', '-', '-', '-', '-', '-', '-']
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

    // Mouse Click

    function getMousePosition(event) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
    function calculateAngle(mouseX, mouseY, pacmanX, pacmanY) {
        const dx = mouseX - pacmanX;
        const dy = mouseY - pacmanY;
        let angle = Math.atan2(dy, dx) * (180 / Math.PI); // Angle in degrees
    
        // Normalize angle to be between 0 and 360 degrees
        if (angle < 0) {
            angle += 360;
        }
        
        return angle;
    }
    
    canvas.addEventListener('pointerup', e => {
        keys.right.pressed = false
        keys.down.pressed = false
        keys.up.pressed = false
        keys.left.pressed = false

    })
    canvas.addEventListener('pointerdown', e => {
        const mousePoint = getMousePosition(e);
        const pacmanCenterX = pacman.position.x;
        const pacmanCenterY = pacman.position.y;
        const angle = calculateAngle(mousePoint.x, mousePoint.y, pacmanCenterX, pacmanCenterY);
        console.log('Angle:', angle.toFixed(2), 'degrees');
        if(angle > 340 || angle < 45){
            keys.right.pressed = true
        } else
        if(angle > 45 && angle < 135){
            keys.down.pressed = true
            
        } else
        if(angle > 135 && angle < 214){
            keys.left.pressed = true
        } else
        if(angle > 214 && angle < 340){
            keys.up.pressed = true
        }
    });
    function animate() {
        requestAnimationFrame(animate)
        c.fillStyle = 'black'
        c.fillRect(0, 0, canvas.width, canvas.height)
        pacman.velocity.x = 0
        pacman.velocity.y = 0
        if (keys.up.pressed && lastKey != 'up') {
            pacman.velocity.y -= playerSpeed
        } else if (keys.right.pressed && lastKey != 'right') {
            pacman.velocity.x += playerSpeed
        } else if (keys.left.pressed && lastKey != 'left') {
            pacman.velocity.x -= playerSpeed
        } else if (keys.down.pressed && lastKey != 'down') {
            pacman.velocity.y += playerSpeed
        }
        boundaries.forEach(el => {
            el.draw()
        })
        pacman.update()
    }
    animate()



}())
