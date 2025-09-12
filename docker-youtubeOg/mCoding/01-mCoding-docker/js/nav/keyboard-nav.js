// keyboard-nav.js
import { injectContent } from "../core/inject-content.js";
import { handleStepKeys, lastStep } from "./step-txt.js";
import { denlargeAllImages } from "./step-txt.js";
import { denlargeAllVideos, pauseDenlargeAllVideos } from "./playStepVid.js";

export let lastFocusedLink = null;
export let lastClickedLink = null;
export const endNxtLessonBtn = document.querySelector('#endNxtLessonBtn');
const prevLessonBtn = document.querySelector('#prevLessonBtn');
export const tutorialLink = document.querySelector('#tutorialLink');

export function initKeyboardNav({
    pageHeader, pageHeaderLinks, navLessonTitle, darkModeBtn,
    sidebar, sidebarBtn, sidebarLinks, mainTargetDiv, mainContainer
}) {
    let focusZone = "header"; // "header" | "sidebar" | "main"
    let iSideBarLinks = 0;
    let suppressIndexUpdate = false; // prevent focus handler from resetting index after keyboard nav

    // --- Focus zone tracking ---
    pageHeader.addEventListener("focusin", () => { focusZone = "header"; });
    sidebar.addEventListener("focusin", () => { focusZone = "sidebar"; });
    sidebarBtn.addEventListener("focusin", () => { focusZone = "sidebar"; });
    mainTargetDiv.addEventListener("focusin", () => { focusZone = "main"; });

    // --- Sidebar button behavior ---
    sidebarBtn.addEventListener("keydown", e => {
        const key = e.key.toLowerCase();
        if (key === 's') {
            if (lastClickedLink) lastClickedLink.focus();
            else if (lastFocusedLink) lastFocusedLink.focus();
            else sidebarLinks[0].focus();
        }
        if (key === 'm') {
            focusZone = 'main'
            mainTargetDiv.focus()
        }
    });

    // --- Sidebar links ---
    sidebarLinks.forEach(el => {
        if (el.hasAttribute("autofocus")) {
            lastClickedLink = el;
            iSideBarLinks = [...sidebarLinks].indexOf(el);
            focusZone = "sidebar";
            injectContent(el.href, mainTargetDiv, sidebarLinks, iSideBarLinks, navLessonTitle);
        }

        el.addEventListener("focus", () => {
            focusZone = 'sidebar';
            lastFocusedLink = el;
            if (!suppressIndexUpdate) {
                iSideBarLinks = [...sidebarLinks].indexOf(el);
            }
        });

        el.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            const targetLink = e.target.closest("a");
            if (targetLink) {
                iSideBarLinks = [...sidebarLinks].indexOf(el);
                changeTutorialLink(targetLink);
                injectContent(targetLink.href, mainTargetDiv, sidebarLinks, iSideBarLinks, navLessonTitle);
            }
            lastClickedLink = e.target;
        });

        el.addEventListener("keydown", e => {
            const key = e.key.toLowerCase();
            if (key === 'enter') {
                focusZone = 'sidebar';
                const targetLink = e.target.closest("a");
                if (targetLink) injectContent(targetLink.href, mainTargetDiv);
                if (e.target === lastClickedLink) {
                    mainTargetDiv.focus();
                }
                lastClickedLink = e.target;
            } else if (key === 's') {
                sidebarBtn.focus();
            } else
            if (key === 'm') {
                mainTargetDiv.focus();
                focusZone = 'main';
                mKeyFocusOrder(e);
            }
        });
    });

    // --- End/Prev lesson buttons ---
    endNxtLessonBtn.addEventListener('click', e => {
        e.preventDefault();
        iSideBarLinks = (iSideBarLinks + 1) % sidebarLinks.length;
        window.scrollTo({ top: 0, behavior: 'instant' });
        sidebarLinks[iSideBarLinks].click();
        lastClickedLink = sidebarLinks[iSideBarLinks];
        if(mainContainer.classList.contains('collapsed')){
            mainContainer.classList.remove('collapsed')
        }
    });

    endNxtLessonBtn.addEventListener('keydown', e => {
        let key = e.key.toLowerCase();
        if(key === 'enter'){
            if (mainContainer.classList.contains('collapsed')){

                mainContainer.classList.remove('collapsed')
            }
            sidebar.scrollIntoView({inline: 'start'})
        }
        if (key === 'm') {
            const steps = document.querySelectorAll('.step-float');
            if (!steps) {
                mainTargetDiv.focus();
                return;
            }
            mKeyFocusOrder();
        }
    });

    prevLessonBtn.addEventListener('click', e => {
        iSideBarLinks = (iSideBarLinks - 1 + sidebarLinks.length) % sidebarLinks.length;
        deHighlightSideBarLink();
        sidebarLinks[iSideBarLinks].click();
    });

    function deHighlightSideBarLink() {
        sidebarLinks.forEach(el => el.classList.remove('hlight'));
    }

    // --- Helper functions ---
    function sKeyFocusOrder() {
        if (sidebar.classList.contains('expand')){
            sidebar.classList.remove('expand')
        }
        if (lastClickedLink) lastClickedLink.focus();
        else if (lastFocusedLink) lastFocusedLink.focus();
        else sidebarLinks[0].focus();
    }

    function mKeyFocusOrder(e) {
        const steps = document.querySelectorAll('.step-float');
        if (lastStep) {
            lastStep.focus();
        } else if (steps[0]) {
            steps[0].focus();
        } else {
            mainTargetDiv.focus();
        }
    }

    function headerElementsFocus(key, e) {
        // Only active while focusZone === "header"
        pageHeaderLinks.forEach(el => { if (key === el.id[0]) el.focus(); });
        switch (key) {
            case "s": sKeyFocusOrder(); break;
            case "c": {
                const codeComShortcutsLink = document.querySelector("#codeComShortcutsLink");
                const chatGptProjLink = document.querySelector("#chatGptProjLink");
                if (e.target === codeComShortcutsLink) chatGptProjLink.focus();
                else codeComShortcutsLink.focus();
                break;
            }
            case "d": darkModeBtn.focus(); break;
            case "n": navLessonTitle.focus(); break;
            case "t": document.querySelector("#tutorialLink").focus(); break;
        }
    }

    function numberShortcut(key) {
        const index = parseInt(key) - 1;
        if (index >= 0 && index < sidebarLinks.length) {
            iSideBarLinks = index;
            sidebarLinks[iSideBarLinks].focus();
        } else {
            const steps = mainTargetDiv.querySelectorAll(".step-float, .step");
            if (index >= 0 && index < steps.length) steps[index].focus();
        }
    }

    // --- Global key handling ---
    addEventListener("keydown", e => {
        const key = e.key.toLowerCase();
        if (e.shiftKey || e.metaKey) return;
        switch (focusZone) {
            case "header":
                headerElementsFocus(key, e);
                if (key === 'f') {
                    focusZone = "sidebar";
                    suppressIndexUpdate = true;
                    iSideBarLinks = 0;
                    sidebarLinks[iSideBarLinks].focus();
                    suppressIndexUpdate = false;
                    break;
                }
                if (key === 's') {
                    if (mainContainer.classList.contains('collapsed')) {
                        mainContainer.classList.remove('collapsed');
                    }
                    sKeyFocusOrder();
                }
                if (key === 'm') {
                    focusZone = 'main';
                    mKeyFocusOrder(e);
                }
                if (!isNaN(key)) numberShortcut(key);
                break;

            case "sidebar":
                // IMPORTANT: no headerElementsFocus here (prevents 'a' from being hijacked)
                headerElementsFocus(key,e)
                if (key === 'f') {
                    suppressIndexUpdate = true;
                    if (e.target == sidebarBtn) {
                        iSideBarLinks = 0;
                        sidebarLinks[0].focus();
                    } else {
                        iSideBarLinks = (iSideBarLinks === -1) ? 0 : (iSideBarLinks + 1) % sidebarLinks.length;
                        sidebarLinks[iSideBarLinks].focus();
                    }
                    suppressIndexUpdate = false;
                } else if (key === 'a') {
                    e.preventDefault();
                    e.stopPropagation();
                    suppressIndexUpdate = true;
                    iSideBarLinks = (iSideBarLinks === -1)
                        ? sidebarLinks.length - 1
                        : (iSideBarLinks - 1 + sidebarLinks.length) % sidebarLinks.length;
                    sidebarLinks[iSideBarLinks].focus();
                    suppressIndexUpdate = false;
                } else if (key === 'm') {
                    mKeyFocusOrder(e);
                } else if (key === 's') {
                    denlargeAllImages();
                    if (e.target == sidebarBtn) {
                        if (lastClickedLink) lastClickedLink.focus();
                    }
                    if (e.target === lastClickedLink) sidebarBtn.focus();
                    else if (lastClickedLink) lastClickedLink.focus();
                } else if (!isNaN(key)) numberShortcut(key);
                break;

            case "main":
                // IMPORTANT: no headerElementsFocus here either
                handleStepKeys(key, e, mainTargetDiv);
                headerElementsFocus(key,e)
                if (key === 's') {
                    denlargeAllImages();
                    if (mainContainer.classList.contains("collapsed")) {
                        mainContainer.classList.remove("collapsed");
                    }
                    sKeyFocusOrder();
                }
                
                if (key === 'e' || key === 'p') {
                    const steps = mainTargetDiv.querySelectorAll(".step-float, .step");
                    if (key === 'e') {
                        if (e.target === steps[steps.length - 1]) {
                            endNxtLessonBtn.focus();
                        } else if (e.target === prevLessonBtn) {
                            endNxtLessonBtn.focus();
                        } else {
                            steps[steps.length - 1].focus();
                        }
                    }
                    if (key === 'p') prevLessonBtn.focus();
                }
                break;
        }
        
    });
    document.addEventListener("click", e => {
        const isVideo = e.target.tagName === "VIDEO";
        const isImg = e.target.tagName === "IMG";
        const isEnlarged = e.target.closest("#targetDiv");
        if ((!isVideo || !isImg) && isEnlarged ) {
            console.log(e.target)
            const allVids = document.querySelectorAll("video");
            const allImgs = document.querySelectorAll("img");
            console.log(allVids)
            denlargeAllVideos({ allVids });
            // denlargeAllImages({ allImgs });
        }
    }, true); // use capture so it fires before bubbling stops

}

export function changeTutorialLink(targetLink) {
    const vidBase = targetLink.getAttribute("data-video");
    const ts = targetLink.getAttribute("data-timestamp");
    let vidHref = vidBase;
    if (ts) {
        vidHref += (vidBase.includes("?") ? "&" : "?") + `t=${ts}s`;
        tutorialLink.href = vidHref;
    }
}
