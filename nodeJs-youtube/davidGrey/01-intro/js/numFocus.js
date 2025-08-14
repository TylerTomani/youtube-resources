// numFocus.js
export const sideBarLinks = [...document.querySelectorAll('.sidebar-links-ul > li > a')];
import { stepTxtsFocus } from "./components/stepTxts.js";
let mainTargetDivFocused = false;

// import { stepTxtsFocus } from "./components/stepTxts.js";

export function initNumFocus(mainTargetDiv) {
    if (!mainTargetDiv) {
        console.error("mainTargetDiv not found in DOM");
        return;
    }

    mainTargetDiv.addEventListener('focusin', () => {
        mainTargetDivFocused = true;
        console.log('mainTargetDiv is focused');
    });
    mainTargetDiv.addEventListener('blur', () => {
        mainTargetDivFocused = false;
        console.log('mainTargetDiv lost focus');
    });
      mainTargetDiv.addEventListener('focusout', (e) => {
        // Check if the new focused element is outside mainTargetDiv
        mainTargetDivFocused = false;
        if (!mainTargetDiv.contains(e.relatedTarget)) {
            console.log('mainTargetDiv lost focus entirely');
        }
    });
}

export function numFocus(key, e,iSideBarLinks) {
    e.preventDefault();
    e.stopPropagation();
    
    
    if (!mainTargetDivFocused) {
        const intLet = parseInt(key, 10);
        if (!isNaN(intLet) && intLet >= 1 && intLet <= sideBarLinks.length) {
            sideBarLinks[intLet - 1]?.focus();
        }
    } else {
        console.log(mainTargetDivFocused)
        
        stepTxtsFocus(e);
    }
    if(iSideBarLinks){
        // sideBarLinks[iSideBarLinks].focus()
    }
}
