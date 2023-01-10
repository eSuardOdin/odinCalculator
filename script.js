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



/**
 * Checks if an expression is computable (if number B is provided). Returns if not and compute if yes.
 * @param {expression} expression 
 * @returns 
 */
const computeEqual = (expression) => {
    if(expression.numberB === '') return;
    expression.total = operate(expression);
    expression.lastWrite = '';
    expression.numberA = '';
    expression.numberB = '';
    expression.isDecimalA = false;
    expression.isDecimalB = false;
    expression.operator = ''
    resultScreen.innerText = expression.total;
}



/**
 * Check if we're working on number A or B, if this number is already a decimal, 
 * just return, else it's updating 'expression.lastWrite' and adds a decimal were needed"
 * @param {expression} expression 
 * @returns 
 */
const computeDecimal = (expression) => {
    // If exp.operator is empty, we work on number A
    if(expression.operator === '') {
        if(expression.isDecimalA) {
            return; // If already a decimal
        }
        expression.lastWrite = 'numberA';
        expression.numberA += (expression.numberA === '') ? '0.' : '.';
        expression.isDecimalA = true;
        return;
    }
    
    // If not, we work on number B
    if(expression.isDecimalB) {
        return; // If already a decimal
    }
    expression.lastWrite = 'numberB';
    expression.numberB += (expression.numberB === '') ? '0.' : '.';
    expression.isDecimalB = true;
    return;
}





/**
 * Adds an operator to expression if there is none
 * Compute whole expression if there also is an operator 
 * and number B then adds total as number A and new operator 
 * as operator
 * @param {String} data 
 * @param {expression} expression 
 */
const computeOperator = (data, expression) => { 
    if(expression.numberA === '' && expression.operator === '') {
        if(expression.total === '') return;
        expression.numberA = expression.total;
        expression.operator = data;
        expression.isDecimalA = !(Number(expression.total) % 1 === 0); // Checks if total is decimal
        resultScreen.innerText = expression.total;
        expression.total = '';
    }
    else if(expression.operator !== '') {
        if(expression.numberB === '' && expression.lastWrite === "operator") return; // || if last write is operator?
        expression.total = operate(expression);
        expression.numberA = expression.total;
        expression.numberB = '';
        expression.isDecimalB = false;
        expression.operator = data;
        expression.isDecimalA = !(Number(expression.total) % 1 === 0);
        resultScreen.innerText = expression.total;
        expression.total = ''
    } else if (expression.numberA !== '' && expression.numberB === '') {
        expression.operator = data;
    }
    expression.lastWrite = 'operator';
}



/**
 * Router that checks if the data is an operator, a decimal point or an equal sign.
 * Calls to the adequate function
 * @param {String} data 
 * @param {expression} expression 
 */
const computeSymbol = (data, expression) => {
    if (data === '.') {
        computeDecimal(expression);
    }
    else if (
            data === '/' ||
            data === 'x' ||
            data === '+' ||
            data === '-'
    ) {
        computeOperator(data, expression);
    }
    else {
        computeEqual(expression);
    }
}



/**
 * Check wich expression.number it's working on and update it with data
 * @param {String} data 
 * @param {expression} expression 
 * @returns 
 */
const computeNumber = (data, expression) => {
    // If operator !empty, working on number B
    if(expression.operator !== '') {
        expression.numberB += data;
        expression.lastWrite = 'numberB';
        return;
    }
    // If total not already empty, we erase it
    if(expression.numberA === '' && expression.total !== '') {
        expression.lastWrite = 'numberA';
        expression.total = '';
    }
    expression.numberA += data;
}


/**
 * Evaluates if data is a number or a symbol, calls the appropriate function with it
 * @param {String} data 
 * @param {expression} expression 
 */
const evaluateData = (data, expression) => {
    if(isNaN(Number(data))) {
        computeSymbol(data, expression);
    } else {
        computeNumber(data, expression);
    }
    console.log(expression);
}




/*
----- Events -----
*/
buttons.forEach((el) => {
    el.addEventListener('click', () => {
        evaluateData(el.getAttribute('value'), expression);
        // resultScreen.innerText = expression.total; 
        operationScreen.innerText = expression.numberA + expression.operator + expression.numberB;
    });
})

clearBtn.addEventListener('click', () => clearExpression(expression));
deleteBtn.addEventListener('click', () => {
    deleteChar(expression);
    resultScreen.innerText = expression.total;
    if(expression.total === '') resultScreen.innerText = '0'; 
    operationScreen.innerText = expression.numberA + expression.operator + expression.numberB;
})


/*
----- Misc -----
*/
// console.log(buttons);