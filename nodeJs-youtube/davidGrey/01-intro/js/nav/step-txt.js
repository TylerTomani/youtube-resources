
export let lastStep = null;
let iStep = -1;
let steps = [];
let allImgs = [];
let lastStepPage = false
// --- Initialize steps and images once ---
export function initStepNavigation(mainTargetDiv,sidebarLinks,iSideBarLinks) {
    const copyCodes = document.querySelectorAll('.copy-code')    
    const endNxtLessonBtn = document.querySelector('#endNxtLessonBtn')
    const prevLessonBtn = document.querySelector('#prevLessonBtn')
    
    mainTargetDiv.addEventListener('keydown',e =>{
        let key = e.key.toLowerCase()
        if(key == 'enter'){
                steps[0].focus()
        }
        
        // if(e.target == mainTargetDiv){
        // }
    })
    steps = Array.from(mainTargetDiv.querySelectorAll('.steps-container > .step-float'));
    allImgs = Array.from(mainTargetDiv.querySelectorAll('.step-img > img'));
   
    endNxtLessonBtn.addEventListener('click', e => {
        console.log('click')
        e.preventDefault()
        nxtLesson()
        
        
        
    })
    endNxtLessonBtn.addEventListener('touchstart', e => {
        e.preventDefault(); // optional, only if needed
        nxtLesson()
    });
    prevLessonBtn.addEventListener('click', e => {
        prevLesson()


        
    })
    prevLessonBtn.addEventListener('keydown', e => {
        let key = e.key.toLowerCase();
    
        if(key === 'p'){
            endNxtLessonBtn.focus()
        }
    });
    
    
    if (!steps.length) return;
    allImgs.forEach(img => {
        img.addEventListener('click', e => {
            e.preventDefault()
            // e.stopPropagation()
            denlargeAllImages(allImgs)
            img.classList.toggle('enlarge')
        })
    })
    copyCodes.forEach(el => {
        el.addEventListener('focus', denlargeAllImages)
    })
    steps.forEach((step, index) => {
        const clearEnlarge = () => denlargeAllImages();

        if (!step.hasAttribute('tabindex')) step.setAttribute('tabindex', '0');

        if (!step.dataset.listenerAdded) {
            step.addEventListener('focus', () => {
                removeAllTabIndexes(copyCodes)
            })
            // Update lastStep and iStep on focus
            step.addEventListener('focusin', () => {
                lastStep = step;
                iStep = index;
                if(iStep == (steps.length - 1)){
                    lastStepPage = true
                } else {
                    lastStepPage = false
                }
                
            });

            // Handle enter key to toggle images
            step.addEventListener('keydown', e => {
                if (e.key.toLowerCase() === 'enter') {
                    addTabIndexes(e)
                    toggleImg(e)
                }
            });
            step.addEventListener('click', e => {
                e.preventDefault()
                const step = getStep(e.target)
                if(step && e.target.tagName != 'IMG' ){
                    console.log('eys')
                    denlargeAllImages()
                }
            });
            step.addEventListener('touchstart', clearEnlarge, { passive: true });

            // step.dataset.listenerAdded = 'true';
        }
    });
    
    function nxtLesson() {
        if (iSideBarLinks >= sidebarLinks.length) {
            iSideBarLinks = 0
        } else {
            iSideBarLinks += 1
        }
        sidebarLinks[iSideBarLinks].click()
        console.log()
        steps[0].focus()
        endNxtLessonBtn.focus()
        scrollToTop()
    }
    function prevLesson() {
        if (iSideBarLinks == 0) {
            iSideBarLinks = sidebarLinks.length
            iSideBarLinks -= 1;
        } else {
            iSideBarLinks -= 1;
        }
        sidebarLinks[iSideBarLinks].click();

        // Scroll to top of page
        steps[0].focus()
        prevLessonBtn.focus()
        scrollToTop()
        
    }
}

// --- Handle keypresses for step navigation ---
export function handleStepKeys(key, e, mainTargetDiv) {
    if (!steps.length) return;

    // initialize iStep if not set
    if (iStep === -1) iStep = lastStep ? steps.indexOf(lastStep) : 0;

    
    switch (key) {
        case 'p':
            prevLessonBtn.focus();
            break;
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
            if(lastStepPage){
                endNxtLessonBtn.focus()
            } else{

                steps[steps.length - 1].focus();
                iStep = steps.length - 1;
                lastStep = steps[iStep];
            }
            break;

        case 'm':
            if (e.target === mainTargetDiv) {
                // jump into steps
                // const target = lastStep || steps[0];
                const target = lastStep ;
                target.focus();
                target.scrollIntoView({ behavior: 'instant', block: 'start' });
            } else if (lastStep && steps.includes(e.target)) {
                mainTargetDiv.focus();
                window.scrollTo({ top: mainTargetDiv.offsetTop, behavior: 'instant',block:'start' });
                
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
function removeAllTabIndexes(copyCodes) {
    copyCodes.forEach(el => {
        el.setAttribute('tabindex','-1')
    })
}
function addTabIndexes(e) {
    const tabEls = e.target.querySelectorAll('.copy-code, textarea')
    tabEls.forEach(el => {
        el.setAttribute('tabindex', '0')
    })
}

export function getStep(parent) {
    if (!parent) return null;
    if (parent.classList.contains('step') || parent.classList.contains('step-float')) return parent;
    return getStep(parent.parentElement);
}

// map to track image index per step
const stepImageIndexes = new WeakMap();
function scrollToTop() {
    const mainTargetDiv = document.querySelector('#targetDiv');
    if (mainTargetDiv) {
        mainTargetDiv.scrollTo({ top: 0, behavior: 'instant' });
    }
    // fallback in case something is outside mainTargetDiv
    window.scrollTo({ top: 0, behavior: 'instant' });
}
