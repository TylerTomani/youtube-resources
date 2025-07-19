(function () {

    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')
    canvas.width = innerWidth
    canvas.height = innerHeight * .7
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

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
    boundaries.forEach(el => {
        el.draw()
    })
    pacman.draw()
}())
