import { mainAside } from "../js/side-sections-temp.js"
export function injectJsScripts(){
    const jsCanvasScriptContainer = document.querySelector('#jsCanvasScriptContainer')
    const jsParenCode = jsCanvasScriptContainer.querySelector(' #mainCode')
    // const tempScript = document.getElementById('tempScript')
    const titleJsScript = document.getElementById('titleJsScript')

    let injectScript = `./sections/${titleJsScript.textContent}`;
    loadScript(injectScript);
    
    
    function loadScript(injectScript) {
        // Fetch the JavaScript file content
        fetch(injectScript)
            .then(response => response.text())
            .then(data => {
                scrollTo(0,0)
                jsParenCode.innerHTML = data
                // // Remove old script elements if they exist
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data;
                
                // // Create and append new script element
                // document.removeChild(tempScript)                                
                const scriptContent = jsParenCode.textContent;

                const tempScript = document.createElement('script');
                tempScript.setAttribute('id', 'tempScript')
                tempScript.type = 'text/javascript';
                tempScript.textContent = scriptContent;
                tempScript.setAttribute('data-dynamic', 'true'); // Optional: mark as dynamic to easily remove later
                document.body.appendChild(tempScript);
            })
            .catch(error => console.error('Error loading script:', error));
    }
    
}
