/** I'm thinking make an initial universal letter focus or dumb down letter focus 
for initial variables, home-links and weblinks > a , plus #tutorialLink and darkModeBtn
call it something like... initFocused or headerFocused, */
// keyboard-nav.js
import { injectContent } from "../core/inject-content.js";
export function initKeyboardNav({ pageHeader, pageHeaderLinks, navLessonTitle , sidebar, sidebarBtn, sidebarLinks, mainTargetDiv }) {
    let sideBarFocus = false;
    let sideBarLinksFocused = false;
    let lastFocusedLink = null;
    let lastClickedLink = null;
    let currentWidth = innerWidth;
    // let initFocused = true
    let pageHeaderFocused = false
    let mainTargetDivFocused = false;
    let iSideBarLinks = -1
    pageHeader.addEventListener("focusin", (e) => { 
        pageHeaderFocused = true; 
        sideBarFocus = false
        mainTargetDiv = false
    });
    mainTargetDiv.addEventListener("focusin", () => { 
        pageHeaderFocused = false
        mainTargetDivFocused = true; 
        sideBarFocus = false
    });
    mainTargetDiv.addEventListener("focusout", () => { mainTargetDivFocused = false; });
    sidebarBtn.addEventListener("focusin", () => { sideBarFocus = true; });
    sidebarBtn.addEventListener("focusout", () => { sideBarFocus = false; });
    sidebar.addEventListener("focusout", () => { sideBarFocus = false; });
    
    sidebarBtn.addEventListener("keydown", (e) => { 
        let key = e.key.toLowerCase()    
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
        if(el.hasAttribute('autofocus')){
            injectContent(el.href)
            console.log(mainTargetDiv)
        }
        el.addEventListener("focus", () => {  
            sideBarLinksFocused = true;
            sideBarFocus = true
            lastFocusedLink = el;
            iSideBarLinks = [...sidebarLinks].indexOf(el)
        });
        
        el.addEventListener("click", (e) => { 
            e.preventDefault();
            e.stopPropagation();
            injectContent(e.target.href);
            // lastClickedLink = e.target;
        });
        el.addEventListener("keydown", (e) => { 
            let key = e.key.toLowerCase()
            if(key === 'enter'){
                if(lastClickedLink = e.target){
                    // mainTargetDiv.focus()
                }
                injectContent(e.target.href);
            }
            if(key === 's'){
                sidebarBtn.focus()
            }
            // lastClickedLink = e.target;
        });
    })
    
    addEventListener("keydown", e => {
        const key = e.key.toLowerCase();
        initElementFocus(key)
        if(!mainTargetDivFocused){
            if (e.shiftKey || e.metaKey) return
            if (key == 'f') {
                iSideBarLinks = (iSideBarLinks + 1) % sidebarLinks.length;
                sidebarLinks[iSideBarLinks].focus();
            } else if (key == 'a') {
                iSideBarLinks = (iSideBarLinks - 1 + sidebarLinks.length) % sidebarLinks.length;
                sidebarLinks[iSideBarLinks].focus();
            }
            
            if (!isNaN(key)) {
                const index = parseInt(key) - 1;
                if (index < 0) return;
                if (index < sidebarLinks.length) {
                    sidebarLinks[index].focus();
                
                } else {
                const steps = mainTargetDiv.querySelectorAll(".step-float, .step");
                if (index < steps.length) {
                    steps[index].focus();
                }
            }

                
            }                    
        } else
        if(key === 's' && !sideBarFocus){
            console.log()
            // iSideBarLinks -= 1
            
        } 
    });
    function initElementFocus(key){
        if (key === 'n') {
            navLessonTitle.focus()
        }

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
        }
        if (key === 's') {
            iSideBarLinks -= 1
            console.log('sideBarFocus', sideBarFocus)
            console.log('sideBarLinksFocused', sideBarLinksFocused)
            if (lastClickedLink) {
                lastClickedLink.focus()
            } else if (lastFocusedLink) {
                lastFocusedLink.focus()
            } else {
                sidebarBtn.focus()
            }
        }
    }
}
