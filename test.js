
//#region 

// function updateNumber(exp, val, nb) {
//     // If first value is a dot
//     if(val === "." && nb === '') nb = "0.";
//     // If the number starts with 0, can't add a second
//     else if (val === '0' && nb === '0') return;
//     // If already 12 char long
//     else if (nb.length === 12) return;
//     else if (nb === '0') nb = val;
//     else nb += val;
//     exp.isDecimalB = (val === ".") ? true : exp.isDecimalB;
// }


// function computeOperator(exp, operator) {
//     if(exp.total !== '') {
//         exp.numberA = exp.total;
//         exp.total = '';
//         exp.operator = operator;
//     } else {
//         exp.operator = operator;
//     }
// }

// function updateExpression(val, exp) {
//     // Return if the input is an operator and no number A yet
//     if( val !== "." && isNaN(val) && exp.numberA === "" ) return;

//     //If no operator, and val is a number we're working on number A
//     if(exp.operator === '') {
//         updateNumber(exp, val, exp.numberA);
//         // Last updated
//         exp.lastWrite = "numberA"
//     }
//     else if ( // If val == operator and number B is empty, we're just updating exp.operator
//             (val === '+' ||
//             val === '-' ||
//             val === '/' ||
//             val === 'x')
//             && exp.numberB === ''
//         ) {
//             computeOperator(val);
//             exp.lastWrite = "operator"
//     } 
//     else if(exp.operator !== '') { // Working on number B
//         updateNumber(exp, val, exp.numberB);
//         // Last updated
//         exp.lastWrite = "numberB"
//     }

//     if(val === "=" && exp.numberA !== '' && exp.numberB !== '') { // Triggering operation
//         exp.total = operate(exp);
//         exp.numberA = '';
//         exp.operator = '';
//         exp.numberB = '';
//     } 
//     else if (
//         val === '+' ||
//         val === '-' ||
//         val === '/' ||
//         val === 'x'
//         && exp.numberA !== '' && exp.numberB !== ''
//     ) {
//         exp.total = operate(exp);
//         exp.numberA = exp.total;
//         exp.operator = val;
//     }
//     console.log(exp);
// }


//#endregion








// ___________________ ANCIENT FUNC _______________________
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

// __________________________________________
// __________________________________________





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
    console.log(expression);
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
            console.log(expression);
            return; // If already a decimal
        }
        expression.lastWrite = 'numberA';
        expression.numberA += (expression.numberA === '') ? '0.' : '.';
        expression.isDecimalA = true;
        console.log(expression);
        return;
    }
    
    // If not, we work on number B
    if(expression.isDecimalB) {
        console.log(expression);
        return; // If already a decimal
    }
    expression.lastWrite = 'numberB';
    expression.numberB += (expression.numberB === '') ? '0.' : '.';
    expression.isDecimalB = true;
    console.log(expression);
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
    console.log('Enters computeOperator with expression');
    console.log(expression);    
    if(expression.numberA === '' && expression.operator === '') {
        if(expression.total === '') return;
        expression.numberA = expression.total;
        expression.operator = data;
        expression.isDecimalA = !(Number(expression.total) % 1 === 0); // Checks if total is decimal
        expression.total = '';
    }
    if(expression.operator !== '') {
        if(expression.numberB === '') return; // || if last write is operator?
        expression.total = operate(expression);
        expression.numberA = expression.total;
        expression.numberB = '';
        expression.isDecimalB = false;
        expression.operator = data;
        expression.isDecimalA = !(Number(expression.total) % 1 === 0);
        expression.total = ''
    }

    expression.lastWrite = 'operator';
    console.log(expression);
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
    console.log('computeNumber working on number : ');
    // If operator !empty, working on number B
    if(expression.operator !== '') {
        console.log('B');
        expression.numberB += data;
        expression.lastWrite = 'numberB';
        console.log(expression);
        return;
    }
    console.log('A');
    // If total not already empty, we erase it
    if(expression.numberA === '' && expression.total !== '') {
        console.log('Total erased');
        expression.lastWrite = 'numberA';
        expression.total = '';
    }
    expression.numberA += data;
    console.log(expression);
}


/**
 * Evaluates if data is a number or a symbol, calls the appropriate function with it
 * @param {String} data 
 * @param {expression} expression 
 */
const evaluateData = (data, expression) => {
    console.log('evaluateData, calling :');
    if(isNaN(Number(data))) {
        console.log('computeSymbol')
        computeSymbol(data, expression);
    } else {
        console.log('computeNumber')
        computeNumber(data, expression);
    }
}

let expression = {
    'numberA' : '1.5',
    'isDecimalA' : true,
    'numberB': '1.3',
    'isDecimalB': true,
    'operator' : '+',
    'total': '',
    'lastWrite': 'numberB',    // In order to delete a char
}

// evaluateData('3', expression);

// computeDecimal(expression);

computeOperator('+', expression);