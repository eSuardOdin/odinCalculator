
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

}

const computeDecimal = (data, expression) => {

}

const computeOperator = (data, expression) => {

}


const computeSymbol = (data, expression) => {
    if (data === '.')
}






const computeNumber = (data, expression) => {
    // If operator empty, working on number B
    if(expression.operator === '') {
        expression.numberB += data;
        return;
    }
    // If total not already empty, we erase it
    if(expression.numberA === '' && expression.total !== '') {
        expression.total = '';
    }
    expression.numberA += data;
}



// Evaluate if nb or symbol
const evaluateData = (data, expression) => {
    if(isNaN(Number(data))) {
        computeSymbol(data, expression);
    } else {
        computeNumber(data, expression);
    }
}