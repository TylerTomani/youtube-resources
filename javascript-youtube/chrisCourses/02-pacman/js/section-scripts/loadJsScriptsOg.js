
export function injectJsScripts(){
    // let injectScript = `./js/canvas-js-scripts/03-js-drawMove.html`;
    let injectScript = `./js/canvas-js-scripts/03-js-drawMove.js`;
    const jsCanvasScriptContainer = document.querySelector('#jsCanvasScriptContainer')
    const jsParenCode = jsCanvasScriptContainer.querySelector(' #mainCode')
    const tempScript = document.getElementById('tempScript')

    loadScript(injectScript);
    
    function loadScript(injectScript) {
        // Fetch the JavaScript file content
        fetch(injectScript)
            .then(response => response.text())
            .then(data => {
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
