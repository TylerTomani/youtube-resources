const allIdEls = document.querySelectorAll('[id]')
let iLetter
let letterIds = []
let currentLetter
let currentEl
const resources = document.querySelectorAll('.dropResource')
const topics = document.querySelectorAll('.topic')
let started = false
let rFocus = true
let tFocus = false
let currentResourceFocus = false
let currentFocused 
addEventListener('DOMContentLoaded', e  => {
    const allIdEls = document.querySelectorAll('[id]')    
});
resources.forEach(el => {
    el.addEventListener('focus', e => {
        rFocus = true
        tFocus = false
        currentResourceFocus = true
        currentFocused = e.target
        started = true
    })
})
topics.forEach(el => {
    el.addEventListener('focus', e => {
        started = true
    });
})
function resourcesFocus(e,letter){
    if(isNaN(letter)){
        resources.forEach(el => {
            if(letter == el.id[0]){
                el.focus()
            }
        })
    } else if(!isNaN(letter) && !currentResourceFocus){
        const intLet = parseInt(letter)
        if(resources.length >= 0 && intLet > 0){
            resources[intLet - 1].focus()
        }
    }
    // console.log(resources[0])
}
function topicsFocus(e,letter){
    // When dropResource has focus, allow numbers to focus to numbered topic
    const rContainer = getResourceContainer(e.target.parentElement)
    if(rContainer){
        const topics = rContainer.querySelectorAll('.topics-container > .topic')
        if (!isNaN(letter)) {
            const intLet = parseInt(letter)
            if(intLet){
                if (topics && !topics[intLet - 1].classList.contains('hide') 
                    ){
                        // console.log(rContainer)
                        console.log(topics[intLet-1])
                    topics[intLet - 1].focus()
                }
            }
        }
    }
}
function getResourceContainer(parent){
    if(parent.classList.contains('resource-container')){
        return parent
    } else if (parent.parentElement){
        return getResourceContainer(parent.parentElement)
    } else {
        return null
    }
}
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    switch (letter) {
        case 'h':
            const homelink = document.querySelector('#homelink')
            homelink.focus()
            break
        case 'b':
            const backlink = document.querySelector('#backlink')
            backlink.focus()
            break
        case 't':
            const tutorialLink = document.querySelector('#tutorialLink')
            tutorialLink.focus()
            break
    }
    if(!started){
        if(!isNaN(letter)){
            const intLet = parseInt(letter)
            topics.forEach(el => {
                if(!el.classList.contains('hide')){
                    topics[intLet - 1].focus()
                }
            })

        }

    }
    if (rFocus) {
        resourcesFocus(e, letter)
    }
    if (currentResourceFocus) {
        topicsFocus(e, letter)
    }
    topics.forEach(el => {
        if (!el.classList.contains('hide')) {
            // console.log(el)
            currentResourceFocus = true
        }
    })
    letterIds = []
    if (letter == 'h') {
        scrollTo(0, 0)
    }


    allIdEls.forEach(el => {
        if (letter == el.id[0].toLowerCase() && !el.classList.contains('hide')) {
            letterIds.push(el)
        }
    })
    console.log(letterIds)
    if (letterIds) {
        if (currentLetter == letter) {
            iLetter = (iLetter + 1) % letterIds.length

            if(letterIds.length>0 && iLetter <= letter.length){
                letterIds[iLetter].focus()
            }

        } else if (letterIds.length > 0) {
            iLetter = 0
            letterIds[0].focus()
        }
    }
    currentLetter = letter
    currentEl = e.target
});