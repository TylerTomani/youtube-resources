// stepTxtFocus.js

// import { navLessonTitle } from "../core/inject-content.js";
// import { mainTargetDiv } from "../core/index.js";
// import { sideBarLinks } from "../core/inject-content.js";
// import { togggleSidebar } from "../ui/toggle-sidebar.js";
// import { lastClickedLink } from "./keyboard-nav.js";
export let lastStep = null
export let stepFocused

export function stepTxtsFocus(key,sidebarLinks,mainContainer,mainTargetDiv) {
    // const mainContainer = document.querySelector('.main-container')
    // const videos = document.querySelectorAll('video');
    const allVideos = document.querySelectorAll('video')
    let currentVideo
    let isPlaying = false
    const stepStepVids = document.querySelectorAll('.step-vid')
    const steps = document.querySelectorAll('.steps-container > .step ,.steps-container > .step-float , .step-col3')
    // Maybe just keep text area with focus
    const copyCodes = document.querySelectorAll('.copy-code')
    const imgVids = document.querySelectorAll('.step-img > img, .step-vid > video')
    const allImgs = document.querySelectorAll('.step-img > img')
    // const navLessonTitleH1 = navLessonTitle.querySelector('h1')
    // const hiddenH3 = document.querySelector('.header-codeColor-lesson h3')
    const nxtLessonBtn = document.querySelector('#nxtLessonBtn')
    const sideBar = document.querySelector('main > .side-bar')
    let currentWidth
    let sideBarLinksFocused = false
    // navLessonTitle.innerText = hiddenH3.innerText
    currentWidth = innerWidth
    addEventListener('resize', e => { currentWidth = innerWidth })
    let mainTargetDivFocused = false
    allVideos.forEach(vid => {
        vid.addEventListener('click', (e) => {
            if (e.target.tagName === 'VIDEO') {
                const video = e.target;
                if (video.paused) {
                    video.play();
                    video.style.border = "2px solid blue";
                    vid.classList.add('enlarge-vid')
                } else {
                    video.pause();
                    vid.classList.remove('enlarge-vid')
                    // video.style.border = "2px solid lime";
                }
            }
        });
    });
    
    // mainTargetDiv.addEventListener('keydown', e => {
    //     let letter = e.key.toLowerCase()
    //     if (letter == 'm' && lastStep) {
    //         // lastStep.focus()
    //     }
    //     mainTargetDivFocused = true
    // })
    // mainTargetDiv.addEventListener('focus', e => { mainTargetDivFocused = true })
    // mainTargetDiv.addEventListener('focusin', e => {
    //     sideBarLinksFocused = false
    //     mainTargetDivFocused = true
    // })
    // mainTargetDiv.addEventListener('focusout', e => {
    //     denlargeAllImages()
    //     denlargeAllVideos()
    // })

    sidebarLinks.forEach(el => {
        el.addEventListener('focus', e => {
            sideBarLinksFocused = true
            mainTargetDivFocused = false
        })
    })
    allImgs.forEach(img => {
        img.addEventListener('click', e => {
            if (e.target.tagName == 'IMG') {
                // denlargeAllImages()
                e.preventDefault()
                e.target.classList.toggle('enlarge')
            }
        })
    })
    copyCodes.forEach(el => {
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if (letter == 'enter') {
                e.stopPropagation()
                const step = getStep(e.target.parentElement)
                const vid = step.querySelector('video')
                // if(vid){
                //     if(!vid.classList.contains('enlarge-vid')){
                //         // console.log('no class')
                //         // vid.style.zIndex = '0'
                //         // e.target.style.zIndex = '100 !important'
                //         // console.log(e.target)

                //     }
                // }
                toggleImg(e)
            }
        })
        el.addEventListener('focus', e => {
            denlargeAllVideos()
            denlargeAllImages()
        })
    })
    steps.forEach(el => {
        el.addEventListener('focus', e => {
            lastStep = e.target
            pauseAllVideos()
            removeAllTabIndexes()
            denlargeAllImages()
        })
        el.addEventListener('click', e => {
            const step = getStep(e.target)
            if (step) {
                if (e.target.tagName == 'IMG') {
                    // console.log(e.target)
                    return
                }
                const images = document.querySelectorAll('img') ? document.querySelectorAll('img') : document.querySelectorAll('video')
                denlargeAllImages()
            }
        })

        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            let key = e.keyCode
            if (letter == 'enter') {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })
                toggleImg(e)
                addTabIndexes(e)
                togglePlayVidSize(e)
            }

        })
    })
    const stepImageIndexes = new WeakMap();

    

    function addTabIndexes(e) {
        const tabEls = e.target.querySelectorAll('.copy-code, textarea')
        tabEls.forEach(el => {
            el.setAttribute('tabindex', '0')
        })
    }
    function removeAllTabIndexes() {
        copyCodes.forEach(el => {
            el.setAttribute('tabindex', '-1')
        })
    }
    
    addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if (e.metaKey && letter == 'c') {
            e.preventDefault()
            return
        }
        if (letter == 'm') {
            
            // if (lastStep) {
            //     lastStep.focus()
            // }
            // if (e.target == lastStep) {
            //     mainTargetDiv.focus()
            //     window.scrollTo(0, 0)
            // }
        }
        if (!e.metaKey && (e.shiftKey && letter == 'c')) {
            // e.preventDefault()
            // const enterConsole = document.querySelector('#enterConsole')
            // if(enterConsole){
            //     enterConsole.focus()
            // } else{

            //     const chagGpt = document.querySelector('#chatGpt')
            //     chagGpt.scrollIntoView({behavior: 'smooth', block: 'center'})
            // }
        }
        if (sideBar.classList.contains('deactive')) {
            mainTargetDivFocused = true
        }
        if (!isNaN(letter) && mainTargetDivFocused) {
            if (mainTargetDivFocused) {
                let intLet = parseInt(letter)
                if (intLet <= steps.length) {
                    steps[intLet - 1].scrollIntoView({behavior: 'instant', block: 'bottom'})
                } else {
                    nxtLessonBtn.focus()
                }
            }
        }
        if (letter == 'enter') {
            if (sideBar.classList.contains('deactive')) {
                mainTargetDiv.classList.add('overflowX-none')
            }
        }
    })

    function pauseAllVideos() {
        allVideos.forEach(el => {
            el.pause()

        })
    }
    function denlargeAllVideos() {
        allVideos.forEach(el => {
            el.style.border = 'none'
            el.classList.remove('enlarge-vid')
        })
    }
    nxtLessonBtn.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if (letter == 'm') {
            // mainTargetDiv.focus()
            // scrollTo(0, 0)

        }
        if (letter == 'enter') {
            if (sideBar.classList.contains('deactive')) {
                sideBar.classList.remove('deactive')
                sideBar.classList.add('active')
            }
            let iSideBarLinks = [...sidebarlinks].indexOf(lastClickedLink)
            iSideBarLinks = (iSideBarLinks + 1) % sideBarLinks.length
            sideBarLinks[iSideBarLinks].focus()
            window.scrollTo({
                top: 0,
                behavior: "smooth" // makes it animate on mobile too
            });
        }
    })
    nxtLessonBtn.addEventListener('click', e => {
        if (sideBar.classList.contains('deactive')) {
            sideBar.classList.remove('deactive')
            sideBar.classList.add('active')
        }
        let iSideBarLinks = [...sideBarLinks].indexOf(lastClickedLink)
        iSideBarLinks = (iSideBarLinks + 1) % sideBarLinks.length
        sideBarLinks[iSideBarLinks].focus()
        window.scrollTo({
            top: 0,
            behavior: "smooth" // makes it animate on mobile too
        });
    })
}
export function getStep(parent) {
    // if(parent.classList.contains('step')){
    if (parent.classList.contains('step') || parent.classList.contains('step-float')) {
        return parent
    } else if (parent.parentElement) {
        return getStep(parent.parentElement)
    } else {
        return null
    }
}
