// index.js
import { initKeyboardNav } from "../nav/keyboard-nav.js";
import { getPageHeader, getPageHeaderLinks, getNavLessonTitle, getDarkModeBtn ,getSideBar, getSideBarBtn, initSideBarLinks, getMainTargetDiv,getMainContainer } from "../utils/dom-utils.js";
import {toggleSidebar} from "../ui/toggle-sidebar.js"
const mainDiv = getMainTargetDiv();
const mainContainer = getMainContainer()
const navLessonTitle = getNavLessonTitle()
const sideBarBtn = getSideBarBtn()
const sideBar = getSideBar()
document.addEventListener("DOMContentLoaded", () => {
    toggleSidebar(navLessonTitle,sideBar,sideBarBtn,mainContainer)
    initKeyboardNav({
        pageHeader: getPageHeader(),
        pageHeaderLinks: getPageHeaderLinks(),
        darkModeBtn: getDarkModeBtn(),
        navLessonTitle: navLessonTitle,
        sidebar: sideBar,
        sidebarBtn: sideBarBtn,
        sidebarLinks: initSideBarLinks(),
        mainTargetDiv: mainDiv,
        mainContainer : mainContainer
    });
    
});
