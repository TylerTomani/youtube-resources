const scriptsContainer = document.querySelector('#scriptsContainer')
const parentCopyCode = document.querySelector('.code-container > pre.copy-code')
const titleTxt = document.querySelector('#title-txt')
const partTitle = document.getElementById('partTitle')
let scriptHasFocus = false
const canvasEl = document.querySelector('canvas')
const footer = document.querySelector('footer')
const main = document.querySelector('main')
const nxtBtn = document.getElementById('next')
const prevBtn = document.getElementById('prev')
const arrScripts = ['part1.html', 'part2.html', 'part3.html','part4.html','part5.html',
    'part6.html', 'part7.html', 'part8.html', 'fullcode.js', 'fullcode-tap.js']
let iScript = 9
let injectScript, htmlScript
const currentScript = document.getElementById('currentScript')

// let tempIndex = 0

injectScript = `./scripts-html/${arrScripts[iScript]}`
loadScript(injectScript);
displayPartTitle(iScript );
// Don't use this when not working on it
addEventListener('DOMContentLoaded', () =>{
    // if(tempIndex){
    //     iScript = tempIndex
    // } else {
    //     iScript = 0
    // }
    // injectScript = `./scripts-html/${arrScripts[iScript - 1]}`
    // loadScript(injectScript);
    // displayPartTitle((iScript  -1))    
})
// ?///////////////////////////////////

const keys = {
    shift :{
        pressed: false
    },
    command :{
        pressed: false
    }
}
function togglePopup(){
    if(!scriptsContainer.classList.contains('popup')){
        scriptsContainer.classList.add('popup')
        scrollTo(0,0)
    } else {
        scriptsContainer.classList.remove('popup')
        // scriptsContainer.scrollIntoView()
    }
}
function removePopup(){
    if (scriptsContainer.classList.contains('popup')) {
        scriptsContainer.classList.remove('popup')
    }
}
function addPopup(){
    if (!scriptsContainer.classList.contains('popup')) {
        scriptsContainer.classList.add('popup')
    }
}
scriptsContainer.addEventListener('focusout', e => {scriptHasFocus = false})
scriptsContainer.addEventListener('focusin', e => {scriptHasFocus = true})
addEventListener('keyup', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'shift'){keys.shift.pressed = false}
    if(letter == 'meta'){keys.command.pressed = false}
})
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'shift'){keys.shift.pressed = true}
    if(letter == 'meta'){keys.command.pressed = true}
    if(letter == 'p' && keys.shift.pressed){
        togglePopup()        
    }
    if(letter == 'c' && !keys.command.pressed){
        canvasEl.focus()
    }
    if(letter == 'f' && !keys.command.pressed){
        footer.focus()
    }
    if(letter == 's' && keys.shift.pressed){parentCopyCode.focus()}
    if(scriptHasFocus){
        const innerCopyCodes = parentCopyCode.querySelectorAll('.copy-code')
        if(!isNaN(letter)){
            let intLet = parseInt(letter)
            if(innerCopyCodes.length > 0){
                if (intLet <= innerCopyCodes.length){
                    innerCopyCodes[intLet-1].focus()
                } else {
                    parentCopyCode.focus()
                }
            }
        }   
    }
})

nxtBtn.addEventListener('click', e => {
    iScript = (iScript + 1) % arrScripts.length
    htmlScript = arrScripts[iScript]
    htmlScript = `./scripts-html/${htmlScript}`
    loadScript(htmlScript)
    displayPartTitle(iScript)
})
prevBtn.addEventListener('click', e => {
    iScript = (iScript - 1 + arrScripts.length) % arrScripts.length
    htmlScript = arrScripts[iScript]
    htmlScript = `./scripts-html/${htmlScript}`
    loadScript(htmlScript)
    displayPartTitle(iScript)
})
function loadScript(injectScript) {
    // Fetch the JavaScript file content
    fetch(injectScript)
        .then(response => response.text())
        .then(data => {
            parentCopyCode.innerHTML = data;
            // Extract script content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;
            const scriptContent = parentCopyCode.textContent;            
            // Remove old script elements if they exist

            // Create and append new script element
            const newScriptElement = document.createElement('script');
            newScriptElement.type = 'text/javascript';
            newScriptElement.textContent = scriptContent;
            newScriptElement.setAttribute('data-dynamic', 'true'); // Optional: mark as dynamic to easily remove later
            document.body.appendChild(newScriptElement);
        })
        .catch(error => console.error('Error loading script:', error));
}

