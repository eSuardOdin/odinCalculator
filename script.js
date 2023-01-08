/* 
----- DOM -----
*/
// buttons
const buttons = document.querySelectorAll('.btn');

// Screen
const inputScreen = document.querySelector('.input');
const operationScreen = document.querySelector('.operation');



/*
----- Variables -----
*/
// Is operande already entered
let isOperande = false;

// Do numbers already are decimals
let isDecA = false;
let isDecB = false;

// Is number already entered
let isNbA = false;
let isNbB = false;

// Numbers
const nbA = document.querySelector('.nbA');
const nbB = document.querySelector('.nbB');
let total = 0;

let expression = {
    'numberA' : '',
    'isDecimalA' : false,
    'numberB': '',
    'isDecimalB': false,
    'operande' : '',
    'total': ''
}

// Operande
let operande = '';


/*
----- Functions -----
*/
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



const updateExpression = (val, exp) => {
    if(exp.operande === '') { 
        //If no operande, and val is a number we're working on number A
        if((val === "." && !exp.isDecimalA) || !isNaN(Number(val)) ) {
            exp.numberA += val;
            exp.isDecimalA = (val === ".") ? true : exp.isDecimalA;
        } else if ( 
            (val === '+' ||
            val === '-' ||
            val === '/' ||
            val === '*')
            && exp.numberB === ''
        ) {
            exp.operande = val;
        } 
        
    } else if(exp.operande !== '') {
        if((val === "." && !exp.isDecimalB) || !isNaN(Number(val)) ) {
            exp.numberB += val;
            exp.isDecimalB = (val === ".") ? true : exp.isDecimalB;
        }
    }
    console.log(exp); 
}

/*
----- Events -----
*/
buttons.forEach((el) => {
    el.addEventListener('click', () => {
        updateExpression(el.getAttribute('value'), expression);
        inputScreen.innerText = expression.numberA + expression.operande + expression.numberB;
    });
})




/*
----- Misc -----
*/
// console.log(buttons);