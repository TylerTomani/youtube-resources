export let lastStep = null
let isMainActive = true // tracks which element 'm' should go to next

export function stepTxtsFocus(key, e, sidebar, mainContainer, mainTargetDiv) {
    const steps = mainTargetDiv.querySelectorAll('.steps-container > .step-float')

    // Update lastStep when a step gains focus
    steps.forEach(step => {
        step.addEventListener('focusin', () => {
            lastStep = step
            isMainActive = false // next 'm' press should go back to mainTargetDiv
        })
        if (!step.hasAttribute('tabindex')) {
            step.setAttribute('tabindex', '0')
        }

        
    })

    // Toggle 'm' between mainTargetDiv and lastStep
    if (key === 'm') {
    if (!isMainActive) {
        window.scrollTo(0, 0)
        mainTargetDiv.focus()
        isMainActive = true
    } else {
        if (lastStep) {
            setTimeout(() => {
                lastStep.focus()
                lastStep.scrollIntoView({ behavior: 'instant', block: 'center' })
            }, 0)
        }
        isMainActive = false
    }
}

    // Optional: number key to jump to step
    if (!isNaN(key)) {
        const index = parseInt(key, 10) - 1
        if (index >= 0 && index < steps.length) {
            steps[index].focus()
            lastStep = steps[index]
        }
    }
}
