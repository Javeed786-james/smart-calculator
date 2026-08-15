const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let firstNumber = "";
let operator = "";
let waitingForSecondNumber = false;

function calculate(firstNumber, secondNumber, operator) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);

    if (operator === "+") {
        return firstNumber + secondNumber;
    }

    if (operator === "-") {
        return firstNumber - secondNumber;
    }

    if (operator === "×") {
        return firstNumber * secondNumber;
    }

    if (operator === "÷") {
        if (secondNumber === 0) {
            return "Error";
        }
        return firstNumber / secondNumber;
    }

    if (operator === "%") {
        return firstNumber % secondNumber;
    }
}

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        // Numbers and decimal
        if (!isNaN(value) || value === ".") {

            if (value === "." && display.value.includes(".")) {
                return;
            }

            if (display.value === "0" || waitingForSecondNumber) {
                display.value = value;
                waitingForSecondNumber = false;
            } else {
                display.value += value;
            }

            return;
        }

        // Clear
        if (value === "C") {
            display.value = "0";
            firstNumber = "";
            operator = "";
            waitingForSecondNumber = false;
            return;
        }

        // Backspace
        if (value === "←") {
            display.value = display.value.slice(0, -1);

            if (display.value === "" || display.value === "-") {
                display.value = "0";
            }

            return;
        }

        // Operators
        if (
            value === "+" ||
            value === "-" ||
            value === "×" ||
            value === "÷" ||
            value === "%"
        ) {

            if (firstNumber !== "" && operator !== "" && !waitingForSecondNumber) {
                const result = calculate(
                    firstNumber,
                    display.value,
                    operator
                );

                display.value = result;
                firstNumber = result;
            } else {
                firstNumber = display.value;
            }

            operator = value;
            waitingForSecondNumber = true;

            return;
        }

        // Equal
        if (value === "=") {

            if (firstNumber === "" || operator === "" || waitingForSecondNumber) {
                return;
            }

            const secondNumber = display.value;

            const result = calculate(
                firstNumber,
                secondNumber,
                operator
            );

            display.value = result;

            firstNumber = "";
            operator = "";
            waitingForSecondNumber = false;
        }

    });
    document.addEventListener("keydown", event => {

    const key = event.key;

    if (
        !isNaN(key) ||
        key === "." ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ) {

        const buttons = [...document.querySelectorAll("button")];

        let button;

        if (key === "*") {
            button = buttons.find(btn => btn.textContent === "×");
        } else if (key === "/") {
            button = buttons.find(btn => btn.textContent === "÷");
        } else {
            button = buttons.find(btn => btn.textContent === key);
        }

        if (button) {
            button.click();
        }
    }

    if (key === "Enter") {
        document.querySelector("button:last-child").click();
    }

    if (key === "Escape") {
        buttons[0].click();
    }

    if (key === "Backspace") {
        buttons[3].click();
    }
});

});