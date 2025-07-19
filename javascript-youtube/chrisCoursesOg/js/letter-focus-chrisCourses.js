(function(){
    const keys = {
        shift: {
            pressed: false
        },
        command: {
            pressed: false
        }
    }
    const homelink = document.querySelector('#homelink')
    const canvasEl = document.querySelector('canvas')
    const backlink = document.querySelector('#backlink')
    const tutorialLink = document.querySelector('#tutorialLink')
    const prevBtn = document.querySelector('#prev')
    const nextBtn = document.querySelector('#next')
    addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        switch (letter) {
            case 'h':
                homelink.focus()
                break
            case 'b':
                backlink.focus()
                break
            case 't':
                tutorialLink.focus()
                break
            case 'n':
                next.focus()
                break
            case 'p':
                if (!keys.shift.pressed) {
                    prevBtn.focus()
                }
                break

        }
    });
}())