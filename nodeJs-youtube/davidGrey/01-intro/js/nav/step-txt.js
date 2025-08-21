export let lastStep = null
let isMainActive = true // tracks which element 'm' should go to next
let iStep = -1
export function stepTxtsFocus(key, e, sidebar, mainContainer, mainTargetDiv) {
    const allImgs = document.querySelectorAll('.step-img > img ')
    const steps = mainTargetDiv.querySelectorAll('.steps-container > .step-float')
    let currentWidth
    currentWidth = innerWidth
    addEventListener('resize', e => { currentWidth = innerWidth })
    // Update lastStep when a step gains focus
    steps.forEach(step => {
        if (!step.hasAttribute('tabindex')) {
            step.setAttribute('tabindex', '0')
        }
        step.addEventListener('focusin', (e) => {
            if(e.target == steps[0]){
                steps[0].focus()
                scrollTo(0,0)
                return
            }
            if(e.target == steps[steps.length - 1]){
                scrollTo(0, innerHeight)
                console.log('is')
            }
            iStep = [...steps].indexOf(step)
            lastStep = step
            isMainActive = false // next 'm' press should go back to mainTargetDiv
        })
        // REALLY IMPORTANT CODE, prevent duplicate listner being added
        if (!step.dataset.listenerAdded) {
            step.addEventListener('keydown', e => {
                let key = e.key.toLowerCase()
                if (key === 'enter') toggleImg(e)
            })
            step.dataset.listenerAdded = 'true'
        }

        
    })
    if (key == 'e') {
        steps[steps.length - 1].focus()
    }
    if (key == 'a') {
        iStep = (iStep - 1 + steps.length) % steps.length
        steps[iStep].focus()
    }
    if (key == 'f') {
        iStep = (iStep + 1) % steps.length
        steps[iStep].focus()
    }
    // Toggle 'm' between mainTargetDiv and lastStep
    if (key === 'm') {
        if (!isMainActive) {
            mainTargetDiv.focus()
            mainContainer.scrollTo(0, 0)
            // steps[0].focus()
            isMainActive = true
        } else {
            if (lastStep) {
                setTimeout(() => {
                    lastStep.focus()
                    lastStep.scrollIntoView({ behavior: 'instant', block: 'center' })
                }, 0)
            }
            isMainActive = false
        }
    }

    // Optional: number key to jump to step
    if (!isNaN(key)) {
        const index = parseInt(key, 10) - 1
        if (index >= 0 && index < steps.length) {
            steps[index].focus()
            lastStep = steps[index]
        }
    }
    function toggleImg(e) {
        e.preventDefault()
        e.stopPropagation()
        const step = getStep(e.target);
        console.log(e.target)
        if (!step) return;
        const img = step.querySelector('.step-img > img');
        if (img) {
            img.classList.toggle('enlarge');
            // if (currentWidth <= 721) {
            //     sideBar.classList.toggle('deactive', img.classList.contains('enlarge'));
            // }
        }
        // const vid = step.querySelector('.step-vid > video');
        // const images = Array.from(step.querySelectorAll('.imgs-container img'));
        // if (images.length > 0) {
        //     let currentIndex = stepImageIndexes.get(step) || 0;

        //     // Remove enlarge class from all imgs first
        //     images.forEach(img => img.classList.remove('enlarge'));

        //     // Add enlarge to the current one
        //     const currentImg = images[currentIndex];
        //     currentImg.classList.add('enlarge');

        //     // Save next index for next time
        //     currentIndex = (currentIndex + 1) % images.length;
        //     stepImageIndexes.set(step, currentIndex);

        //     // Optionally scroll into view
        //     // currentImg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        //     return; // skip .step-img and video logic if imgs-container handled
        // }
        // if (vid) {
        //     vid.classList.toggle('enlarge-vid');
        //     if (currentWidth <= 721 && currentWidth >= 601) {
        //         sideBar.classList.toggle('deactive', vid.classList.contains('enlarge-vid'));
        //     }
        // }
    }
}
function denlargeAllImages(imgVids) {
    imgVids.forEach(el => {
        if (el.classList.contains('enlarge')) {
            el.classList.remove('enlarge')
        }
        if (el.classList.contains('enlarge-vid')) {
            el.classList.remove('enlarge-vid')
        }
    })
}
export function getStep(parent) {
    // if(parent.classList.contains('step')){
    if (parent.classList.contains('step') || parent.classList.contains('step-float')) {
        return parent
    } else if (parent.parentElement) {
        return getStep(parent.parentElement)
    } else {
        return null
    }
}
