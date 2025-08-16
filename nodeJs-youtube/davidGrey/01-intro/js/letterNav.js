// letterNav.js
export function letterNav({
    mainTargetDiv,
    sideBarBtn,
    sideBarLinks,
    lastClickedSideLink,
    lastFocusedSideBarLink,
    sideBar,
    mainContainer
}) {

    function normalizeName(el) {
        let text = (el.innerText || "").trim().toLowerCase();
        if (!text) {
            text = (
                el.getAttribute("data-keyfocus") ||
                el.getAttribute("aria-label") ||
                el.getAttribute("title") ||
                ""
            ).trim().toLowerCase();
        }
        if (el.id === "sideBarBtn") text = "sidebar";
        if (el.id === "navLessonTitle") text = "navLessonTitle";
        if (el.id === "mainTargetDiv") text = "mainTargetDiv";
        return text.replace(/\s+/g, " ").replace(/^\d+\.\s*/, "").replace(/^[^a-z0-9]+/, "");
    }

    function isCollapsed() {
        return !!(
            (mainContainer && mainContainer.classList.contains("collapsed")) ||
            (sideBar && sideBar.classList.contains("collapsed"))
        );
    }

    function expandSidebarAndFocusBtn() {
        if (mainContainer?.classList.contains("collapsed")) mainContainer.classList.remove("collapsed");
        if (sideBar?.classList.contains("collapsed")) sideBar.classList.remove("collapsed");
        requestAnimationFrame(() => sideBarBtn?.focus());
    }

    window.addEventListener("keydown", (e) => {
        const key = e.key.toLowerCase();
        const active = document.activeElement;

        if (e.metaKey || e.ctrlKey || e.altKey) return;

        // ---------- Handle 'S' key ----------
        if (key === 's') {
            e.preventDefault();
            // If collapsed and focus outside sidebar, expand and focus button
            if (isCollapsed() && !sideBar.contains(active)) {
                expandSidebarAndFocusBtn();
                return;
            }
            // Focus last clicked/focused sidebar link or button
            if (lastClickedSideLink) { lastClickedSideLink.focus(); return; }
            if (lastFocusedSideBarLink) { lastFocusedSideBarLink.focus(); return; }
            sideBarBtn?.focus();
            return;
        }

        // ---------- If mainTargetDiv is focused ----------
        if (active === mainTargetDiv) {
            // Only allow letters to match elements **excluding sidebar-links**
            const headerEls = Array.from(document.querySelectorAll("header a, header button, header [tabindex='0']"));
            const steps = Array.from(document.querySelectorAll(".step, .step-float"));
            const focusableEls = [...headerEls, mainTargetDiv, ...steps].filter(Boolean);

            if (/^[a-z]$/.test(key)) {
                const matchingEls = focusableEls.filter(el => normalizeName(el).startsWith(key));
                if (matchingEls.length) {
                    let nextIndex = matchingEls.indexOf(active) + 1;
                    if (nextIndex >= matchingEls.length) nextIndex = 0;
                    matchingEls[nextIndex].focus();
                }
            }

            // 'F' or 'B' or other keys can be added later here for step navigation
            return;
        }

        // ---------- Normal letter navigation when outside mainTargetDiv ----------
        const headerEls = Array.from(document.querySelectorAll("header a, header button, header [tabindex='0']"));
        const focusableEls = [...headerEls, sideBarBtn, ...sideBarLinks, mainTargetDiv].filter(Boolean);

        if (/^[a-z]$/.test(key)) {
            const matchingEls = focusableEls.filter(el => normalizeName(el).startsWith(key));
            if (matchingEls.length) {
                let nextIndex = matchingEls.indexOf(active) + 1;
                if (nextIndex >= matchingEls.length) nextIndex = 0;
                matchingEls[nextIndex].focus();
            }
        }

    }, true); // capture phase
}
