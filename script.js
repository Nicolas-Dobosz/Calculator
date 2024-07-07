let num;
let num2;
let ope;
let lastNum;
let lastNum2;
let lastOpe;
let newCalcul;
let screen;
let history;
let textSize;
let textSize2;

// Initialize the calculator on DOM content loaded
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("resize", adjustTextSize);
  screen = document.getElementById("text");
  history = document.getElementById("history");
  newCalcul = false;
  
  setVariables();
  adjustTextSize();
  lastNum = "";
  lastOpe = "";

  // Add event listener for keyboard input
  document.addEventListener("keydown", (event) => {
    if (parseInt(event.key) >= 0) {
      writeNumber(event.key);
    } else if (["-", "+"].includes(event.key)) {
      writeOperator(event.key);
    } else if (event.key == "*") {
      writeOperator("×");
    } else if (event.key == "/") {
      writeOperator("÷");
    } else if (event.key == "Enter") {
      result();
    } else if (event.key == "Backspace") {
      deleteLastInput();
    }
  });
});


// Ajust Text Size if needed
function adjustTextSize() {
  if (window.matchMedia("(max-width: 1350px)").matches) {
    textSize = "5vh";
    textSize2 = "3vh";
  } else {
    textSize = "7vh";
    textSize2 = "4vh";
  }

  if (num.length > 12) {
    screen.style.fontSize = textSize2;
  } else {
    screen.style.fontSize = textSize;
  }
}

// Handle number input and update screen
function writeNumber(number) {
  if (!ope) {
    if (num.length >= 11) {
      alert("Limit number reached");
    } else if (num.includes(".") && number == ".") {
      alert("There is already a point");
    } else if (num == "0" && number != ".") {
      num = number;
      screen.innerText = num;
    } else if (x) {
      num = number;
      newCalcul = false;
      screen.innerText = num;
    } else {
      num += number;
      screen.innerText = num;
    }
  } else {
    if (num2.length >= 11) {
      alert("Limit number reached");
    } else if (num2.includes(".") && number == ".") {
      alert("There is already a point");
    } else if (num2 == "0" && number != ".") {
      num2 = number;
      screen.innerText = num2;
    } else if (num2 == "-0" && number != ".") {
      num2 = "-" + number;
      screen.innerText = num2;
    } else {
      num2 += number;
      screen.innerText = num2;
    }
  }
}

// Handle operator input and update screen
function writeOperator(operator) {
  if (operator == "-" && (ope == "×" || ope == "÷")) {
    num2 = "-0";
    screen.innerText = num2;
  } else {
    if (ope && num2 != "0") {
      result();
    }
    ope = operator;
    screen.innerText = num + ope;
  }
}

// Set initial values for the calculator
function setVariables() {
  num = "0";
  num2 = "0";
  ope = "";
  screen.style.fontSize = textSize;
  screen.innerText = num;
}

// Clear calculator values
function clearCalc() {
  lastNum = "0";
  lastNum2 = "0";
  lastOpe = "";
  setVariables();
}

function deleteLastInput() {
  if (num2 != "0" && num2) {
    num2 = num2.substring(0, num2.length - 1);
    screen.innerText = num2;
    if (!num2) {
      num2 = "0";
      screen.innerText = ope;
    }
  } else if (ope) {
    ope = "";
    screen.innerText = num;
  } else {
    num = num.substring(0, num.length - 1);
    if (num.length < 12) {
      screen.style.fontSize = textSize;
    }
    screen.innerText = num;
    if (!num) {
      num = "0";
      screen.innerText = num;
    }
  }
}

// Round the number to 4 decimal places
function round(number) {
  return Math.round(number * 10_000) / 10_000;
}

// Calculation based on the operator
function calculate(ope, num2) {
  let tempResult;
  switch (ope) {
    case "+":
      lastNum = num;
      lastNum2 = num2;
      lastOpe = ope;
      tempResult = parseFloat(num) + parseFloat(num2);
      setVariables();
      num = round(tempResult).toString();
      screen.innerText = num;
      break;
    case "-":
      lastNum = num;
      lastNum2 = num2;
      lastOpe = ope;
      tempResult = parseFloat(num) - parseFloat(num2);
      setVariables();
      num = round(tempResult).toString();
      screen.innerText = num;
      break;
    case "×":
      lastNum = num;
      lastNum2 = num2;
      lastOpe = ope;
      tempResult = parseFloat(num) * parseFloat(num2);
      setVariables();
      num = round(tempResult).toString();
      screen.innerText = num;
      break;
    case "÷":
      lastNum = num;
      lastNum2 = num2;
      lastOpe = ope;
      tempResult = parseFloat(num) / parseFloat(num2);
      setVariables();
      num = round(tempResult).toString();
      screen.innerText = num;
      break;
  }
}

// Display result of the calculation
function result() {
  newCalcul = true;
  if (!ope) {
    calculate(lastOpe, lastNum2);
  } else {
    calculate(ope, num2);
  }
  if (ope || lastOpe) {
    generateHistory();
  } else {
    alert("What do you mean " + num + " is " + num);
  }
  if (num.length > 12) {
    screen.style.fontSize = textSize2;
  }
}

// Toggle the visibility of history panel
function showHistory() {
  history.style.visibility =
    history.style.visibility === "visible" ? "hidden" : "visible";
}

// Generate and display calculation history
function generateHistory() {
  const hr = document.createElement("hr");

  const calcul = document.createElement("div");
  calcul.className = "calcul";

  const operation = document.createElement("p");
  operation.className = "operation";
  operation.innerText = lastNum + lastOpe + lastNum2;

  const result = document.createElement("p");
  result.className = "result";
  result.innerText = num;

  history.appendChild(hr);
  calcul.appendChild(operation);
  calcul.appendChild(result);
  history.appendChild(calcul);

  history.scrollBy(0, history.scrollHeight);
}
