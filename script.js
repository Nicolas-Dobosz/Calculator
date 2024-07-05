let num;
let num2;
let ope;
let lastNum;
let lastOpe;
let screen;
let history

document.addEventListener("DOMContentLoaded", function () {
  screen = document.getElementById("text");
  history = document.getElementById("history");
  setVariables();
  lastNum = "";
  lastOpe = "";

  document.addEventListener("keydown", (event) => {
    if (parseInt(event.key) >= 0) {
      writeNumber(event.key);
    } else if (["-", "+"].includes(event.key)){
      writeOperator(event.key);
    } else if (event.key == "*"){
      writeOperator("×");
    } else if (event.key == "/"){
      writeOperator("÷");
    } else if (event.key == "Enter") {
      result();
    } else if (event.key == "Backspace"){
      deleteLastInput();
    }
  });
});

function writeNumber(number) {
  if (!ope) {
    if (num.length >= 11) {
      alert("Limit number reached");
    } else if (num.includes(".") && number == ".") {
      alert("There is already a point");
    } else if (num == "0" && number != ".") {
      num = number;
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
    } else {
      num2 += number;
      screen.innerText = num2;
    }
  }
}

function writeOperator(operator) {
  if (num.length > 10) {
    alert("Limit number reached");
  } else {
    if (ope && num2 != "0") {
      result();
    }
    ope = operator;
    screen.innerText = num + ope;
  }
}

function setVariables() {
  num = "0";
  num2 = "0";
  ope = "";
  screen.style.fontSize = "7vh";
  screen.innerText = num;
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
      screen.style.fontSize = "7vh";
    }
    screen.innerText = num;
    if (!num) {
      num = "0";
      screen.innerText = num;
    }
  }
}

function round(number) {
  return Math.round(number * 10_000) / 10_000;
}

function calculate(ope, num2) {
  let tempResult;
  switch (ope) {
    case "+":
      lastNum = num2;
      lastOpe = ope;
      tempResult = parseFloat(num) + parseFloat(num2);
      setVariables();
      num = round(tempResult).toString();
      screen.innerText = num;
      break;
    case "-":
      lastNum = num2;
      lastOpe = ope;
      tempResult = parseFloat(num) - parseFloat(num2);
      setVariables();
      num = round(tempResult).toString();
      screen.innerText = num;
      break;
    case "×":
      lastNum = num2;
      lastOpe = ope;
      tempResult = parseFloat(num) * parseFloat(num2);
      setVariables();
      num = round(tempResult).toString();
      screen.innerText = num;
      break;
    case "÷":
      lastNum = num2;
      lastOpe = ope;
      tempResult = parseFloat(num) / parseFloat(num2);
      setVariables();
      num = round(tempResult).toString();
      screen.innerText = num;
      break;
  }
}

function result() {
  if (!ope) {
    calculate(lastOpe, lastNum);
  } else {
    calculate(ope, num2);
  }
  if (num.length > 12) {
    screen.style.fontSize = "4vh";
  }
}

function showHistory() {
  history.style.visibility = history.style.visibility === "visible" ? "hidden" : "visible";
}