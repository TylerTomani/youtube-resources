// step-txt.js
export let lastStep = null;

let steps = [];
let allImgs = [];
let lastStepPage = false;

// Initialize step navigation for a page
export function initStepNavigation(mainTargetDiv, sidebarLinks, iSideBarLinks) {
    steps = Array.from(mainTargetDiv.querySelectorAll('.steps-container > .step-float'));
    allImgs = Array.from(mainTargetDiv.querySelectorAll('.step-img > img'));

    const copyCodes = Array.from(mainTargetDiv.querySelectorAll('.copy-code'));
    const endBtn = document.querySelector('#endNxtLessonBtn');
    const prevBtn = document.querySelector('#prevLessonBtn');

    // Set initial focus
    if (steps.length && !lastStep) {
        lastStep = steps[0];
    }

    // --- Step listeners ---
    steps.forEach((step, index) => {
        if (!step.hasAttribute('tabindex')) step.setAttribute('tabindex', '0');

        step.addEventListener('focus', () => {
            lastStep = step;
            lastStepPage = index === steps.length - 1;
        });

        step.addEventListener('keydown', e => {
            if (e.key.toLowerCase() === 'enter') toggleStepImages(step);
        });

        step.addEventListener('click', () => denlargeAllImages());
        step.addEventListener('touchstart', () => denlargeAllImages(), { passive: true });
    });

    // --- Image click/touch to enlarge ---
    allImgs.forEach(img => {
        if (!img.dataset.listenerAdded) {
            img.addEventListener('click', () => toggleSingleImage(img));
            img.addEventListener('touchstart', () => toggleSingleImage(img), { passive: true });
            img.dataset.listenerAdded = 'true';
        }
    });

    // --- Copy-code focus ---
    copyCodes.forEach(code => {
        code.addEventListener('focus', () => denlargeAllImages());
    });

    // --- Next/Prev buttons ---
    endBtn.addEventListener('click', () => goNextLesson(sidebarLinks, iSideBarLinks, mainTargetDiv));
    prevBtn.addEventListener('click', () => goPrevLesson(sidebarLinks, iSideBarLinks, mainTargetDiv));
}

// Keyboard-driven step navigation
export function handleStepKeys(key, e, mainTargetDiv) {
    if (!steps.length) return;

    let iStep = lastStep ? steps.indexOf(lastStep) : 0;

    switch (key) {
        case 'f':
            iStep = (iStep + 1) % steps.length;
            steps[iStep].focus();
            break;
        case 'a':
            iStep = (iStep - 1 + steps.length) % steps.length;
            steps[iStep].focus();
            break;
        case 'e':
            if (lastStepPage) document.querySelector('#endNxtLessonBtn')?.focus();
            else steps[steps.length - 1].focus();
            break;
        case 'm':
            lastStep?.focus() || mainTargetDiv.focus();
            break;
        default:
            if (!isNaN(key)) {
                const index = parseInt(key) - 1;
                if (index >= 0 && index < steps.length) steps[index].focus();
            }
            break;
    }
}

// --- Utilities ---
export function denlargeAllImages() {
    allImgs.forEach(img => img.classList.remove('enlarge'));
}

function toggleStepImages(step) {
    const images = Array.from(step.querySelectorAll('.step-img > img'));
    if (!images.length) return;

    if (images.length === 1) toggleSingleImage(images[0]);
    else cycleStepImages(step, images);
}

const stepImageIndexes = new WeakMap();
function cycleStepImages(step, images) {
    let idx = stepImageIndexes.get(step) || 0;
    images.forEach(img => img.classList.remove('enlarge'));
    images[idx].classList.add('enlarge');
    idx = (idx + 1) % images.length;
    stepImageIndexes.set(step, idx);
}

function toggleSingleImage(img) {
    const isEnlarged = img.classList.contains('enlarge');
    denlargeAllImages();
    img.classList.toggle('enlarge', !isEnlarged);
}

function goNextLesson(sidebarLinks, iSideBarLinks, mainTargetDiv) {
    iSideBarLinks = (iSideBarLinks + 1) % sidebarLinks.length;
    injectContent(sidebarLinks[iSideBarLinks].href, mainTargetDiv, sidebarLinks, iSideBarLinks);
}

function goPrevLesson(sidebarLinks, iSideBarLinks, mainTargetDiv) {
    iSideBarLinks = (iSideBarLinks - 1 + sidebarLinks.length) % sidebarLinks.length;
    injectContent(sidebarLinks[iSideBarLinks].href, mainTargetDiv, sidebarLinks, iSideBarLinks);
}
