// numberNav.js
import { mainTargetDiv, mainTargetDivFocused } from '../core/main-script.js';

let parts = document.querySelectorAll('.sidebar-links-ul li a');
let lastStep = null;

export function initNumberNav() {
    addEventListener('keydown', e => {
        const key = e.key.toLowerCase();

        // --- Number shortcuts ---
        if (!isNaN(key)) {
            const index = parseInt(key) - 1;
            if (index < 0) return;

            if (!mainTargetDivFocused) {
                // Sidebar navigation
                if (index < parts.length) {
                    parts[index].focus();
                }
            } else {
                // Lesson navigation
                const steps = mainTargetDiv.querySelectorAll('.step-float');
                if (index < steps.length) {
                    steps[index].focus();
                    lastStep = steps[index];
                }
            }
        }

        // --- "m" shortcut ---
        if (key === 'm' && lastStep) {
            if (e.target.id === 'mainTargetDiv') {
                lastStep.focus();
            } else {
                scrollTo(0, 0);
                mainTargetDiv.focus();
            }
        }
    });
}