function displayPartTitle(iScript){
    iScript += 1
    footer.innerHTML = ``
    titleTxt.innerHTML = ``
    switch (iScript){
        case 1:
            partTitle.innerText = 'part 1 - draw player'
            addPopup()
            break
        case 2:
            partTitle.innerText = 'part 2 - gravity'
            break
        case 3:
            partTitle.innerText = 'part 3 - player movement'
            break
        case 4:
            partTitle.innerText = 'part 4 - platform'
            break
        case 5:
            partTitle.innerHTML = `part 5 - platform(s) & screen move
            <br> win screen `
            footer.innerHTML = `<p> Once the player moves 5,000 pixels to the right 
            make win screen for now, using <code class='gr'>scrolOffset</code>
            to track player position
            </p>
            <p> Set the value of <code class='gr'>scrollOffset</code> inside 
            <code class='lsg'> if(keys.right.pressed)</code> and <code class='lsg'> if(keys.left.pressed) </code>
            += and -= the same value as the player <code class='m'> playerSpeed</code>
            </p>
            <p> add conditional at bottom of <code>animate()</code>
            <br>
            <code class='r-fix'>if(<span class='gr'>scrollOffset</span> > 5000){
            <br>
            &emsp;console.log('you win')
            <br>
            }
            `
            removePopup()
            break
        case 6:
            // partTitle.innerText = ''
            partTitle.innerHTML = `part 6 - use Sprites <br> 
            <span class='r'> lost down movement'</span>`
            titleTxt.innerHTML = `
                <p> You need a server to use images and spirtes, 
                Follow instructions at the bottom of page</p>
                <p>
                I altered the code a seperated Ground from Platform
                </p>
            `
            footer.innerHTML = `
            <h3>Using Images</h3>
        <p>
            If you are not using a server like live server in Vs Code, you can NOT load images.
            Go to,
                            watch video <a tabindex="0" target="_blank" href="https://youtube.com/clip/Ugkx1oYLBfNBt8WfOx1z9LZIthsXoaYD0Fna?si=7HDAzxioE74YTUNI">video</a>
            to see
        </p>
        <p>
            import the images at the top 
            <br><code class='g'>import platform from './img/platform.png'</code>
            <br><code class='g'>import background from './img/background.png'</code>
            <br><code class='g'>import hills from './img/hills.png'</code>
        </p>
        <p>
            Make new class for <code class='gr'>Ground</code> and assign platform img to,
        
         use a <code class='o'>image</code>
            and the <code class='m'>c.drawImage()</code> instead
        </p>
        <p>
            Create new array for ground,  Make it so player cannot go below the top of ground in animate().
            
        </p>
               
        `
            removePopup()
            break
        case 7:
            partTitle.innerText = 'part 7- background move'
            footer.innerHTML = `<p>Add background images and background speed, 
            Create a <span class="lsg">GenericObject</span> and <span class='y">
            backgroundImages [] array </span> 
            and create a function that
            <br> returns an image instead <span class='b'>createImage(<span class='y'>imgSrc</span>)</span>
            </p>
            
            `
            removePopup()
            break
        case 8:
            partTitle.innerHTML = 'part 8- init() restart when lost <br> stop left scroll offsecreen, '
            footer.innerHTML = `<p>
            Put the intial creation of image elements in a <span class="b-fix">init()</span>
            function, but declare the image variables as let before the function, call the 
            <span class="b-fix">init()</span> before animate. At the bottom of animate, add a loose condition,
            <span class="r-fix">if(player.position.y > canvas.height)
            and place the <span class="b-fix">init()</span> function in it
            </p>
            <p> 
            <p>
            Also, <span class="m">stop the player from moving left past the screen</span> in animate
            </p>
            `
            removePopup()
            break
        case 9:
            partTitle.innerHTML = `9- Full Code Go back and add player movement sprites
             <br>at a later time `
            removePopup()
            break
        case 10:
            partTitle.innerHTML = `10-(Full Code Tap) Go back and add sprite movement
            <br> <span class='r'> Fix Logic for mouse down and up</span>`

            removePopup()
            break
    }
}