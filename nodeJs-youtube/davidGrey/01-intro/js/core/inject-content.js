// inject-content.js
// import { stepTxtsFocus } from "../nav/step-txt.js";
// import { addCopyCodes } from "../../../js/copy-code.js";
// import { initLetterNav } from "../nav/letter-nav.js";
// import { sideBarBtn } from "../ui/toggle-sidebar.js";
// import { mainTargetDiv, mainContainer } from "./main-script.js";
// 

export function injectContent(href) {
    fetch(href)
        .then(response => response.text())
        .then(html => {
            mainTargetDiv.innerHTML = html;
            // addCopyCodes();
            // letterFocus();
            // stepTxtsFocus();
            // loadTutorialCurrentTime()
        })
        .catch(err => {
            console.error('Failed to load content:', err);
        });
}

// initLetterNav()
// stepTxtsFocus()