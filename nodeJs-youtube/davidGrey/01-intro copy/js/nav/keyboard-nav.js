// keyboard-nav.js
import { injectContent } from "../core/inject-content.js";
import { handleStepKeys, lastStep, copyCodesStepFocused } from "./step-txt.js";
import { denlargeAllImages } from "./step-txt.js";
export let lastFocusedLink = null;
export let lastClickedLink = null;
export const endNxtLessonBtn = document.querySelector('#endNxtLessonBtn')   
const prevLessonBtn = document.querySelector('#prevLessonBtn')   
export const tutorialLink = document.querySelector('#tutorialLink')

export function initKeyboardNav({ pageHeader, pageHeaderLinks, navLessonTitle, darkModeBtn,
    sidebar, sidebarBtn, sidebarLinks, mainTargetDiv, mainContainer }) {
    let focusZone = "header"; // "header" | "sidebar" | "main"
    let iSideBarLinks = 0;
    // --- Focus zone tracking ---
    pageHeader.addEventListener("focusin", () => { focusZone = "header"; });
    sidebar.addEventListener("focusin", () => { focusZone = "sidebar"; });
    sidebarBtn.addEventListener("focusin", () => { focusZone = "sidebar"; });
    mainTargetDiv.addEventListener("focusin", () => { focusZone = "main"; });

    // --- Sidebar button behavior ---
    sidebarBtn.addEventListener("keydown", e => {
        const key = e.key.toLowerCase();
        if (key === 's') {
            // Toggle focus to last clicked link, or first sidebar link
            if (lastClickedLink) {
                lastClickedLink.focus();
            } else if (lastFocusedLink) {
                lastFocusedLink.focus();
            } else {
                sidebarLinks[0].focus();
            }
        }
        if (key === 'f' || key === ';') {
            // I don't get how this line works??
            iSideBarLinks = Math.max(iSideBarLinks - 1, -1);
            
        }
    });

    // --- Sidebar links ---
    sidebarLinks.forEach(el => {
        if (el.hasAttribute("autofocus")) {
            lastClickedLink = el

            iSideBarLinks = [...sidebarLinks].indexOf(el);
            focusZone = "sidebar";
            injectContent(el.href, mainTargetDiv, sidebarLinks, iSideBarLinks, navLessonTitle);
        }

        el.addEventListener("focus", () => {
            focusZone = 'sidebar'
            lastFocusedLink = el;
            iSideBarLinks = [...sidebarLinks].indexOf(el);
        });

        el.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();

            const targetLink = e.target.closest("a");
            if (targetLink) {
                iSideBarLinks = [...sidebarLinks].indexOf(el);

                changeTutorialLink(targetLink)
                injectContent(targetLink.href, mainTargetDiv, sidebarLinks, iSideBarLinks, navLessonTitle);
            }

            lastClickedLink = e.target;
        });

        el.addEventListener("keydown", e => {
            const key = e.key.toLowerCase();
            if (key === 'enter') {
                focusZone = 'sidebar'
                const targetLink = e.target.closest("a");
                if (targetLink) injectContent(targetLink.href, mainTargetDiv);
                if (e.target === lastClickedLink){
                    mainTargetDiv.focus();
                    const stepFloats = mainTargetDiv.querySelectorAll('.step-float')
                    // stepFloats[0].focus()

                }
                lastClickedLink = e.target;
            } else if (key === 's') {
                sidebarBtn.focus(); // toggle back to sidebar button
            }
            if(key === 'm'){
                // mainTargetDiv.focus()
                // console.log(e.target)
                mKeyFocusOrder(e)
            }
        });
    });

    
    endNxtLessonBtn.addEventListener('click', e => {
        e.preventDefault()
        iSideBarLinks = (iSideBarLinks + 1) % sidebarLinks.length
        // sidebarLinks[iSideBarLinks].focus()
        mainTargetDiv.scrollIntoView({behavior: 'instant', block: 'start'})
        sidebarLinks[iSideBarLinks].click()
        lastClickedLink = sidebarLinks[iSideBarLinks]

    })
    endNxtLessonBtn.addEventListener('keydown', e => {
        let key = e.key.toLowerCase() 
        if(key === 'm'){
            mainTargetDiv.scrollIntoView({ behavior: 'instant', block: 'start' })
            // mainTargetDiv.focus()
            mKeyFocusOrder()

        }
        
        

    })
    prevLessonBtn.addEventListener('click', e => {
        iSideBarLinks = (iSideBarLinks - 1 + sidebarLinks.length) % sidebarLinks.length
        deHighlightSideBarLink()
        sidebarLinks[iSideBarLinks].click()
    
    })
    function deHighlightSideBarLink(){
        sidebarLinks.forEach(el => {
            if(el.classList.contains('hlight')){
                el.classList.remove('hlight')
            }
        })

    }
    // --- Helper functions ---
    function sKeyFocusOrder() {
        if (lastClickedLink) lastClickedLink.focus();
        else if (lastFocusedLink) lastFocusedLink.focus();
        else sidebarLinks[0].focus();
    }
    // This function is imncomplete
    function mKeyFocusOrder(e) {
        const steps = document.querySelectorAll('.step-float')
        if (lastStep) {
            lastStep.focus()
        } else if(steps[0]){
            steps[0].focus()
        } else {

            mainTargetDiv.focus()
        }
    }

    function headerElementsFocus(key, e) {
        pageHeaderLinks.forEach(el => { if (key === el.id[0]) el.focus(); });
        switch (key) {
            case "c":
                const codeComShortcutsLink = document.querySelector("#codeComShortcutsLink");
                const chatGptProjLink = document.querySelector("#chatGptProjLink");
                if (e.target === codeComShortcutsLink) chatGptProjLink.focus();
                else codeComShortcutsLink.focus();
                break;
            case "d":
                darkModeBtn.focus();
                break;
            case "n":
                navLessonTitle.focus();
                break;
            case "t":
                document.querySelector("#tutorialLink").focus();
                break;
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
                    iSideBarLinks = 0
                    sidebarLinks[iSideBarLinks].focus()

                    break;
                }
                if (key === 's') {
                    if (mainContainer.classList.contains('collapsed')) {
                        mainContainer.classList.remove('collapsed')
                    }
                    sKeyFocusOrder()
                }
                if (key === 'm') {
                    focusZone = 'main'
                    mKeyFocusOrder(e)
                };
                if (!isNaN(key)) numberShortcut(key);
                break;

            case "sidebar":
                headerElementsFocus(key, e);
                if (key === 'f') {
                    if (e.target == sidebarBtn) {
                        iSideBarLinks = 0
                        sidebarLinks[0].focus()
                    } else {
                        iSideBarLinks = (iSideBarLinks === -1) ? 0 : (iSideBarLinks + 1) % sidebarLinks.length;
                        sidebarLinks[iSideBarLinks].focus();

                    }
                } else if (key === 'a') {
                    iSideBarLinks = (iSideBarLinks === -1) ? sidebarLinks.length - 1 : (iSideBarLinks - 1 + sidebarLinks.length) % sidebarLinks.length;
                    sidebarLinks[iSideBarLinks].focus();
                }
                else if (key === 'm') {
                    mainTargetDiv.focus()
                    // mKeyFocusOrder(e)
                } else if (key === 's') {
                    // Toggle between sidebarBtn and last clicked link
                    denlargeAllImages()
                    if (e.target == sidebarBtn) {

                        if (lastClickedLink) {
                            lastClickedLink.focus()
                        }
                    }
                    if (e.target === lastClickedLink) sidebarBtn.focus();
                    else if (lastClickedLink) lastClickedLink.focus();
                }
                else if (!isNaN(key)) numberShortcut(key);


                break;

            case "main":
                headerElementsFocus(key, e);
                handleStepKeys(key, e, mainTargetDiv);

                if (key === 's') {
                    denlargeAllImages()
                    // sidebarBtn.focus()
                    if (mainContainer.classList.contains("collapsed")) {
                        mainContainer.classList.remove("collapsed");
                    }
                    
                    sKeyFocusOrder()
                }
                // lesson-btns-container 
                if (key === 'e' || key === 'p') {
                    const steps = mainTargetDiv.querySelectorAll(".step-float, .step");
                    if (key === 'e') {
                        if (e.target === steps[steps.length - 1]) {
                            endNxtLessonBtn.focus()
                        } else if (e.target === prevLessonBtn) {
                            endNxtLessonBtn.focus()
                        } else steps[steps.length - 1].focus()
                    }
                    if (key === 'p') {
                        prevLessonBtn.focus()
                    }
                }

                break;
        }
    });
}
export function changeTutorialLink(targetLink){
    // get data attrs
    console.log(targetLink)
    const vidBase = targetLink.getAttribute("data-video");
    const ts = targetLink.getAttribute("data-timestamp");

    let vidHref = vidBase;
    if (ts) {
        vidHref += (vidBase.includes("?") ? "&" : "?") + `t=${ts}s`;
        tutorialLink.href = vidHref;
    }
    // console.log(tutorialLink.href)
}