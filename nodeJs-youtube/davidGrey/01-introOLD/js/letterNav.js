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
        if (mainContainer.classList.contains("collapsed")) mainContainer.classList.remove("collapsed");
        if (sideBar.classList.contains("collapsed")) sideBar.classList.remove("collapsed");
        requestAnimationFrame(() => sideBarBtn?.focus());
    }

    window.addEventListener("keydown", (e) => {
        const key = e.key.toLowerCase();
        const active = document.activeElement;

        if (e.metaKey || e.ctrlKey || e.altKey) return;

        // --- Sidebar 'f'/'a' handled separately ---

        // --- 'S' key handling ---
        // if (key === "s") return
        // if (key === "s") {
        //     e.preventDefault();

        //     // --- If mainTargetDiv (or children) focused, go straight to lastClickedSideLink ---
        //     if (mainTargetDiv.contains(active)) {
        //         if (lastClickedSideLink) {
        //             lastClickedSideLink.focus();
        //         } else if (lastFocusedSideBarLink) {
        //             lastFocusedSideBarLink.focus();
        //         }
        //         return;
        //     }

        //     // --- Sidebar ping-pong ---
        //     if (sideBarLinks.includes(active)) {
        //         sideBarBtn?.focus();
        //         return;
        //     }
        //     if (sideBarBtn === active) {
        //         // if (lastClickedSideLink) { lastClickedSideLink.focus(); return; }
        //         // if (lastFocusedSideBarLink) { lastFocusedSideBarLink.focus(); return; }
        //         // if (sideBarLinks.length) { sideBarLinks[0].focus(); return; }
        //     }

        //     // --- Outside sidebar ---
        //     if (!sideBar.contains(active)) {
        //         if (lastClickedSideLink) { lastClickedSideLink.focus(); return; }
        //         if (lastFocusedSideBarLink) { lastFocusedSideBarLink.focus(); return; }
        //         if (sideBarLinks.length) { sideBarLinks[0].focus(); return; }
        //     }

        //     return;
        // }

        // ---------- Normal letter navigation ----------
        // Header links/buttons are always focusable
        const headerEls = Array.from(document.querySelectorAll("header a, header button, header [tabindex='0']"));

        let focusableEls = [
            ...headerEls,
            sideBarBtn,
            mainTargetDiv
        ];

        // Include sidebar links only if sidebar is expanded AND mainTargetDiv is NOT focused
        if (!sideBar.classList.contains('collapsed') && !mainTargetDiv.contains(active)) {
            focusableEls.push(...sideBarLinks);
        }

        focusableEls = focusableEls.filter(Boolean);

        const matchingEls = focusableEls.filter(el => normalizeName(el).startsWith(key));
        if (!matchingEls.length) return;

        let nextIndex = matchingEls.indexOf(active) + 1;
        if (nextIndex >= matchingEls.length) nextIndex = 0;
        matchingEls[nextIndex].focus();

    }, true);
}
