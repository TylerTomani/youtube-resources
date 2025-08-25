// step-txt.js
import { endNxtLessonBtn } from "./keyboard-nav.js";
export let lastStep = null;
let steps = [];
let allImgs = [];
let stepImageIndexes = new WeakMap();
let iStep = 0;
let iCopyCodes = 0;
let currentIndex = 0; // bad namae, index for imgs-container imgs
export let copyCodesStepFocused = false;


/**
 * Initialize step navigation and image/code behavior
 * @param {HTMLElement} mainTargetDiv
 */
export function initStepNavigation(mainTargetDiv) {
    if (!mainTargetDiv) return;
    steps = Array.from(mainTargetDiv.querySelectorAll(".steps-container > .step-float"));
    allImgs = Array.from(mainTargetDiv.querySelectorAll(".step-img > img"));

    // Initialize first step
    if (steps.length && !lastStep) {
        // lastStep = steps[0];
        // iStep = 0;
    }

    // Add step event listeners
    steps.forEach((step, index) => {
        if (!step.dataset.listenerAdded) {
            step.setAttribute("tabindex", "0");

            step.addEventListener("focus", () => {
                denlargeAllImages();
                copyCodesStepFocused = false
                iStep = index;
                currentIndex = 0;
            });

            step.addEventListener("focusin", () => { 
                
                iStep = index;
            })
            step.addEventListener("focusout", () => { denlargeAllImages()})
            
            step.addEventListener("keydown", e => {
                let key = e.key.toLowerCase();
                if (key === "enter") {
                    toggleStepImages(step);
                    step.scrollIntoView({ behavior: 'instant', block: 'start' });
                    lastStep = step
                }
                if (key === 'm') {
                    mainTargetDiv.focus()
                }
            });
            // --- unified pointerdown for click/tap ---
            step.addEventListener("pointerdown", e => {
                e.preventDefault();
                e.stopPropagation();

                if (e.target.tagName !== "IMG") {
                    denlargeAllImages();
                    lastStep = step;
                } else {
                    toggleStepImages(step);
                }
            });

            step.dataset.listenerAdded = "true";
        }
    });

    // Add image click/touch listeners (now redundant, so left empty)
    allImgs.forEach(img => {
        if (!img.dataset.listenerAdded) {
            img.dataset.listenerAdded = "true";
        }
    });

    // Initialize copy-code focus behavior
    const copyCodes = mainTargetDiv.querySelectorAll(".copy-code");
    copyCodes.forEach(code => {
        if (!code.dataset.listenerAdded) {
            code.addEventListener("focus", () => {
                denlargeAllImages();
                copyCodesStepFocused =true 
            });
            code.dataset.listenerAdded = "true";
        }
    });
}

// --- Handle step navigation keys ---
export function handleStepKeys(key, e, mainTargetDiv) {
    if (!steps.length) return;

    if (!isNaN(key)) {
        if (!copyCodesStepFocused){

            const index = parseInt(key, 10) - 1;
            if (index >= 0 && index < steps.length) {
                iStep = index;
                steps[iStep].focus();
                lastStep = steps[iStep];
            } else {
                endNxtLessonBtn.focus();
            }
        } else {
            const stepFloat = getStepFloat(e.target)
            const copyCodes = stepFloat.querySelectorAll('.copy-code')
            let intKey = parseInt(key)
            copyCodes[intKey - 1].focus()
        }
    }
    switch (key) {
        case "enter":
            if (e.target == mainTargetDiv) {
                steps[0].focus()
            }
            break;
        case "f" || ';': // next step
            // if (copyCodesStepFocused) return;
            if (e.target == mainTargetDiv) {
                iStep = 0;
                goToStep(steps[iStep]);
            } else {
                iStep = (iStep + 1) % steps.length;
            }
            steps[iStep].focus();
            goToStep(steps[iStep]);
            lastStep = steps[iStep];
            break;
        case "a": // previous step
            iStep = (iStep - 1 + steps.length) % steps.length;
            steps[iStep].focus();
            lastStep = steps[iStep];
            break;
        case "e": // go to last step
            break;
        case "m": // focus last step or container
            // if (e.target == lastStep) {
            //     mainTargetDiv.focus();
            // } else {
            //     lastStep.focus();
            // }
            // if (e.target == mainTargetDiv && !lastStep) {
            //     steps[0].focus();
            // }
            break;
        default:
            // console.log('def')
            
            break;
    }
}

// --- Image handling ---
function toggleSingleImage(img) {
    img.classList.toggle("enlarge");
    // img.style.zIndex = img.classList.contains("enlarge") ? 100 : 0;
}

function toggleStepImages(step) {
    const images = Array.from(step.querySelectorAll(".step-img > img"));
    if (!images.length) return;
    if (images.length === 1) {
        toggleSingleImage(images[0]);
    } else {
        // Multi-image cycling
        if (currentIndex == 2) {
            step.focus();
            denlargeAllImages();
            currentIndex = 0;
        } else {
            denlargeAllImages();
            if (images[currentIndex]) {
                images[currentIndex].classList.add("enlarge");
                // images[currentIndex].style.zIndex = 100;
                currentIndex += 1;
            }
        }
    }
    
}

// --- Utility ---
export function denlargeAllImages() {
    allImgs.forEach(img => {
        img.classList.remove("enlarge");
        // img.style.zIndex = 0;
    });
}

function getStepFloat(target) {
    if (target.classList.contains('step-float')) {
        return target;
    } else if (target.parentElement) {
        return getStepFloat(target.parentElement);
    } else {
        return null;
    }
}
function goToStep(step) {
    step.scrollIntoView({ behavior: 'instant', inline: 'start', block: 'start' });
}
