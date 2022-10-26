const displayVal = document.getElementById("display");
const operatorButton = document.querySelectorAll(".btn-operator");
const numberBtn = document.querySelectorAll(".btn-number");
const calculator = document.querySelector(".calculator");
const equal = document.querySelector("#equal");
const backspace = document.querySelector("#backspace");
const clear = document.querySelector("#clear");

const numbersArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const operatorsArray = ["+", "-", "*", "/", "%"];


let firstNumber = 0;
let displayValue = 0;
let operator = null;
let isOperationInProgress = false;

window.addEventListener("keydown", (e) => {
  const keyValue = e.key;
  if (numbersArray.includes(keyValue)) {
    numberHandler(keyValue);
  } else if (operatorsArray.includes(keyValue)) {
    operateHandler(keyValue);
  } else if (keyValue == "Enter" || keyValue === "=") {
    triggerOperation();
  } else if (keyValue == "Backspace") {
    backSpaceHandler();
  }
});


const updateDisplay = () => {
  displayVal.value = displayValue;
  displayVal.textContent = displayValue;
};


const setDefault = () => {
  displayValue = 0;
  firstNumber = 0;
  operator = null;
  isOperationInProgress = false;
};


const Addition = (num1, num2) => {
  return num1 + num2;
};

const Subtraction = (num1, num2) => {
  return num1 - num2;
};

const Multiplication = (num1, num2) => {
  return num1 * num2;
};

const Division = (num1, num2) => {
  return num1 / num2;
};

const Module = (num1, num2) => {
  num1= num1 /100; 
  num2 = num2 / 100; 
  return num1 || num2;
  // updateDisplay();
};

const Operate = (num1, num2, op) => {
  let result;
  if (op === "+") {
    result = Addition(num1, num2);
  } else if (op === "-") {
    result = Subtraction(num1, num2);
  } else if (op === "x") {
    result = Multiplication(num1, num2);
  } else if (op === "÷" || op === "/") {
    if (num2 === 0) {
      return "error";
    } else {
      result = Division(num1, num2);
    }
  } else if (op === "%") {
    result = Module(num1, num2);
  }
  return parseFloat(result.toFixed(9));
};

const triggerOperation = () => {
  if (!operator) {
    return 0;
  }
  const secondNumber = parseFloat(displayValue);
  result = Operate(firstNumber, secondNumber, operator);
  displayValue = String(result);
  updateDisplay();
  firstNumber = result;
};

const numberHandler = (value) => {
  if (value === "." && displayValue.includes(".")) return;
  if (isOperationInProgress) {
    displayValue = "";
    isOperationInProgress = false;
  }
  displayValue = +displayValue === 0 ? value : displayValue + value;
  updateDisplay();
};


const operateHandler = (value) => {
  if (operator && !isOperationInProgress) {
    triggerOperation();
  } else {
    firstNumber = parseFloat(displayValue);
  }
  isOperationInProgress = true;
  operator = value;
};

const backSpaceHandler = () => {
  displayValue = displayValue.slice(0, -1);
  if(displayValue === '') displayValue='0';
  updateDisplay();
};

Array.from(numberBtn).forEach((key) => {
  key.addEventListener("click", (e) => {
    numberHandler(e.target.innerText);
  });
});
const start = () => {
  setDefault();
  updateDisplay();
};


Array.from(operatorButton).forEach((key) => {
  key.addEventListener("click", (e) => {
    operateHandler(e.target.innerText);
  });
});

equal.addEventListener("click", triggerOperation);
backspace.addEventListener("click", backSpaceHandler);
clear.addEventListener("click", start);

start();