
// keyboard-nav.js
import { injectContent } from "../core/inject-content.js";
import {  handleStepKeys } from "./step-txt.js";
import { getDarkModeBtn } from "../utils/dom-utils.js";
export let lastFocusedLink = null;
export let lastClickedLink = null;
export function initKeyboardNav({ pageHeader, pageHeaderLinks, navLessonTitle , darkModeBtn, 
    sidebar, sidebarBtn, sidebarLinks, mainTargetDiv,mainContainer }) {
    let focusZone = "header"; // "header" | "sidebar" | "main"
    let iSideBarLinks = -1;

    // --- Focusin listeners update the current zone ---
    pageHeader.addEventListener("focusin", () => { focusZone = "header"; });
    sidebar.addEventListener("focusin", () => { focusZone = "sidebar"; });
    sidebarBtn.addEventListener("focusin", () => { focusZone = "sidebar"; });
    mainTargetDiv.addEventListener("focusin", () => { focusZone = "main"; });
    
    sidebarBtn.addEventListener("keydown", (e) => { 
        let key = e.key.toLowerCase()    
        iSideBarLinks = -1
        
        if(key == 's'){
            if(lastClickedLink){
                lastClickedLink.focus()
            } else if(lastFocusedLink){
                lastFocusedLink.focus()
            } else {
                sidebarLinks[0].focus()
            }
            
        }
        
    });
    sidebarLinks.forEach(el => {
        if (el.hasAttribute("autofocus")) {
            iSideBarLinks = [...sidebarLinks].indexOf(el);
            injectContent(el.href, mainTargetDiv,sidebarLinks,iSideBarLinks);
        }
        el.addEventListener("focus", () => {
            lastFocusedLink = el;
            iSideBarLinks = [...sidebarLinks].indexOf(el);
        });
        el.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation()
            if(e.target.closest('a')){
                console.log(e.target.closest('a'))
                iSideBarLinks = [...sidebarLinks].indexOf(el)
                injectContent(e.target.closest('a').href, mainTargetDiv, sidebarLinks,iSideBarLinks);
            }
            // initialize step navigation once

            lastClickedLink = e.target;
        });
        el.addEventListener("keydown", e => {
            if (e.key.toLowerCase() === "enter") {
                if (e.target.closest('a')) {
                    console.log(e.target.closest('a'))
                    injectContent(e.target.closest('a').href, mainTargetDiv);
                }
                if (e.target == lastClickedLink) {
                    mainTargetDiv.focus()
                }
                lastClickedLink = e.target;
            } else if (e.key.toLowerCase() === "s") {
                sidebarBtn.focus();
            }
        });
    });
    
    addEventListener("keydown", e => {
        const key = e.key.toLowerCase();
        if (e.shiftKey || e.metaKey) return;
        // HEADER
        if (focusZone === "header") {
            headerElementsFocus(key,e)
            if(key == 's'){
                sKeyFocusOrder()
            }
        }
        // ----- SIDEBAR -----
        if (focusZone === "sidebar") {
            headerElementsFocus(key, e)
            if (key === "f") { // forward cycle
                iSideBarLinks = (iSideBarLinks + 1) % sidebarLinks.length;
                sidebarLinks[iSideBarLinks].focus();
            } else if (key === "a") { // backward cycle
                iSideBarLinks = (iSideBarLinks - 1 + sidebarLinks.length) % sidebarLinks.length;
                sidebarLinks[iSideBarLinks].focus();
            } else if (!isNaN(key)) { // number shortcuts
                const index = parseInt(key) - 1;
                if (index >= 0 && index < sidebarLinks.length) {
                    iSideBarLinks = index;
                    sidebarLinks[iSideBarLinks].focus();
                } else {
                    const steps = mainTargetDiv.querySelectorAll(".step-float, .step");
                    if (index >= 0 && index < steps.length) {
                        steps[index].focus();
                    }
                }
            } else if (key === "m") {
                mainTargetDiv.focus();
            } else if (key === "s") {
                if(e.target != sidebarBtn){
                    sidebarBtn.focus()
                } else {
                    sKeyFocusOrder()
                }
            }
        }

        // ----- MAIN -----
        if (focusZone === 'main') {
            headerElementsFocus(key, e);
            handleStepKeys(key, e, mainTargetDiv);
            if (key === 's') sKeyFocusOrder();
        }


        

    });
    function initElementFocus(key,e){
                
        if (key === 'n') {
            navLessonTitle.focus()
        } else
        if (key === 'n') {
            navLessonTitle.focus()
        } else
        if (key === "m") {
            if (mainTargetDiv) {
                mainTargetDiv.focus()
                scrollTo(0, 0);
            }
            // if (e.target.id === "mainTargetDiv") {
            //     // lastStep.focus(); // <- you’ll add this later
            // } else {
            //     // mainTargetDiv.focus();
            //     console.log(mainTargetDiv)
            // }
        } else
        if (key === 's') {
            iSideBarLinks -= 1
            sKeyFocusOrder(e)   
        }
    }
    function sKeyFocusOrder(){
        if (lastClickedLink) {
            lastClickedLink.focus();
        } else if (lastFocusedLink) {
            lastFocusedLink.focus();
        } else {
            sidebarLinks[0].focus();
        }
    }
    function headerElementsFocus(key,e){
        pageHeaderLinks.forEach(el =>{
            if(key === el.id[0]){
                el.focus()          
            }
        })        
        if (key === 'c') {
            const codeComShortcutsLink = document.querySelector('#codeComShortcutsLink')
            const chatGptProjLink = document.querySelector('#chatGptProjLink')
            codeComShortcutsLink.focus()
            if (e.target == codeComShortcutsLink) {
                chatGptProjLink.focus()
            } else if (e.target == chatGptProjLink){
                codeComShortcutsLink.focus()
            }
            
        } else if(key === 'd'){
            darkModeBtn.focus()
        }
        else if (key === "m") {
            mainTargetDiv.focus();
        } else if (key === "n") {
            navLessonTitle.focus();
        } else if (key === "s") {
            sidebarBtn.focus();
        } else if (key === "t") {
            const tutorialLink = document.querySelector('#tutorialLink')
            tutorialLink.focus()
        }

    }
}
