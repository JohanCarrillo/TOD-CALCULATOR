// --------------------------- OPERATIONS -------------------------------------
function operate(symbol, number1, number2) {
  // this function executes the basic operations

  switch (symbol) {
    case "+": return number1 + number2;
    case "-": return number1 - number2;
    case "X": return number1 * number2;
    case "/": return number1 / number2;
    case "^": return Math.pow(number1, number2);
    case "%": return number1 % number2;
  }
}
// ----------------------------------------------------------------------------

let result;
const historyArray = [];  // store every input of the calculator
const classArray = [];  // store class names of every input

const displayUp = function(keyToShow) {
  // used to show the input history in the small-upper screen

  upper = document.querySelector('#upper');
  upper.textContent = keyToShow.join('');
}

const displayBottom = function(keyToShow){
  // used to show every result in the big-lower screen

  lower = document.querySelector('#lower');
  lower.textContent = keyToShow;
}

function calculate(historyArray, classArray) {
  /* This function receives all the inputs and its classes and returns the 
      final result rounded to 5 decimals executing operations one by one from 
      left to right in the input order. If there is an invalid input returns 
      an error message */

  let numberString = ''; 
  const numbers = [];
  const operators = [];
  let result;
  
  for (let i=0; i<historyArray.length; i++) {

    if (classArray[i] === 'number') {  // chain a number 
      numberString += historyArray[i];
    } else {  // when it finds an operator saves the number and the operator
      if (numberString !== '') {  // this is in case the first input is not a number
        numbers.push(Number(numberString));  // save the number
      } else {
        return 'Invalid Operation';
      }
      numberString = '';  // empty the string
      operators.push(historyArray[i]);  // save the operator
    }
  }
  if (numberString !== '') numbers.push(Number(numberString));  // save last number

  if (operators.length !== 0) {  // if there is at least one input operator
    let number1 = numbers[0];
    for (let j=0; j<operators.length; j++) {  // runs over all the operators
      result = operate(operators[j], number1, numbers[j+1]);
      number1 = result;  // the next operation uses the previous result
    }
  } else {  // when there is not any operator, only one number return that number
    if (!isNaN(numbers[0])) return (Math.round(numbers.join('') * 100000) / 100000).toFixed(5);  // invalid number
    else return 'Invalid Operation';  // in case the only input is an operator return error
  }
  // this isNaN is for when the input was an invalid number like 1.1.0
  if (!isNaN(result)) return (Math.round(result * 100000) / 100000).toFixed(5);
  else return 'Invalid Operation';
}

function clear() {
  // deletes all the history, cleaning the display
  historyArray.length = 0;
  classArray.length = 0;
  result = '';
  displayUp(historyArray);
  displayBottom(result);
}

// ----------------- effects for when a key is pressed ------------------------
const buttons = Array.from(document.querySelectorAll('button'));

// click event that actually saves the pressed key
buttons.forEach(element => element.addEventListener('click', () => {
  /* This function assign to every button its function and saves the input history
      and its class */

  switch (true) {
    case element.id === 'EQU':  // '=' use the history to calculate
      // check if last element input was not an operator
      if (classArray[classArray.length-1] === 'operator') {
        window.alert('Last element must be a number');
        clear();
        break;
      }
      result = calculate(historyArray, classArray);
      // error when dividing by zero or invalid input
      if (result === 'Infinity' || result === 'Invalid Operation') {  
        window.alert('Invalid Operation');
        clear();
        break;
      }
      displayBottom(result);
      break;

    case element.id === 'AC':  // clear history
      clear();
      break;

    case element.id === 'DEL':  // delete last element
      historyArray.pop();
      classArray.pop();
      displayUp(historyArray);
      break;

    default:  // save numbers and operators | this is when a number or operator button is pressed
      historyArray.push(element.textContent);
      classArray.push(element.className);
      displayUp(historyArray);
      break;
  }
}));

// mouseover event that highlight the key the mouse is over
buttons.forEach(element => element.addEventListener('mouseover', () => {
  element.style.backgroundColor = "black";
  element.style.color = "yellow";
  element.style.transform = 'scale(1.1, 1.1)';
}));

// mouseout event that returns the key to its normal form
buttons.forEach(element => element.addEventListener('mouseout', () => {
  element.classList.contains('number') ? element.style.backgroundColor = "white"
  : element.style.backgroundColor = '#EA8328';
  element.style.color = "black";
  element.style.transform = 'none';
}));
// ----------------------------------------------------------------------------

