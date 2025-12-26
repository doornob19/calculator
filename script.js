const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", calculator);
});

const display = document.querySelector("#display");
let displayText = "";

function calculator(e) {
    // If a number is clicked
    if (e.target.classList.contains("number")) {
        numberClicked = e.target.innerText
        display.innerText += numberClicked;
    }

    // If an operator (% . + - * / =) is clicked
    else if (e.target.classList.contains("operator")) {

    }

    // If C or AC is clicked
    else {

    }
}
