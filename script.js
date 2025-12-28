let firstOperand = null;
let operator = null;
let shouldReset = true; // Should the next number clicked reset display
let isError = false;

const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener("click", onClick);
});

// Animate hovering over button
buttons.forEach((button) => {
    button.addEventListener("mouseenter", (e) => {
        e.currentTarget.style.opacity = 0.7;
        e.currentTarget.style.borderWidth = "3.5px";
    });
});

buttons.forEach((button) => {
    button.addEventListener("mouseout", (e) => {
        e.currentTarget.style.opacity = 1;
        e.currentTarget.style.borderWidth = "2px";
    });
});

//---------------------------- Calculator logic ----------------------------
function onClick(e) {
    const btn = e.currentTarget;

    if (isError) {
        if (btn.id === "all-clear" || btn.id === "clear") {
            display.textContent = "0";
            resetState();
            return;
        }
        if (btn.classList.contains("number")) {
            display.textContent = btn.textContent;
            resetState();
            shouldReset = false;
            return;
        }

        return;
    }

    if (btn.classList.contains("number")) {
        if (shouldReset) {
            display.textContent = "";
            shouldReset = false;
        }
        display.textContent += btn.textContent;
        return;
    }

    if (btn.id === "all-clear") {
        display.textContent = "0";
        resetState();
        return;
    }
    
    if (btn.id === "clear") {
        backspaceDisplay();
        return;
    }

    if (btn.id === "dot") {
        handleDot();
        return;
    }

    if (btn.classList.contains("operator")) {
        handleOperator(btn.dataset.op);
    }
}

//---------------------------- Helper functions ----------------------------

function handleOperator(op) {
    const currentNumber = Number(display.textContent);

    // = pressed
    if (op === "=") {
        if (firstOperand === null || operator === null) return;
        const result = operate(firstOperand, operator, currentNumber);
        if (result === "Error") {
            setError();
            return;
        }
        display.textContent = String(result);
        firstOperand = null;
        operator = null
        shouldReset = true;
        return;
    }

    // normal operator pressed but theres only 1 number
    if (firstOperand === null) {
        firstOperand = currentNumber;
        operator = op;
        shouldReset = true;
        return;
    }

    // if consecutive operators pressed, replace the prev one
    if (shouldReset) {
        operator = op;
        return;
    }

    const result = operate(firstOperand, operator, currentNumber);
    if (result === "Error") {
        setError();
        return;
    }
    operator = op;
    firstOperand = result;
    display.textContent = String(result);
    shouldReset = true;
}

function handleDot() {
    // Handle clicking dot right after an operator
    if (shouldReset) {
        display.textContent = "0";
        shouldReset = false;
    }

    // only 1 dot allowed
    if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
}

function operate(num1, op, num2) {
    if (op === '+') return num1 + num2;
    if (op === '-') return num1 - num2;
    if (op === '*') return num1 * num2;
    if (op === '/') return num2 === 0 ? "Error": num1 / num2;
    if (op === '%') return num1 % num2;
    return num2;
}

function setError() {
    display.textContent = "Error";
    firstOperand = null;
    operator = null;
    shouldReset = true;
    isError = true;
}

function resetState() {
    firstOperand = null;
    operator = null;
    shouldReset = true;
    isError = false;
}

function backspaceDisplay() {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === "") display.textContent = "0";
}