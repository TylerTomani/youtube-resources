// inject-content.js

import { initStepNavigation } from "../nav/step-txt.js";
export function injectContent(href,mainTargetDiv) {
    fetch(href)
        .then(response => response.text())
        .then(html => {
            mainTargetDiv.innerHTML = html;
            initStepNavigation(mainTargetDiv);
        })
        .catch(err => {
            console.error('Failed to load content:', err);
        });
}
