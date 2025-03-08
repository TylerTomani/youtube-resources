export let stepTextAreasCodeFocused = false
// export const stepTxt = document.querySelector('.step-txt')
export function stepTextAreasCodeFocus(){
    // console.log(stepTextAreasCodeFocused)
    let stepTextAreas = document.querySelectorAll('.step textarea, .code-container > .copy-code')
    stepTextAreas.forEach(el => {
        el.addEventListener('focusin', () => {
            stepTextAreasCodeFocused = true;
        });
        el.addEventListener('focusout', () => {
            stepTextAreasCodeFocused = false;
        });
    })
}


