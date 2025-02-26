// // let consoleLogMessage = "";

// // try {
// //     // This will cause a runtime error
// //     someUndefinedFunction();
// //     let variable1 = j 9909
// // } catch (error) {
// //     consoleLogMessage = error.message;
// //     console.log("Stored Error:", consoleLogMessage);
// // }


// window.onerror = function (message, source, lineno, colno, error) {
//     consoleLogMessage = message;
//     console.log("Captured error:", consoleLogMessage);
// };

// // Intentionally causing a syntax error (in an `eval` block to avoid stopping script execution)
// try {
//     eval("const brokenVar = 1 akj"); // Syntax error
//     // let variable1 = j 9909
// } catch (error) {
//     consoleLogMessage = error.message;
//     console.log("Caught Syntax Error:", consoleLogMessage);
// }

document.addEventListener("DOMContentLoaded", function () {
    const consoleDiv = document.querySelector(".console");
    const codeBlock = document.querySelector(".copy-code");

    codeBlock.addEventListener("keydown", function (event) {
        if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
            event.preventDefault(); // Prevent new line
            const code = codeBlock.innerText; // Get the text inside <pre>

            try {
                let result = eval(code); // Execute the code
                if (result === undefined) result = "Executed successfully.";
                consoleDiv.innerHTML = `<p style="color:green">${result}</p>`;
            } catch (error) {
                consoleDiv.innerHTML = `<p style="color:red">${error}</p>`;
            }
        }
    });
});