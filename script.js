/* 
----- DOM -----
*/
// buttons
const buttons = document.querySelectorAll('.btn');
const deleteBtn = document.querySelector('.delete');
const clearBtn = document.querySelector('.clear');

// Screen
const resultScreen = document.querySelector('.result');
const operationScreen = document.querySelector('.operation');



/*
----- Variables -----
*/
let expression = {
    'numberA' : '',
    'isDecimalA' : false,
    'numberB': '',
    'isDecimalB': false,
    'operator' : '',
    'total': '',
    'lastWrite': '',    // In order to delete a char
    'complete': false,
}

//reset

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
const operate = (exp) => {
    let res;
    switch (exp.operator) {
        case "+":
            res = add(Number(exp.numberA), Number(exp.numberB));
            break;
        case "-":
            res = subtract(Number(exp.numberA), Number(exp.numberB));
           break;
        case "x":
            res = multiply(Number(exp.numberA), Number(exp.numberB));
            break;
        case "/":
            res = divide(Number(exp.numberA), Number(exp.numberB));
            break;
        default:
            break;
    }
    return res;
}

// Clear expression
const clearExpression = (exp) => {
    exp.numberA = '';
    exp.numberB = '';
    exp.isDecimalA = false;
    exp.isDecimalB = false;
    exp.operator = '';
    exp.lastWrite = '';
    exp.total = '';

    resultScreen.innerText = '0';
    operationScreen.innerText = '0';
}

// Delete char
const deleteChar = (exp) => {
    switch (exp.lastWrite) {
        case 'numberA':
            exp.numberA = exp.numberA.slice(0, -1);
            break;
        case 'numberB':
            exp.numberB = exp.numberB.slice(0, -1);
            if(exp.numberB === '') exp.lastWrite = 'operator';
            break;
        case 'operator':
            // Delete operator
            exp.operator = '';
            exp.lastWrite = 'numberA';
            break;
        default:
            break;
    }
}



function updateNumber(exp, val, nb) {
    if (nb === "A") {
        // If first value is a dot
        if(val === "." && exp.numberA === '') exp.numberA = "0.";
        // If the number starts with 0, can't add a second
        else if (val === '0' && exp.numberA === '0') return;
        // If already 12 char long
        else if (exp.numberA.length === 12) return;
        else if (exp.numberA === '0') exp.numberA = val;
        else exp.numberA += val;
        exp.isDecimalA = (val === ".") ? true : exp.isDecimalA;
    } 
    else {
        // If first value is a dot
        if(val === "." && exp.numberB === '') exp.numberB = "0.";
        // If the number starts with 0, can't add a second
        else if (val === '0' && exp.numberB === '0') return;
        // If already 12 char long
        else if (exp.numberB.length === 12) return;
        else if (exp.numberB === '0') exp.numberB = val;
        else exp.numberB += val;
        exp.isDecimalB = (val === ".") ? true : exp.isDecimalB;
    }
    
}


const computeOperator = (exp, operator) => {
    if(exp.total !== '' && exp.numberA === '') {
        exp.numberA = exp.total;
        exp.total = '';
        exp.operator = operator;
    } else {
        exp.operator = operator;
    }
}

const updateExpression = (val, exp) => {
    console.log(`Value : ${val}`);
    // Return if the input is an operator and no number A yet
    if( val !== "." && isNaN(val) 
        && val !== '+'
        && val !== '-'
        && val !== 'x'
        && val !== '/'
        && val !== '='        
        ) return;

    //If no operator, and val is a number we're working on number A
    if(exp.operator === ''
        && val !== '+'
        && val !== '-'
        && val !== 'x'
        && val !== '/'
        && val !== '='  ) {
        console.log('Update nb A');
        updateNumber(exp, val, "A");
        // Last updated
        exp.lastWrite = "numberA"
    }
    else if ( // If val == operator and number B is empty, we're just updating exp.operator
            (val === '+' ||
            val === '-' ||
            val === '/' ||
            val === 'x')
            && exp.numberB === ''
        ) {
            console.log('Compute operator');
            computeOperator(val);
            exp.lastWrite = "operator"
    } 
    else if(exp.operator !== '') { // Working on number B
        console.log('Update nb B');
        updateNumber(exp, val, "B");
        // Last updated
        exp.lastWrite = "numberB"
    }

    if(val === "=" && exp.numberA !== '' && exp.numberB !== '') { // Triggering operation
        exp.total = operate(exp);
        exp.numberA = '';
        exp.operator = '';
        exp.numberB = '';
    } 
    else if (
        val === '+' ||
        val === '-' ||
        val === '/' ||
        val === 'x'
        && exp.numberA !== '' && exp.numberB !== ''
    ) {
        exp.total = operate(exp);
        exp.numberA = exp.total;
        exp.operator = val;
    }
    console.log(exp);
}

/*
----- Events -----
*/
buttons.forEach((el) => {
    el.addEventListener('click', () => {
        updateExpression(el.getAttribute('value'), expression);
        resultScreen.innerText = expression.total; 
        operationScreen.innerText = expression.numberA + expression.operator + expression.numberB;
    });
})

clearBtn.addEventListener('click', () => clearExpression(expression));
deleteBtn.addEventListener('click', () => {
    deleteChar(expression);
    resultScreen.innerText = expression.total; 
    operationScreen.innerText = expression.numberA + expression.operator + expression.numberB;
})


/*
----- Misc -----
*/
// console.log(buttons);