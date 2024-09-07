(function(){
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')
    canvas.width = innerWidth
    canvas.height = innerHeight * .7
    let xBlock = 10
    let yBlock = 10
    let heightWidth = 20
    const blockImg = new Image()
    blockImg.src = './js/canvas-js-scripts/img/block.jpg';
    let velocity = 1
    

    let speedOfBlock = .025
    const keys = {
        down :{
            pressed: false
        },
        up :{
            pressed: false
        },
        right :{
            pressed: false
        },
        left :{
            pressed: false
        },
        
    }
    class Block {
        constructor(x,y,image){
            this.x = x
            this.y = y
            this.image = image
            this.width = 30
            this.velocity = {
                x: 0,
                y: 0
            }
        }
        draw(){
            c.drawImage(this.image, this.x, this.y, this.width, this.width)
        }
        update(){
            this.draw()
            this.x += this.velocity.x  
            this.y += this.velocity.y 
            // this.y += this.velocity
        }
    }
    const block = new Block(10 , 10 , blockImg)
   
    function animate(){
        requestAnimationFrame(animate)
        c.fillStyle = 'rgb(255,255,255)'
        c.fillRect(0,0,canvas.width,canvas.height)
        block.update()    
        if(keys.down.pressed && !keys.up.pressed && (block.y + block.velocity.y + block.width) < canvas.height
        && block.y + block.width > 0){
            block.velocity.y += velocity * speedOfBlock
        } else if (keys.up.pressed && !keys.down.pressed){
            block.velocity.y -= velocity * speedOfBlock
        } else {
            // block.velocity.y = 0
        }
        if (keys.right.pressed && !keys.left.pressed){
            block.velocity.x += speed * speedOfBlock
        } else if (keys.left.pressed && !keys.right.pressed ){
            block.velocity.x -= speed * speedOfBlock
        } else {
            // block.velocity.x = 0
        }

    }
    animate()
    addEventListener('keyup', e => {
        let key = e.keyCode
        switch(key){
            case 40:
                keys.down.pressed = false
                break
            case 39:
                keys.right.pressed = false
                break
            case 38:
                keys.up.pressed = false
                break
            case 37:
                keys.left.pressed = false
                break
        }
    })
    addEventListener('keydown', e => {
        let key = e.keyCode
        switch(key){
            case 40:
                e.preventDefault()
                keys.down.pressed = true
                break
            case 39:
                e.preventDefault()
                keys.right.pressed = true
                break
            case 38:
                e.preventDefault()
                keys.up.pressed = true
                break
            case 37:
                e.preventDefault()
                keys.left.pressed = true
                break
        }
    })
    let speed = 2
    canvas.addEventListener('click', e => {
        const rect = canvas.getBoundingClientRect()
        const xClick = e.clientX - rect.left
        const yClick = e.clientY - rect.top
        console.clear()
        if(xClick > block.x && (block.x < canvas.width && block.x + block.width > 0)){
            block.velocity.x += speed
        } 
        if(xClick < block.x){
            block.velocity.x -= speed
        }
        if(yClick > block.y){
            block.velocity.y += speed
        } 
        if(yClick < block.y){
            block.velocity.y -= speed
        }

    })
}())