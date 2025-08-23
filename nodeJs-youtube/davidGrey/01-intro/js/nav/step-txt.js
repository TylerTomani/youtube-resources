// step-txt.js
import { injectContent } from "../core/inject-content.js";
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
    
    if(!mainTargetDiv.dataset.listenerAdded){
        mainTargetDiv.addEventListener('keydown',e =>{
            let key = e.key.toLowerCase()
            if(key == 'enter'){
                    steps[0].focus()
            }
            if(key === 'f'){
                iSideBarLinks = 0
                console.log('f step-txt' )
            }
            // if(e.target == mainTargetDiv){
            // }
        })
        mainTargetDiv.dataset.listenerAdded = 'true'
    }
    steps = Array.from(mainTargetDiv.querySelectorAll('.steps-container > .step-float'));
    allImgs = Array.from(mainTargetDiv.querySelectorAll('.step-img > img'));

    // SET FIRST STEP AS lastStep WHEN MAIN DIV GETS FOCUS
    if (steps.length && !lastStep) {
        lastStep = steps[0];
        iStep = 0;
    }
    if(!endNxtLessonBtn.dataset.listenerAdded){
        endNxtLessonBtn.addEventListener('click', e => {
            e.preventDefault()
            denlargeAllImages()
            removeSidebarLinksBackground()
            nxtLesson()
        })
        endNxtLessonBtn.addEventListener('touchstart', e => {
            e.preventDefault(); // optional, only if needed
            denlargeAllImages()
            removeSidebarLinksBackground()
            nxtLesson()
        },{passive:true});
    }
    endNxtLessonBtn.addEventListener('focus', denlargeAllImages)
    prevLessonBtn.addEventListener('focus', denlargeAllImages)
    prevLessonBtn.addEventListener('click', e => {
        removeSidebarLinksBackground()
        prevLesson()
    },{passive:true})
    prevLessonBtn.addEventListener('keydown', e => {
        let key = e.key.toLowerCase();    
        if(key === 'p'){endNxtLessonBtn.focus()}
    });
    function nxtLesson() {
        iSideBarLinks = (iSideBarLinks + 1) % sidebarLinks.length;
        removeSidebarLinksBackground();
        const link = sidebarLinks[iSideBarLinks];
        link.style.background = 'darkgrey';

        injectContent(link.href, mainTargetDiv, sidebarLinks, iSideBarLinks, navLessonTitle, () => {
            // Refresh references after inject
            const newSteps = Array.from(mainTargetDiv.querySelectorAll('.steps-container > .step-float'));
            const newEndBtn = document.querySelector('#endNxtLessonBtn');

            if (newSteps.length) {
                newSteps[0].focus();
                lastStep = newSteps[0];
                iStep = 0;
            }

            if (newEndBtn) newEndBtn.focus();
            scrollToTop();
        });
    }

    function prevLesson() {
        iSideBarLinks = (iSideBarLinks - 1 + sidebarLinks.length) % sidebarLinks.length;
        removeSidebarLinksBackground();
        const link = sidebarLinks[iSideBarLinks];
        link.style.background = 'darkgrey';

        injectContent(link.href, mainTargetDiv, sidebarLinks, iSideBarLinks, navLessonTitle, () => {
            const newSteps = Array.from(mainTargetDiv.querySelectorAll('.steps-container > .step-float'));
            const newPrevBtn = document.querySelector('#prevLessonBtn');

            if (newSteps.length) {
                newSteps[0].focus();
                lastStep = newSteps[0];
                iStep = 0;
            }

            if (newPrevBtn) newPrevBtn.focus();
            scrollToTop();
        });
    }


    // Utility to clear all sidebar backgrounds
    function removeSidebarLinksBackground() {
        if(sidebarLinks){

            sidebarLinks.forEach(el => el.style.background = 'none');
        }
    }

    
    if (!steps.length) return;
    allImgs.forEach(img => {
        if(!img.dataset.listenerAdded){

            img.addEventListener('click', e => {
                e.preventDefault()
                // e.stopPropagation()
                denlargeAllImages(allImgs)
                img.classList.toggle('enlarge')
            })
            img.addEventListener('touchstart', e => {
                e.preventDefault()
                // e.stopPropagation()
                denlargeAllImages(allImgs)
                img.classList.toggle('enlarge')
            },{passive:true})
            img.dataset.listenerAdded = 'true'
        }
    })
    copyCodes.forEach(el => {
        el.addEventListener('focus', e => {
            denlargeAllImages()
            el.style.zIndex = '100'
            el.style.background = 'white'
        })
        el.addEventListener('out', e => {
            denlargeAllImages()
            el.style.zIndex = '100'
            el.style.background = 'transparent'
        })
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
                    denlargeAllImages()
                }
            });
            step.addEventListener('touchstart', clearEnlarge, { passive: true });

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
            if (lastStep && steps.includes(lastStep)) {
                // Jump into main and land on the last step
                lastStep.focus();
                lastStep.scrollIntoView({ behavior: 'instant', block: 'start' });
            } else {
                // Fallback: focus the container if no steps
                // if (!mainTargetDiv.hasAttribute("tabindex")) mainTargetDiv.setAttribute("tabindex", "0");
                mainTargetDiv.focus();
                mainTargetDiv.scrollTo({ top: 0, behavior: 'instant' });
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
        if (img.classList.contains('enlarge-vid')) {
            img.classList.remove('enlarge-vid')
            img.style.zIndex = 0
        };

    });
}

function toggleImg(e) {
    e.preventDefault();
    e.stopPropagation();
    const step = getStep(e.target);
    if (!step) return;

    const stepCopyCodes = step.querySelectorAll('.copy-code');
    const images = Array.from(step.querySelectorAll('.step-img > img'));
    if (!images.length) return;

    // Single-image step
    if (images.length === 1) {
        const img = images[0];
        const isEnlarged = img.classList.contains('enlarge');
        img.classList.toggle('enlarge', !isEnlarged);
        img.style.zIndex = !isEnlarged ? 100 : 0;
    } else {
        // Multiple images: cycle through
        let currentIndex = stepImageIndexes.get(step) || 0;

        images.forEach((img, i) => {
            img.classList.remove('enlarge');
            img.style.zIndex = 1; // default behind
        });

        images[currentIndex].classList.add('enlarge');
        images[currentIndex].style.zIndex = 100;

        currentIndex = (currentIndex + 1) % images.length;
        stepImageIndexes.set(step, currentIndex);
    }

    // Ensure copy-code is always behind enlarged image
    stepCopyCodes.forEach(code => {
        code.style.zIndex = 0; // below images
    });
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
