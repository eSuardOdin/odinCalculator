
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







const computeEqual = (data, expression) => {
    // If exp.operator is empty, we work on number A
    
}

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

const computeOperator = (data, expression) => {


    expression.lastWrite = 'operator';
}


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
        computeEqual(data, expression);
    }
}






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



// Evaluate if nb or symbol
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

/*
evaluateData('8', 'a');
evaluateData('/', 'a');
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


// evaluateData('3', expression);

computeDecimal(expression);