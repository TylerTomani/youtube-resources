// index.js
import { initKeyboardNav } from "../nav/keyboard-nav.js";
import { getPageHeader, getPageHeaderLinks, getNavLessonTitle, getDarkModeBtn ,getSideBar, getSideBarBtn, initSideBarLinks, getMainTargetDiv,getMainContainer } from "../utils/dom-utils.js";

document.addEventListener("DOMContentLoaded", () => {
    initKeyboardNav({
        pageHeader: getPageHeader(),
        pageHeaderLinks: getPageHeaderLinks(),
        darkModeBtn: getDarkModeBtn(),
        navLessonTitle: getNavLessonTitle(),
        sidebar: getSideBar(),
        sidebarBtn: getSideBarBtn(),
        sidebarLinks: initSideBarLinks(),
        mainTargetDiv: getMainTargetDiv(),
        mainContainer : getMainContainer()
    });
});
