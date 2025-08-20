// index.js
import { initKeyboardNav } from "../nav/keyboard-nav.js";
import { getSideBar, getSideBarBtn, getMainTargetDiv, initSideBarLinks } from "../utils/dom-utils.js";

document.addEventListener("DOMContentLoaded", () => {
    initKeyboardNav({
        sidebar: getSideBar(),
        sidebarBtn: getSideBarBtn(),
        sidebarLinks: initSideBarLinks(),
        mainTargetDiv: getMainTargetDiv()
    });
});
