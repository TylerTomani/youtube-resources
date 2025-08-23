// inject-content.js
import { initStepNavigation } from "../nav/step-txt.js";
import { addCopyCode } from "../ui/copy-code.js";

export function injectContent(href, mainTargetDiv, sidebarLinks, iSideBarLinks, navLessonTitle, callback) {
    fetch(href)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            mainTargetDiv.innerHTML = html;
            const doc = parser.parseFromString(html, 'text/html');

            const changedNavLessonTitleH1 = doc.querySelector('#targetHeaderh3');
            // You can update navLessonTitle if needed
            // navLessonTitle.innerHTML = changedNavLessonTitleH1?.innerHTML || '';

            // Initialize steps and copy-code
            initStepNavigation(mainTargetDiv, sidebarLinks, iSideBarLinks);
            addCopyCode();

            // 🔹 Call the callback after content is fully loaded
            if (typeof callback === 'function') {
                callback();
            }
        })
        .catch(err => {
            console.error('Failed to load content:', err);
        });
}
