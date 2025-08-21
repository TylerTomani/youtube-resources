// inject-content.js

import { initStepNavigation } from "../nav/step-txt.js";
export function injectContent(href,mainTargetDiv,sidebarLinks,iSideBarLinks) {
    fetch(href)
        .then(response => response.text())
        .then(html => {
            mainTargetDiv.innerHTML = html;
            initStepNavigation(mainTargetDiv,sidebarLinks,iSideBarLinks);
        })
        .catch(err => {
            console.error('Failed to load content:', err);
        });
}
