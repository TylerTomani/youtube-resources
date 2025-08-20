// main-script.js
import { initKeyboardNav } from "../nav/keyboard-nav.js";

export function initSideBarLinks() {
    return document.querySelectorAll("ul.sidebar-links-ul li a");
}

export function getMainTargetDiv() {
    return document.querySelector("#mainTargetDiv");
}
export function getSideBar() {
    return document.querySelector(".side-bar");
}
export function getSideBarBtn() {
    return document.querySelector("#sideBarBtn");
}

document.addEventListener("DOMContentLoaded", () => {
    addEventListener("resize", e => {
        currentWidth = innerWidth;
    });

    const sidebar = getSideBar()
    const sidebarBtn = getSideBarBtn()
    const sidebarLinks = initSideBarLinks();
    const mainTargetDiv = getMainTargetDiv();

    initKeyboardNav({ sidebar, sidebarBtn, sidebarLinks, mainTargetDiv });
});
