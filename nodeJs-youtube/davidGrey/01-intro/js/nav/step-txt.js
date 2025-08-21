export let lastStep = null;
let iStep = -1;
let steps = [];
let allImgs = [];

// --- Initialize steps and images once ---
export function initStepNavigation(mainTargetDiv) {
    steps = Array.from(mainTargetDiv.querySelectorAll('.steps-container > .step-float'));
    allImgs = Array.from(mainTargetDiv.querySelectorAll('.step-img > img'));

    if (!steps.length) return;
    allImgs.forEach(img => {
        img.addEventListener('click', e => {
            e.preventDefault()
            // e.stopPropagation()
            // denlargeAllImages(allImgs)
            img.classList.toggle('enlarge')
        })
    })
    steps.forEach((step, index) => {
        if (!step.hasAttribute('tabindex')) step.setAttribute('tabindex', '0');

        if (!step.dataset.listenerAdded) {
            // Update lastStep and iStep on focus
            step.addEventListener('focusin', () => {
                lastStep = step;
                iStep = index;
            });

            // Handle enter key to toggle images
            step.addEventListener('keydown', ev => {
                if (ev.key.toLowerCase() === 'enter') toggleImg(ev);
            });
            step.addEventListener('click', e => {
                e.preventDefault()
                const step = getStep(e.target)
                if(step && e.target.tagName != 'IMG' ){
                    denlargeAllImages()
                }
            });

            // step.dataset.listenerAdded = 'true';
        }
    });
}

// --- Handle keypresses for step navigation ---
export function handleStepKeys(key, e, mainTargetDiv) {
    if (!steps.length) return;

    // initialize iStep if not set
    if (iStep === -1) iStep = lastStep ? steps.indexOf(lastStep) : 0;

    switch (key) {
        case 'f':
            denlargeAllImages();
            iStep = (iStep + 1) % steps.length;
            steps[iStep].focus();
            break;

        case 'a':
            denlargeAllImages();
            iStep = (iStep - 1 + steps.length) % steps.length;
            steps[iStep].focus();
            break;

        case 'e':
            steps[steps.length - 1].focus();
            iStep = steps.length - 1;
            lastStep = steps[iStep];
            break;

        case 'm':
            if (e.target === mainTargetDiv) {
                // jump into steps
                const target = lastStep || steps[0];
                target.focus();
                target.scrollIntoView({ behavior: 'instant', block: 'start' });
            } else if (lastStep && steps.includes(e.target)) {
                mainTargetDiv.focus();
                window.scrollTo({ top: mainTargetDiv.offsetTop, behavior: 'instant' });
                
            }
            break;


        default:
            if (!isNaN(key)) {
                const index = parseInt(key, 10) - 1;
                if (index >= 0 && index < steps.length) {
                    steps[index].focus();
                    iStep = index;
                    lastStep = steps[iStep];
                }
            }
            break;
    }
}

function denlargeAllImages() {
    allImgs.forEach(img => {
        img.classList.remove('enlarge');
        // optionally remove enlarge-vid if you have videos
        if (img.classList.contains('enlarge-vid')) img.classList.remove('enlarge-vid');
    });
}

function toggleImg(e) {
    e.preventDefault();
    e.stopPropagation();
    const step = getStep(e.target);
    if (!step) return;

    const img = step.querySelector('.step-img > img');
    if (img) img.classList.toggle('enlarge');

    const images = Array.from(step.querySelectorAll('.imgs-container img'));
    if (images.length > 0) {
        let currentIndex = stepImageIndexes.get(step) || 0;

        images.forEach(img => img.classList.remove('enlarge'));
        images[currentIndex].classList.add('enlarge');

        currentIndex = (currentIndex + 1) % images.length;
        stepImageIndexes.set(step, currentIndex);
    }
}

export function getStep(parent) {
    if (!parent) return null;
    if (parent.classList.contains('step') || parent.classList.contains('step-float')) return parent;
    return getStep(parent.parentElement);
}

// map to track image index per step
const stepImageIndexes = new WeakMap();
