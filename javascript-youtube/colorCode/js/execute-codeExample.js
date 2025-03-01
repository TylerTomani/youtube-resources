export function executeCodeExample() {

        document.querySelectorAll(".step").forEach(step => {
            const button = step.querySelector(".run-btn");
            const textarea = step.querySelector(".copy-code");
            const stepConsole = step.querySelector(".console");

            if (!button || !textarea || !stepConsole) return; // Ensure elements exist

            function runCode() {
                stepConsole.innerHTML = ""; // Clear previous output

                const originalConsoleLog = console.log;
                console.log = function (...args) {
                    // Convert arguments into a string and add <br> for each new line
                    const output = args.map(arg => (arg === undefined ? "undefined" : arg)).join(" ");
                    stepConsole.innerHTML += output + "<br>"; // Append each log on a new line
                    originalConsoleLog.apply(console, args);
                };

                try {
                    const result = new Function(textarea.value)(); // Run user inputted code
                    if (result !== undefined) {
                        stepConsole.innerHTML += result + "<br>"; // Display return values if any
                    }
                } catch (error) {
                    stepConsole.innerHTML += "Error: " + error.message + "<br>";
                }

                console.log = originalConsoleLog; // Restore console.log
            }

            button.addEventListener("click", runCode);
            button.addEventListener("touchstart", runCode)
            textarea.addEventListener("keydown", function (event) {
                if (((event.metaKey || event.ctrlKey) && event.shiftKey) && event.key === "Enter") {
                    console.log('go')
                    event.preventDefault();
                    runCode();
                }
                if ( !event.shiftKey && (event.metaKey || event.ctrlKey) && event.key === "Enter") {
                    event.preventDefault(); // Prevent the default action

                    // Get the current cursor position
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;

                    // Insert a newline at the cursor position (preserves undo history)
                    textarea.setRangeText("\n", start, end, "end");
                }
            });
        });

}
executeCodeExample()