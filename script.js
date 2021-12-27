// --------------------------- OPERATIONS -------------------------------------
function operate(symbol, number1, number2) {
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
const historyArray = [];
const classArray = [];

const displayUp = function(keyToShow) {
  upper = document.querySelector('#upper');
  upper.textContent = keyToShow.join('');
}

const displayBottom = function(keyToShow){
  lower = document.querySelector('#lower');
  lower.textContent = keyToShow;
}

function calculate(historyArray, classArray) {
  let numberString = ''; 
  const numbers = [];
  const operators = [];
  let result;
  
  for (let i=0; i<historyArray.length; i++) {

    if (classArray[i] === 'number') {
      numberString += historyArray[i];
    } else {  // when it finds an operator
      if (numberString !== '') numbers.push(Number(numberString));  // save the number
      numberString = '';  // empty the string
      operators.push(historyArray[i]);  // save the operator
    }
  }
  if (numberString !== '') numbers.push(Number(numberString));  // save last number
  // until here it saves numbers and operators in separate list

  if (operators.length !== 0) {
    let number1 = numbers[0];
    for (let j=0; j<operators.length; j++) {
      result = operate(operators[j], number1, numbers[j+1]);
      number1 = result;
    }
  } else return (Math.round(numbers.join('') * 100) / 100).toFixed(5);
  
  return (Math.round(result * 100) / 100).toFixed(5);
}

function clear() {
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
  
  switch (true) {
    case element.id === 'EQU':  // calculate
      // check if last element was not an operator
      if (classArray[classArray.length-1] === 'operator') {
        window.alert('Last element must be a number');
        clear();
        break;
      }
      result = calculate(historyArray, classArray);
      // error when dividing by zero
      if (result === 'Infinity') {  
        window.alert('can\'t divide by zero');
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
      
    default:  // save numbers and operators
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

