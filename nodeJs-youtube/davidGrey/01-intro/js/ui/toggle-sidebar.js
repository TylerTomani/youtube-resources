// toggle-sidebar.js
// import { getSideBar, getNavLessonTitle, getMainContainer } from "../utils/dom-utils.js";
// export const sideBarBtn = document.querySelector('#sideBarBtn');
// const darkmodeBtn = document.getElementById('darkmodeBtn'); // reference to dark mode button
// const sideBar = getSideBar()
// const navLessonTitle = getNavLessonTitle()
// const mainContainer = getMainContainer()
export function togggleSidebar(mainContainer,sidebar) {
console.log(mainContainer)
  console.log(sidebar)
  mainContainer?.classList.toggle('collapsed');
}
