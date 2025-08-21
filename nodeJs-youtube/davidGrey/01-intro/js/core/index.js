// index.js
import { initKeyboardNav } from "../nav/keyboard-nav.js";
import { getPageHeader, getPageHeaderLinks, getNavLessonTitle ,getSideBar, getSideBarBtn, initSideBarLinks, getMainTargetDiv } from "../utils/dom-utils.js";

document.addEventListener("DOMContentLoaded", () => {
    initKeyboardNav({
        pageHeader: getPageHeader(),
        pageHeaderLinks: getPageHeaderLinks(),
        navLessonTitle: getNavLessonTitle(),
        sidebar: getSideBar(),
        sidebarBtn: getSideBarBtn(),
        sidebarLinks: initSideBarLinks(),
        mainTargetDiv: getMainTargetDiv()
    });
});
