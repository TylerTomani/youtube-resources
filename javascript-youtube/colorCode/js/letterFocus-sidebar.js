export let mainContentFocused = false;
document.addEventListener('DOMContentLoaded', () => {
    const aside = document.querySelector('aside');
    const sideBarBtn = document.getElementById('sideBarBtn');
    let sidebarLinks = document.querySelectorAll('aside.side-bar ul > li > a');
    const mainContent = document.querySelector('.main-content');
    let currentLinkIndex = 0;
    let lastFocusedLink = null;
    let lastClickedLink = null 
    let sidebarLinksFocused = false;
    sidebarLinks = [...sidebarLinks]
    // Track focus state of the sidebar
    sidebarLinks.forEach((el, i, arr) => {        
        el.addEventListener('focusin', e => {
            sidebarLinksFocused = true;
            currentLinkIndex = arr.indexOf(el)
            
        });
        el.addEventListener('focusout', () => {
            sidebarLinksFocused = false;
            lastFocusedLink = ''
        });
        el.addEventListener('keydown', (e) => {
            let letter = e.key.toLowerCase()
            if(letter == 'enter'){
                lastClickedLink = e.target
                injectContent(e);   
            }
        });
    })
    mainContent.addEventListener('focusin', () => {mainContentFocused = true;});
    mainContent.addEventListener('focusout', () => {mainContentFocused = false;});
    // Toggle sidebar active state
    function toggleSidebar() {
        const sidebar = document.querySelector('aside.side-bar');
        sidebar.classList.toggle('active');
    }

    // Focus on the next or previous link
    /* next if false when shift is pressed down*/
    function focusSidebarLink(next = true) {
        if (sidebarLinks.length === 0) return;

        currentLinkIndex = next
            ? (currentLinkIndex + 1) % sidebarLinks.length
            : (currentLinkIndex - 1 + sidebarLinks.length) % sidebarLinks.length;

        sidebarLinks[currentLinkIndex].focus();
    }

    // Inject link content into main-content
    function injectContent(event) {
        event.preventDefault();
        const targetLink = event.target;
        const href = targetLink.getAttribute('href');

        fetch(href)
            .then(response => response.text())
            .then(html => {
                mainContent.innerHTML = html;
                if (targetLink.dataset.clickedOnce) {
                    mainContent.focus();
                } else {
                    targetLink.dataset.clickedOnce = true;
                    setTimeout(() => delete targetLink.dataset.clickedOnce, 500);
                }
            })
            .catch(err => {
                console.error('Failed to load content:', err);
            });
    }

    // Keydown event listener
    document.addEventListener('keydown', (e) => {
        const letter = e.key.toLowerCase();
        if (letter === 's') {
            e.preventDefault();
            sideBarBtn.focus();
        }
        if (letter === 'a') {
            e.preventDefault();
            // Navigate within the sidebar links
            const isShiftPressed = e.shiftKey;
            if (lastClickedLink && !sidebarLinksFocused) {
                lastClickedLink.focus();
            } else {
                focusSidebarLink(!isShiftPressed);
                sidebarLinks[currentLinkIndex].focus(); // Default to the current index
            }
            if (sidebarLinksFocused) {
                // Return focus to the last clicked sidebar link
            }
        } else {
            elIdsFocus(e);
        }
        if (!mainContentFocused ){
            // 
            if(!isNaN(letter)){
                e.preventDefault()
                let intLet = parseInt(letter)
                if(intLet <= sidebarLinks.length){
                    sidebarLinks[intLet - 1].focus()
                }
            }
        }
    });

    // Event listeners for sidebar button and links
    sideBarBtn.addEventListener('click', toggleSidebar);
    sideBarBtn.addEventListener('keydown', (e) => {
        let letter = e.key.toLowerCase()
        if (letter === 'enter') {
            toggleSidebar();
        }
        if(lastFocusedLink && (letter == 'a')){
            lastFocusedLink.focus()
        }
    });
    sidebarLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            injectContent(e);
            if(e.target == lastFocusedLink){
                mainContent.focus()
            }
            lastFocusedLink = e.target; // Store the last clicked link
            currentLinkIndex = index;  // Update the current index
        });
    });

    // Focus elements by their ID's first letter

    function elIdsFocus(e) {
        const letter = e.key.toLowerCase();
        const elIds = document.querySelectorAll('[id]');
        elIds.forEach(el => {
            if (letter === el.id[0]) {
                el.focus();
            }
            if (letter === 'm') {
                scrollTo(0, 0);
            }
        });
    }
});
