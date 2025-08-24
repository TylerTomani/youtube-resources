// step-txt.js
export let lastStep = null;

let steps = [];
let allImgs = [];
let stepImageIndexes = new WeakMap();
let iStep = 0;

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

            step.addEventListener("focusin", () => {
                lastStep = step;
                iStep = index;
            });

            step.addEventListener("keydown", e => {
                if (e.key.toLowerCase() === "enter") toggleStepImages(step);
            });

            step.addEventListener("click", e => {
                if (e.target.tagName !== "IMG") denlargeAllImages();
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
            code.addEventListener("focus", () => denlargeAllImages());
            code.dataset.listenerAdded = "true";
        }
    });
}

// --- Handle step navigation keys ---
export function handleStepKeys(key, e, mainTargetDiv) {
    if (!steps.length) return;

    switch (key) {
        case "f": // next step
            iStep = (iStep + 1) % steps.length;
            steps[iStep].focus();
            lastStep = steps[iStep];
            break;
        case "a": // previous step
            iStep = (iStep - 1 + steps.length) % steps.length;
            steps[iStep].focus();
            lastStep = steps[iStep];
            break;
        case "e": // go to last step
            iStep = steps.length - 1;
            steps[iStep].focus();
            lastStep = steps[iStep];
            break;
        case "m": // focus last step or container
            // if (lastStep) lastStep.focus();
            // else mainTargetDiv.focus();
            break;
        default:
            if (!isNaN(key)) {
                const index = parseInt(key, 10) - 1;
                if (index >= 0 && index < steps.length) {
                    iStep = index;
                    steps[iStep].focus();
                    lastStep = steps[iStep];
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
        let currentIndex = stepImageIndexes.get(step) || 0;
        images.forEach(img => {
            img.classList.remove("enlarge");
            img.style.zIndex = 1;
        });
        images[currentIndex].classList.add("enlarge");
        images[currentIndex].style.zIndex = 100;
        currentIndex = (currentIndex + 1) % images.length;
        stepImageIndexes.set(step, currentIndex);
    }
}

// --- Utility ---
export function denlargeAllImages() {
    allImgs.forEach(img => {
        img.classList.remove("enlarge");
        img.style.zIndex = 0;
    });
}
