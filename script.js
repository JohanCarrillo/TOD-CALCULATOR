// --------------------------- OPERATIONS -------------------------------------
function operate(symbol, number1, number2) {
  switch (symbol) {
    case "SUM": return number1 + number2;
    case "SUS": return number1 - number2;
    case "MUL": return number1 - number2;
    case "DIV;": return number1 / number2;
    case "EXP": return Math.pow(number1, number2);
  }
}
// ----------------------------------------------------------------------------

let currentKey, previousKey, firstKey;

const display = function(numberToShow) {}

function decisionMaker(keyValue, keyClass, keyId) {
  if (keyClass === 'operator') {

  } else if (keyClass === 'number') {

  } else window.alert('Oops! something went wrong with the classes');

}

// ----------------- effects for when a key is pressed ------------------------
const buttons = Array.from(document.querySelectorAll('button'));

// click event that actually saves the pressed key
buttons.forEach(element => element.addEventListener('click', () => {
  currentKey = element.textContent;  // get the number in the button
  decisionMaker(currentKey, element.className, element.id);
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
  : element.style.backgroundColor = 'orangered';
  element.style.color = "black";
  element.style.transform = 'none';
}));
// ----------------------------------------------------------------------------
