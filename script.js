// LET CURRENT TOTAL STARTS AT 0
let currentTotal = 0;
// READER STRING STARTS AT 0
let reader = `0`;
// PREVIOUS OPERATORS IS UNDEFINED
let previousOperator;

// SET CONSTANT VARIABLE FOR CLASS NAMES
const screen = document.querySelector(`.screen`);

// ACTION FOR BUTTONS CLICKED
function buttonClicked(value) {
  if (isNaN(value)) {
    // VALUE FOR NOT A NUMBER | EXECUTING function symbolHolder
    symbolHolder(value);
  } else {
    // else EXECUTE function numberHolder
    numberHolder(value);
  }
  screen.innerText = reader;
}

// OPERATORS FUNCTION | switch-case
function symbolHolder(operator) {
  switch (operator) {
    // SETS THE VALUES OF "reader" AND "currentTotal" TO 0, EFFECTIVELY RESETTING OR CLEARING THEM.
    case `C`:
      reader = `0`;
      currentTotal = 0;
      break;
    // OPERATION FOR EQUALS
    case `=`:
      // THE DEFAULT STATE IS null OR 0
      if (previousOperator === null) {
        return;
      }
      // EXECUTE THE CORRESPONDING CASE AND PERFORM AN EQUATION BETWEEN THE GIVEN NUMBER AND OPERATOR
      flushOperation(parseInt(reader));
      previousOperator = null;
      reader = currentTotal;
      currentTotal = 0;
      break;
    // OPERATION FOR BACKSPACE
    case `←`:
      if (reader.length === 1) {
        reader = `0`;
      } else {
        reader = reader.substring(0, reader.length - 1);
      }
      break;
    // OPERATION FOR EVERY EQUATION | EACH CASE "if the value = true, then execute the function solveEquation"
    case `+`:
    case `−`:
    case `×`:
    case `÷`:
      solveEquation(operator);
      break;
  }
}
// OPERATION TO SOLVE THE EQUATION | function solveEquation
function solveEquation(operator) {
  if (reader === `0`) {
    return;
  }
  // SETS THE VALUE OF reader | parseInt/number
  const intReader = parseInt(reader);

  // CONDITIONAL STATEMENT
  if (currentTotal === 0) {
    currentTotal = intReader;
  } else {
    flushOperation(intReader);
  }
  // PREVIOUS OPERATOR VALUE = OPERATOR PARAMETER
  previousOperator = operator;
  reader = `0`;
}

// OPERATION TO CONTINUOUSLY ADD THE GIVEN READER VALUE AND THE OPERATOR VALUE
function flushOperation(intReader) {
  if (previousOperator === `+`) {
    currentTotal += intReader;
  } else if (previousOperator === `−`) {
    currentTotal -= intReader;
  } else if (previousOperator === `×`) {
    currentTotal *= intReader;
  } else if (previousOperator === `÷`) {
    currentTotal /= intReader;
  }
}

// HOLDS THE NUMBER BEING CLICKED ON THE VENT
function numberHolder(numberString) {
  if (reader === `0`) {
    reader = numberString;
  } else {
    reader += numberString;
  }
}

// OPERATION TO RUN THE .cal-btns IN index.html | function run()
function run() {
  document
    .querySelector(`.cal-btns`)
    .addEventListener(`click`, function (event) {
      buttonClicked(event.target.innerText);
    });
}

run();
