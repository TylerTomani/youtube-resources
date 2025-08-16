// mainTargetDivNav.js
import { mainTargetDiv, lastClickedSideLink, lastFocusedSideBarLink, sideBarBtn } from '../main-script.js';
import { stepTxtsFocus } from './stepTxts.js';

/**
 * Handles keyboard navigation when mainTargetDiv is focused.
 * Only letters/numbers that should NOT focus sidebar-links are restricted.
 * 'S' key still goes to lastClicked/lastFocused sidebar or sideBarBtn.
 */
export function mainTargetDivNav() {
    if (!mainTargetDiv) return;

    mainTargetDiv.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        const active = document.activeElement;

        // Prevent modifier keys from interfering
        if (e.metaKey || e.ctrlKey || e.altKey) return;

        // ---------- 'S' key → move focus to sidebar button or last clicked/focused ----------
        if (key === 's') {
            e.preventDefault();
            if (lastClickedSideLink) {
                lastClickedSideLink.focus();
            } else if (lastFocusedSideBarLink) {
                lastFocusedSideBarLink.focus();
            } else {
                sideBarBtn?.focus();
            }
            return;
        }

        // ---------- Number keys → delegate to stepTxtsFocus ----------
        if (/^[0-9]$/.test(key)) {
            e.preventDefault();
            stepTxtsFocus(key); // Use your existing stepTxtsFocus logic
            return;
        }

        // ---------- Other keys ('f', 'b', 'enter', etc.) → stepTxtsFocus ----------
        const specialKeys = ['f', 'b', 'enter'];
        if (specialKeys.includes(key)) {
            e.preventDefault();
            stepTxtsFocus(key);
            return;
        }

        // ---------- Normal letter nav for mainTargetDiv ----------
        // Allow all letters to focus other elements EXCEPT sidebar-links-ul li a
        // You can add more rules here if needed
    });

    mainTargetDiv.addEventListener('focus', () => {
        // Optional: flag to indicate mainTargetDiv is focused
        // Could be used elsewhere if needed
        console.log('mainTargetDiv focused');
    });
}
