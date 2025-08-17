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
      // Ignore if focus is on a link inside the sidebar
      if (sideBar.contains(e.target) && e.target.tagName === 'A') return;
      // Ignore dark mode button
      if (document.activeElement === darkmodeBtn) return;

      toggleSidebar();
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
