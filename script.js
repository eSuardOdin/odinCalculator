/* 
----- DOM -----
*/
// buttons
const buttons = document.querySelectorAll('.btn');

// Screen
const resultScreen = document.querySelector('.result');
const operationScreen = document.querySelector('.operation');



/*
----- Variables -----
*/

// // Do numbers already are decimals
// let isDecA = false;
// let isDecB = false;

// // Is number already entered
// let isNbA = false;
// let isNbB = false;

// // Numbers
// const nbA = document.querySelector('.nbA');
// const nbB = document.querySelector('.nbB');
// let total = 0;

let expression = {
    'numberA' : '',
    'isDecimalA' : false,
    'numberB': '',
    'isDecimalB': false,
    'operator' : '',
    'total': 0,
    'lastWrite': ''    // In order to delete a char
}



/*
----- Functions -----
*/

// Round
const round = (nb, dec) => Math.round(nb * dec) / dec; 

// Basic operations

const add      = (a, b) => round((a + b), 1000);
const subtract = (a, b) => round((a - b), 1000);
const multiply = (a, b) => round((a * b), 1000);
const divide   = (a, b) => round((a / b), 1000);

// Switch an expression to return computed
const operate = (a, b, operator) => {
    let res;
    switch (operator) {
        case "+":
            res = add(Number(a), Number(b));
            break;
        case "-":
            res = subtract(Number(a), Number(b));
           break;
        case "x":
            res = multiply(Number(a), Number(b));
            break;
        case "/":
            res = divide(Number(a), Number(b));
            break;
        default:
            break;
    }
    return res;
}




const updateExpression = (val, exp) => {
    // Return if the input is an operator and no number A yet
    if( isNaN(val) && exp.numberA === "" ) return;

    if(exp.operator === '') { 
        //If no operator, and val is a number we're working on number A
        if((val === "." && !exp.isDecimalA) || !isNaN(Number(val)) ) {
            // If first value is a dot
            if(val === "." && exp.numberA.length === 0)  {
                exp.numberA += `0.`;
            }
            else exp.numberA += val;
            exp.isDecimalA = (val === ".") ? true : exp.isDecimalA;
        } else if ( // If operator and number B is empty, we're just updating exp.operator
            (val === '+' ||
            val === '-' ||
            val === '/' ||
            val === 'x')
            && exp.numberB === ''
        ) {
            exp.operator = val;
        } 
        
    } else if(exp.operator !== '') { // Working on number B
        if((val === "." && !exp.isDecimalB) || !isNaN(Number(val)) ) {
            exp.numberB += val;
            exp.isDecimalB = (val === ".") ? true : exp.isDecimalB;
        }
    }
    if(val === "=") { // Triggering operation
        exp.total = operate(exp.numberA, exp.numberB, exp.operator);
    }
    console.log(exp); 
}

/*
----- Events -----
*/
buttons.forEach((el) => {
    el.addEventListener('click', () => {
        updateExpression(el.getAttribute('value'), expression);
        resultScreen.innerText = String(expression.total); 
        operationScreen.innerText = expression.numberA + expression.operator + expression.numberB;
    });
})




/*
----- Misc -----
*/
// console.log(buttons);