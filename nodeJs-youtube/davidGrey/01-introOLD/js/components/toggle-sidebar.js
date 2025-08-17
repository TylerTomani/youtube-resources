// toggle-sidebar.js
import { mainContainer, sideBar, navLessonTitle } from "../main-script.js";

export const sideBarBtn = document.querySelector('#sideBarBtn');
const darkmodeBtn = document.getElementById('darkmodeBtn'); // reference to dark mode button

export function togggleSidebar() {

  function toggleSidebar() {
    mainContainer?.classList.toggle('collapsed');
  }

  // --- Keyboard shortcut ---
  window.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'enter') {
      // Ignore if focus is inside sidebar links
      if (sideBar.contains(e.target) && e.target.tagName === 'A') return;
      // IGNORE if focus is inside mainTargetDiv
      if (mainTargetDiv.contains(e.target)) return;

      mainContainer?.classList.toggle('collapsed');
    }
  });


  // --- Click on sidebar background (not links or darkModeBtn) ---
  sideBar.addEventListener('click', e => {
    // Ignore clicks on links
    if (e.target.closest('.sidebar-links-ul li a')) return;
    // Ignore clicks on dark mode button
    if (e.target.closest('#darkmodeBtn')) return;

    toggleSidebar();
  });

  // --- Click on navLessonTitle toggles sidebar ---
  navLessonTitle.addEventListener('click', toggleSidebar);
}
