// inject-content.js

import { initStepNavigation } from "../nav/step-txt.js";
export function injectContent(href,mainTargetDiv,sidebarLinks,iSideBarLinks,navLessonTitle) {
    fetch(href)
        .then(response => response.text())
        .then(html => {
            mainTargetDiv.innerHTML = html;
            const parser = new DOMParser()
            const doc = parser.parseFromString(html,'text/html')
            const changedNavLessonTitleH1 = doc.querySelector('#targetHeaderh3')
            // console.log(changedNavLessonTitleH1)
            // changedNavLessonTitleH1.classList.add('hidden')
            // navLessonTitle.innerHTML = changedNavLessonTitleH1.innerHTML
            initStepNavigation(mainTargetDiv,sidebarLinks,iSideBarLinks);
        })
        .catch(err => {
            console.error('Failed to load content:', err);
        });
}
