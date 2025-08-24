// keyboard-nav.js
import { injectContent } from "../core/inject-content.js";
import { handleStepKeys, lastStep } from "./step-txt.js";

export let lastFocusedLink = null;
export let lastClickedLink = null;
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
        if (key === "s") {
            // Toggle focus to last clicked link, or first sidebar link
            if (lastClickedLink) {
                lastClickedLink.focus();
            } else if (lastFocusedLink) {
                lastFocusedLink.focus();
            } else {
                sidebarLinks[0].focus();
            }
        }
        if (key === "f") {
            // I don't get how this line works??
            iSideBarLinks = Math.max(iSideBarLinks - 1, -1);
            
        }
    });

    // --- Sidebar links ---
    sidebarLinks.forEach(el => {
        if (el.hasAttribute("autofocus")) {
            iSideBarLinks = [...sidebarLinks].indexOf(el);
            focusZone = "sidebar";
            injectContent(el.href, mainTargetDiv, sidebarLinks, iSideBarLinks, navLessonTitle);
        }

        el.addEventListener("focus", () => {
            lastFocusedLink = el;
            iSideBarLinks = [...sidebarLinks].indexOf(el);
        });

        el.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            const targetLink = e.target.closest("a");
            if (targetLink) {
                iSideBarLinks = [...sidebarLinks].indexOf(el);
                injectContent(targetLink.href, mainTargetDiv, sidebarLinks, iSideBarLinks, navLessonTitle);
            }
            lastClickedLink = e.target;
        });

        el.addEventListener("keydown", e => {
            const key = e.key.toLowerCase();
            if (key === "enter") {
                const targetLink = e.target.closest("a");
                if (targetLink) injectContent(targetLink.href, mainTargetDiv);
                if (e.target === lastClickedLink) mainTargetDiv.focus();
                lastClickedLink = e.target;
            } else if (key === "s") {
                sidebarBtn.focus(); // toggle back to sidebar button
            }
        });
    });

    // --- Global key handling ---
    addEventListener("keydown", e => {
        const key = e.key.toLowerCase();
        if (e.shiftKey || e.metaKey) return;

        switch (focusZone) {
            case "header":
                headerElementsFocus(key, e);
                if (key === "f") {
                    focusZone = "sidebar";
                    iSideBarLinks = 0
                    sidebarLinks[iSideBarLinks].focus()
                    break;
                }
                if (key === "s") {
                    if(mainContainer.classList.contains('collapsed')){
                        mainContainer.classList.remove('collapsed')
                    }
                    sKeyFocusOrder()
                }
                if (key === "m") mainTargetDiv.focus();
                if (!isNaN(key)) numberShortcut(key);
                break;

            case "sidebar":
                headerElementsFocus(key, e);
                if (key === "f") {
                    console.log(e.target)
                    if(e.target == sidebar){
                        iSideBarLinks = 0 
                        sidebarLinks[0].focus()
                        console.log('yes')
                    } else {
                        iSideBarLinks = (iSideBarLinks === -1) ? 0 : (iSideBarLinks + 1) % sidebarLinks.length;
                        sidebarLinks[iSideBarLinks].focus();
                    }
                } else if (key === "a") {
                    iSideBarLinks = (iSideBarLinks === -1) ? sidebarLinks.length - 1 : (iSideBarLinks - 1 + sidebarLinks.length) % sidebarLinks.length;
                    sidebarLinks[iSideBarLinks].focus();
                }
                else if (key === "m") {
                    mainTargetDiv.focus();
                    if (lastStep) lastStep.focus();
                } else if (key === "s") {
                    // Toggle between sidebarBtn and last clicked link
                    if (e.target === lastClickedLink) sidebarBtn.focus();
                    else if (lastClickedLink) lastClickedLink.focus();
                }
                else if (!isNaN(key)) numberShortcut(key);
                
                break;

            case "main":
                
                headerElementsFocus(key, e);
                handleStepKeys(key, e, mainTargetDiv);
                if (key === "s") {
                    sidebarBtn.focus()
                    if (mainContainer.classList.contains("collapsed")) 
                        mainContainer.classList.remove("collapsed");
                }
                break;
        }
    });
    // --- Helper functions ---
    function sKeyFocusOrder() {
        if (lastClickedLink) lastClickedLink.focus();
        else if (lastFocusedLink) lastFocusedLink.focus();
        else sidebarLinks[0].focus();
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
}
