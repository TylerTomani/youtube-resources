// step-txt.js
export let lastStep = null;
let steps = [];
let allImgs = [];
let stepImageIndexes = new WeakMap();
let iStep = 0;
let iCopyCodes = 0;
let currentIndex = 0 // bad namae, index for imgs-container imgs
let copyCodesStepFocused = false
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
        lastStep = steps[0];
        iStep = 0;
    }

    // Add step event listeners
    steps.forEach((step, index) => {
        if (!step.dataset.listenerAdded) {
            step.setAttribute("tabindex", "0");

            step.addEventListener("focus", () => {
                copyCodesStepFocused = false
                denlargeAllImages()
                iStep = index
                currentIndex = 0
            })
            step.addEventListener("focusin", () => {
                iStep = index;
            });

            step.addEventListener("keydown", e => {
                if (e.key.toLowerCase() === "enter"){
                    console.log('enter')
                    toggleStepImages(step);
                    step.scrollIntoView({behavior: 'instant', block: 'start'})
                } 
            });

            step.addEventListener("click", e => {
                if (e.target.tagName !== "IMG") {
                    denlargeAllImages();
                    lastStep = step;
                }
            });

            step.dataset.listenerAdded = "true";
        }
    });

    // Add image click/touch listeners
    allImgs.forEach(img => {
        if (!img.dataset.listenerAdded) {
            img.addEventListener("click", e => toggleSingleImage(img));
            img.addEventListener("touchstart", e => toggleSingleImage(img), { passive: true });
            img.dataset.listenerAdded = "true";
        }
    });

    // Initialize copy-code focus behavior
    const copyCodes = mainTargetDiv.querySelectorAll(".copy-code");
    
    copyCodes.forEach(code => {
        if (!code.dataset.listenerAdded) {
            code.addEventListener("focus", () => {
                denlargeAllImages()
                copyCodesStepFocused = true
            });
            code.dataset.listenerAdded = "true";
        }
    });
}

// --- Handle step navigation keys ---
export function handleStepKeys(key, e, mainTargetDiv) {
    // console.log(e.target)
    if (!steps.length) return;

    switch (key) {
        case "enter":
            console.log(e.target)

            e.target.scrollIntoView({behavior: 'instant',block: 'start'})
            break
        case "f": // next step
            if(e.target == mainTargetDiv){
                iStep = 0
            } else {

                iStep = (iStep + 1) % steps.length;
            }
            steps[iStep].focus();
            lastStep = steps[iStep];
            break;
        case "a": // previous step
            iStep = (iStep - 1 + steps.length) % steps.length;
            steps[iStep].focus();
            lastStep = steps[iStep];
            break;
        case "e": // go to last step
            // iStep = steps.length - 1;
            // steps[iStep].focus();
            // lastStep = steps[iStep];
            break;
        case "m": // focus last step or container
            if (lastStep) {
                if (e.target == lastStep) {
                    mainTargetDiv.focus()
                } else {
                    lastStep.focus()
                }
            } else {
                mainTargetDiv.focus();
            }
            if (e.target == mainTargetDiv && !lastStep) {
                sidebarLinks[0].focus()
            }
            break;
        default:
            if (!isNaN(key)) {
                const index = parseInt(key, 10) - 1;
                if(!copyCodesStepFocused){
                    if (index >= 0 && index < steps.length) {
                        iStep = index;
                        steps[iStep].focus();
                        lastStep = steps[iStep];
                    } else {
                    }
                } else {
                    const step = getStepFloat(e.target)
                    const stepCopyCodes = step.querySelectorAll('.copy-code')
                    console.log(iCopyCodes)
                    if(iCopyCodes <= stepCopyCodes.length){
                        steps[key - 1].focus()
                    } else{
                        stepCopyCodes[iCopyCodes].scrollIntoView({behavior:'instant',inline:'start',block:'end'})

                    } 
                }
            }
            break;
    }
}
// --- Image handling ---
function toggleSingleImage(img) {
    denlargeAllImages();
    img.classList.toggle("enlarge");
    img.style.zIndex = img.classList.contains("enlarge") ? 100 : 0;
}


function toggleStepImages(step) {
    const images = Array.from(step.querySelectorAll(".step-img > img"));
    if (!images.length) return;

    if (images.length === 1) {
        toggleSingleImage(images[0]);
    } else {
        // Multi-image cycling
        if(currentIndex ==2){
            step.focus()
            denlargeAllImages()
            
            currentIndex = 0
        }else {
            denlargeAllImages()
            if(images[currentIndex]){
                images[currentIndex].classList.add("enlarge");
                images[currentIndex].style.zIndex = 100;
                // currentIndex = (currentIndex + 1) % images.length;
                currentIndex += 1
            }
            
        }
        
        
    }
}

// --- Utility ---
export function denlargeAllImages() {
    allImgs.forEach(img => {
        img.classList.remove("enlarge");
        img.style.zIndex = 0;
    });
}
// function scrollIntoViewEl(el){
//     el.scrollIntoView({behavior: 'instant', block: 'center'})
// }

function getStepFloat(target){
    if(target.classList.contains('step-float')){
        return target
    } else if (target.parentElement){
        return getStepFloat(target.parentElement)
    } else {
        return null
    }
}