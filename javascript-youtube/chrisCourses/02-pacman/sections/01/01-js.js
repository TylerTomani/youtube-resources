(function(){
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')
    canvas.width = innerWidth
    canvas.height = innerHeight * .7
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    class Boundary{
        constructor({position}){
            this.position = position
            this.width = 40
            this.height = 40
        }
        draw(){
            c.fillStyle = 'blue'
            c.fillRect(this.position.x, this.position.y, this.width,this.height)

        }
    }

    const boundaries = [
        new Boundary({
            position : {
                x: 0,
                y: 0
            }
        }),
        new Boundary({
            position : {
                x: 40,
                y: 0
            }
        })
    ]
    boundaries.forEach(el => {
        el.draw()
    })
}())