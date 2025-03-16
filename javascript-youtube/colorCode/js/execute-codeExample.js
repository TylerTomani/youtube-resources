document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".step").forEach(step => {
            const button = step.querySelector(".run-btn");
            const textarea = step.querySelector(".copy-code");
            const stepConsole = step.querySelector(".console");

            if (!button || !textarea || !stepConsole) return; // Ensure elements exist

            function runCode() {
                stepConsole.innerHTML = ""; // Clear previous output
                const originalConsoleLog = console.log;
                console.log = function (...args) {
                    stepConsole.innerHTML += args.join(" ") + "\n";
                    originalConsoleLog.apply(console, args);
                };

                try {
                    new Function(textarea.value)(); // Run user inputted code
                } catch (error) {
                    stepConsole.innerHTML += "Error: " + error.message + "\n";
                }

                console.log = originalConsoleLog; // Restore console.log
                console.log('\n') // Restore console.log
            }

            button.addEventListener("click", runCode);

            textarea.addEventListener("keydown", function (event) {
                if (((event.metaKey || event.ctrlKey) && event.shiftKey) && event.key === "Enter") {
                    console.log('go')
                    event.preventDefault();
                    runCode();
                }
                // if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                //     event.preventDefault(); // Prevent the default action (e.g., form submission)

                //     // Get the current cursor position
                //     const start = textarea.selectionStart;
                //     const end = textarea.selectionEnd;

                //     // Insert a newline at the cursor position
                //     textarea.value = textarea.value.substring(0, start) + "\n" + textarea.value.substring(end);

                //     // Move the cursor to the new position
                //     textarea.selectionStart = textarea.selectionEnd = start + 1;
                // }
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
});
