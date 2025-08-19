// stepTxts.js
import { mainTargetDiv, sideBar, sideBarLinks, lastFocusedSideBarLink, lastClickedSideLink } from "../main-script.js";
import { sideBarBtn } from "./toggle-sidebar.js";
export let lastStep = null;
let listenersInitialized = false;

export function stepTxtsFocus() {
    if (listenersInitialized) return; // prevent duplicates
    listenersInitialized = true;
    const steps = document.querySelectorAll('.steps-container > .step, .steps-container > .step-float, .step-col3');
    const imgVids = document.querySelectorAll('.step-img > img, .step-vid > video');
    const allVideos = document.querySelectorAll('video');
    const endNxtLesson = document.querySelector('#endNxtLesson');
    const stepImageIndexes = new WeakMap();

    let currentWidth = innerWidth;

    window.addEventListener('resize', () => { currentWidth = innerWidth });

    // -------------------- Helper Functions --------------------
    function getStep(parent) {
        if (!parent) return null;
        if (parent.classList.contains('step') || parent.classList.contains('step-float')) return parent;
        return parent.parentElement ? getStep(parent.parentElement) : null;
    }

    function denlargeAllImages() {
        imgVids.forEach(el => el.classList.remove('enlarge', 'enlarge-vid'));
    }

    function denlargeAllVideos() {
        allVideos.forEach(el => {
            el.pause();
            el.style.border = 'none';
            el.classList.remove('enlarge-vid');
        });
    }

    function pauseAllVideos() {
        allVideos.forEach(v => v.pause());
    }

    function toggleImg(e) {
        const step = getStep(e.target);
        if (!step) return;

        const images = Array.from(step.querySelectorAll('.imgs-container img'));
        if (images.length) {
            let currentIndex = stepImageIndexes.get(step) || 0;
            images.forEach(img => img.classList.remove('enlarge'));
            images[currentIndex].classList.add('enlarge');
            currentIndex = (currentIndex + 1) % images.length;
            stepImageIndexes.set(step, currentIndex);
            return;
        }

        const img = step.querySelector('.step-img > img');
        const vid = step.querySelector('.step-vid > video');

        if (img) {
            img.classList.toggle('enlarge');
            if (currentWidth <= 721) sideBar.classList.toggle('deactive', img.classList.contains('enlarge'));
        }
        if (vid) {
            vid.classList.toggle('enlarge-vid');
            if (currentWidth <= 721 && currentWidth >= 601) sideBar.classList.toggle('deactive', vid.classList.contains('enlarge-vid'));
        }
    }

    function isMainTargetFocused() {
        return mainTargetDiv.contains(document.activeElement);
    }
    function scrollStepIntoCenter(step) {
        const container = mainTargetDiv; // or the actual scrollable container
        const stepRect = step.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const offset = stepRect.top - containerRect.top;
        const scrollY = container.scrollTop + offset - (container.clientHeight / 2) + (step.clientHeight / 2);

        container.scrollTo({ top: scrollY, behavior: 'smooth' });
    }
    mainTargetDiv.addEventListener('focusout', () => {
        denlargeAllImages();
        denlargeAllVideos();
    });

    // -------------------- Step Focus Handlers --------------------
    steps.forEach(step => {
        step.addEventListener('focus', e => {
            lastStep = e.target;
            pauseAllVideos();
            denlargeAllImages();
            console.log(e.target)            
            scrollStepIntoCenter(e.target)
        });

        step.addEventListener('keydown', e => {
            if (!isMainTargetFocused()) return;
            
            if (e.key.toLowerCase() === 'enter') {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                toggleImg(e);
            }
        });
    });

    // -------------------- Global Key Handlers --------------------
    window.addEventListener('keydown', e => {
        const key = e.key.toLowerCase();
        const active = document.activeElement;

        if (e.metaKey || e.ctrlKey || e.altKey) return;

        // ----- S key -----
        if (key === 's') {
            e.preventDefault();

            const inSidebarPingPong = active === sideBarBtn || active === lastClickedSideLink;

            if (inSidebarPingPong) {
                // Ping-pong
                if (active === sideBarBtn) lastClickedSideLink?.focus();
                else sideBarBtn?.focus();
            } else {
                // Outside sidebar
                if (lastClickedSideLink) lastClickedSideLink?.focus();
                
            }

            return; // stop further handling
        }

        // ----- Number keys and 'm' -----
        const intLet = parseInt(key);
        if (!isNaN(intLet) &&mainTargetDiv.contains(active)) {
            if (intLet <= steps.length) steps[intLet - 1].focus();
            else endNxtLesson?.focus();
        }

        if (key === 'm' && lastStep) lastStep.focus();
    });

}
