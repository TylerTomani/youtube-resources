// sidebarNavKeys.js
export function initSidebarNavKeys(sideBar, sideBarLinks, sideBarBtn) {
    const links = Array.isArray(sideBarLinks) ? sideBarLinks : Array.from(sideBarLinks);

    function focusNextLink(currentIndex) {
        const nextIndex = (currentIndex + 1) % links.length;
        links[nextIndex].focus();
    }

    function focusPrevLink(currentIndex) {
        const prevIndex = (currentIndex - 1 + links.length) % links.length;
        links[prevIndex].focus();
    }

    sideBar.addEventListener('keydown', (e) => {
        const active = document.activeElement;
        if (!sideBar.contains(active)) return; // Only act when focus is inside sidebar

        const key = e.key.toLowerCase();

        // Use findIndex to account for nested elements
        let currentIndex = links.findIndex(el => el === active || el.contains(active));

        // If button is focused, adjust start index
        if (active === sideBarBtn) currentIndex = key === 'f' ? -1 : 0;

        if (key === 'f') {
            e.preventDefault();
            focusNextLink(currentIndex);
        }

        if (key === 'a') {
            e.preventDefault();
            focusPrevLink(currentIndex);
        }
    });
}
