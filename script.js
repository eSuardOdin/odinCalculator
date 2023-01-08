// Basic operations

const add      = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide   = (a, b) => a / b;

// Switch an expression to return computed
const operate = (a, b, operator) => {
    let res;
    switch (operator) {
        case "+":
            res = add(a, b);
            break;
        case "-":
            res = subtract(a, b);
           break;
        case "*":
            res = multiply(a, b);
            break;
        case "/":
            res = divide(a, b);
            break;
        default:
            break;
    }
    return res;
}

// buttons
const buttons = document.querySelectorAll('.btn');
console.log(buttons);

buttons.forEach((el) => {
    el.addEventListener('click', () => console.log(el.getAttribute('value')));
})

// buttons.addEventListener('click', (e) => console.log(e.value))