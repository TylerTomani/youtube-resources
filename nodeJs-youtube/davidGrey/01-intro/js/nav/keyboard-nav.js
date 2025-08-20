    // keyboard-nav.js
    import { injectContent } from "../core/inject-content.js";
    export function initKeyboardNav({ sidebar, sidebarBtn, sidebarLinks, mainTargetDiv }) {
        let sideBarFocuseIN = false;
        let sideBarLinksFocused = false;
        let lastFocusedLink = null;
        let lastClickedLink = null;
        let currentWidth = innerWidth;
        let mainTargetDivFocused = false;

        mainTargetDiv.addEventListener("focusin", () => { mainTargetDivFocused = true; });
        mainTargetDiv.addEventListener("focusout", () => { mainTargetDivFocused = false; });
        sidebar.addEventListener("focusin", () => { sideBarFocuseIN = true; });
        // sidebar.addEventListener("focusout", () => { sideBarFocuseIN = false; });
        
        sidebarBtn.addEventListener("keydown", (e) => { 
            let key = e.key.toLowerCase()    
            if(key == 's'){
                if(lastClickedLink){
                    lastClickedLink.focus()
                } else if(lastFocusedLink){
                    lastFocusedLink.focus()
                }
                
            }
            
        });
        sidebarLinks.forEach(el => {
            if(el.hasAttribute('autofocus')){
                injectContent(el.href)
            }
            el.addEventListener("focusin", () => {  
                sideBarLinksFocused = true;
                lastFocusedLink = el;
            });
            el.addEventListener("focusout", () => { sideBarLinksFocused = false;});
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
            console.log('mainTargetDivFocused', mainTargetDivFocused)
            if(!mainTargetDivFocused){
                if (key === "m") {
                    if (e.target.id === "mainTargetDiv") {
                        // lastStep.focus(); // <- you’ll add this later
                    } else {
                        scrollTo(0, 0);
                        mainTargetDiv.focus();
                    }
                }
                return
            } else
            if(mainTargetDivFocused && !sideBarLinksFocused){
                console.log('s')
                if(key === 's'){
                    if(lastClickedLink){
                        lastClickedLink.focus()
                    } else if(lastFocusedLink){
                        lastFocusedLink.focus()
                    } else {
                        sidebarBtn.focus()
                    }
                }
                return
            } else 
            if(sideBarFocuseIN){
                console.log('side-bar focused')
            }

            if (!isNaN(key)) {
                const index = parseInt(key) - 1;
                if (index < 0) return;

                if (!mainTargetDivFocused) {
                    if (index < sidebarLinks.length) {
                        sidebarLinks[index].focus();
                    }
                } else {
                    const steps = mainTargetDiv.querySelectorAll(".step-float, .step");
                    if (index < steps.length) {
                        steps[index].focus();
                    }
                }
            }
        });
    }
