const display = document.getElementById("display");
const clear = document.getElementById("clear");
const equals = document.getElementById("equals");
const numButtons = Array.from(document.getElementsByClassName("btn"));

let previousInput = "";
let currentInput = "";
let operator = "";

// Function to update the display
function updateDisplay() {
    display.value = currentInput || previousInput || "0";
}

// Add event listener to number buttons
numButtons.forEach(numButton => {
    numButton.addEventListener("click", (e) => {
        const value = e.target.getAttribute('data-value');
        
        // Check if the clicked button is an operator
        if (["-", "+", "/", "*"].includes(value)) {
            if (currentInput) {
                previousInput = currentInput;
                currentInput = "";
            }
            operator = value;
        } else if (value === "C") {
            // Clear all inputs
            currentInput = "";
            previousInput = "";
            operator = "";
        } else if (value === "=") {
            // Calculate the result
            calculate();
        } else {
            // For numbers, append the value to currentInput
            currentInput += value;
        }
        updateDisplay();
    });
});

// Function to perform calculation
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = "";
    previousInput = "";
}

// Add event listener to clear button
clear.addEventListener("click", () => {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay();
});

// Add event listener to equals button
equals.addEventListener("click", () => {
    calculate();
    updateDisplay();
});
