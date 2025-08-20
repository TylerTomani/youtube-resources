// dom-utils.js
export function getMainTargetDiv() {
    return document.querySelector("#mainTargetDiv");
}
export function getSideBar() {
    return document.querySelector(".side-bar");
}
export function getSideBarBtn() {
    return document.querySelector("#sideBarBtn");
}
export function initSideBarLinks() {
    return document.querySelectorAll("ul.sidebar-links-ul li a");
}
