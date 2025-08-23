// inject-content.js

import { initStepNavigation } from "../nav/step-txt.js";
import { addCopyCode } from "../ui/copy-code.js";
export function injectContent(href,mainTargetDiv,sidebarLinks,iSideBarLinks,navLessonTitle) {
    fetch(href)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser()
            mainTargetDiv.innerHTML = html;
            const doc = parser.parseFromString(html,'text/html')
            const changedNavLessonTitleH1 = doc.querySelector('#targetHeaderh3')

            // changedNavLessonTitleH1.classList.add('hidden')
            // navLessonTitle.innerHTML = changedNavLessonTitleH1.innerHTML
            initStepNavigation(mainTargetDiv,sidebarLinks,iSideBarLinks);
            addCopyCode()
        })
        .catch(err => {
            console.error('Failed to load content:', err);
        });
}
