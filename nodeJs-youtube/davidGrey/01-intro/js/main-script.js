// main-script.js
import { initSidebarNavKeys } from './components/sidebarNavKeys.js';
import { togggleSidebar, sideBarBtn } from './components/toggle-sidebar.js';
import { dragHideSidebar } from './components/drag-hide-sidebar.js';
import { letterNav } from './letterNav.js';
import { injectContent } from './inject-content.js';
import { stepTxtsFocus } from './components/stepTxts.js';
import { sideBarNav } from './components/sidebar-nav.js';
import { numFocus } from './numFocus.js';
    
export const sideBar = document.querySelector('.side-bar');
export const sideBarLinks = Array.from(document.querySelectorAll('.sidebar-links-ul li a'));
export const mainTargetDiv = document.querySelector('#mainTargetDiv');
export const mainContainer = document.querySelector('.main-container');
export const navLessonTitle = document.querySelector('#navLessonTitle');

// Track last clicked/focused sidebar links
export let lastClickedSideLink = null;
export let lastFocusedSideBarLink = null;

// Track focus state
export let mainTargetDivFocused = false;

mainTargetDiv.addEventListener('focusin', () => { mainTargetDivFocused = true; });
mainTargetDiv.addEventListener('focusout', () => { mainTargetDivFocused = false; });

initSidebarNavKeys(sideBar, sideBarLinks, sideBarBtn);
// Initialize sidebar toggle / drag
togggleSidebar();
dragHideSidebar(mainContainer, sideBar);

// Track sidebar clicks & focus
sideBarLinks.forEach(link => {
    if(link.hasAttribute('autofocus')){
        injectContent(link.href);
    }
    link.addEventListener('focus', () => { lastFocusedSideBarLink = link; });
    link.addEventListener('click', (e) => {
        e.preventDefault();
        injectContent(link.href);
        lastClickedSideLink = link;
    });
    link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            injectContent(link.href);
            lastClickedSideLink = link;
        }
    });
});

// Initialize letter navigation
letterNav({
    mainTargetDiv,
    sideBarBtn,
    sideBarLinks,
    lastClickedSideLink,
    lastFocusedSideBarLink,
    sideBar,
    mainContainer
});

// Global keydown handler
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        if (mainTargetDivFocused) {
            stepTxtsFocus(key);
        } else {
            const num = parseInt(key, 10);
            if (num >= 1 && num <= sideBarLinks.length) {
                sideBarLinks[num - 1].focus();
            }
        }
        return;
    }

    // Other letter navigation handled in letterNav
    sideBarNav(key, e, sideBarLinks, lastFocusedSideBarLink);
});
