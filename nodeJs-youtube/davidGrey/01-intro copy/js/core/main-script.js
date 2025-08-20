// main-script.js
import { stepTxtsFocus } from "../nav/step-txt.js";
// import { addCopyCodes } from "../../../js/copy-code.js";
import { letterFocus,parts } from "../nav/letter-nav.js";

import { mainTargetDiv, mainContainer, sideBar, sidebarLinks, navLessonTitle } from "./inject-content.js";
// import { loadTutorialCurrentTime } from "./loadTutorialCurrentTime.js";
export let lastFocusedLink = null;
export let lastClickedLink = null;
const sectionLessonTitle = document.querySelector('nav.section-lesson-title');
let sidebarLinksFocused = false;
let currentLinkIndex = 0;

export let currentWidth = innerWidth;
document.addEventListener('DOMContentLoaded', () => {
    let mainTargetDivFocused = false;

    addEventListener('resize', e => {
        currentWidth = innerWidth;
    });

    mainTargetDiv.addEventListener('focusout', e => {
        mainTargetDivFocused = false;
    });
    mainTargetDiv.addEventListener('focusin', e => {
        mainTargetDivFocused = true;
    });

    function injectContent(href) {
        fetch(href)
            .then(response => response.text())
            .then(html => {
                mainTargetDiv.innerHTML = html;
                // addCopyCodes();
                letterFocus();
                stepTxtsFocus();
                // loadTutorialCurrentTime()
            })
            .catch(err => {
                console.error('Failed to load content:', err);
            });
    }
    function getParts(el) {
        while (el && el.tagName !== 'A') {
            el = el.parentElement;
        }
        return el;
    }
    parts.forEach((el, index) => {
        if (el.hasAttribute('autofocus')) {
            injectContent(el.href);
            lastFocusedLink = el;
            lastClickedLink = el;
        }
        el.addEventListener('focus', (e) => {
            mainTargetDivFocused = false;
        });

        // ✅ Updated CLICK HANDLER
        el.addEventListener('focus', (e) => {
            currentLinkIndex = [...parts].indexOf(el)
        })
        el.addEventListener('click', (e) => {
            const anchor = getParts(e.target);
            if (anchor && anchor.href) {
                e.preventDefault();
                injectContent(anchor.href);

                if (anchor === lastFocusedLink) {
                    lastClickedLink = anchor;
                }

                lastFocusedLink = anchor;
                currentLinkIndex = index;
            }
        });

        el.addEventListener('keydown', (e) => {
            let letter = e.key.toLowerCase();
            if (letter === 'enter') {
                e.preventDefault();
                e.stopPropagation();
                injectContent(el.href);

                if (el === lastFocusedLink) {
                    if (currentWidth < 600) {
                        const sideBar = document.querySelector('.side-bar');
                        sideBar.classList.add('deactive');
                    }
                    mainTargetDiv.focus();
                    scrollTo(0, 0);
                }

                lastClickedLink = el;
                lastFocusedLink = el;
                currentLinkIndex = index;
            }

            if (!mainTargetDivFocused) {
                if (letter === 'a' && !e.shiftKey) {
                    currentLinkIndex = (currentLinkIndex + 1) % parts.length;
                    parts[currentLinkIndex].focus();
                } else if (letter === 'a' && e.shiftKey) {
                    currentLinkIndex = (currentLinkIndex - 1 + parts.length) % parts.length;
                    parts[currentLinkIndex].focus();
                }
                
                
            }
        });
    });

    // Letter Num focus
    addEventListener('keydown', e => {
        let letter = e.key.toLowerCase();
        
        
    });
});
letterFocus()
stepTxtsFocus()