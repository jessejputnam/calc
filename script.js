"use strict";

/* 

Table of Contents:

#DOM Elements
#Stored Variables
#DRY Functions
#Number Button Functionality
#Operator Button Functionality
#Equals Button Functionality
#Clear Button Functionality
#Back Button Functionality

*/

// ###############DOM elements###############
const displayInput = document.querySelector(".calc__input");
const displayResult = document.querySelector(".calc__result");
const btnNums = document.querySelectorAll(".btn__num");
const btnFunctions = document.querySelectorAll(".btn__fnc");
const btnEquals = document.querySelector(".btn--equals");
const btnClear = document.querySelector(".btn--clear");
const btnBack = document.querySelector(".btn--back");

// ###############Stored Variables###############
let input = "0";
let result = "0";

// ###############DRY Functions###############
const updateDisplay = function () {
  displayInput.innerText = input;
  displayResult.innerText = result;
};

const reset = function () {
  input = "0";
  result = "0";
  updateDisplay();
};

// ###############Number Button Functionality###############
btnNums.forEach((button) => {
  button.addEventListener("mousedown", (e) => {
    // reset input if result present
    if (result !== "0") reset();

    // Decimal rules
    if (e.target.innerText === ".") {
      let decimalCheck = input.split(" ");
      // restrict decimals per number
      if (decimalCheck[decimalCheck.length - 1].includes("."))
        return e.preventDefault();
      // add leading zero if first input is decimal
      if (input === "0") return (input = "0.");
      // add leading zero if no current numbers
      if (decimalCheck[decimalCheck.length - 1] === "") return (input += "0.");
      // restrict allowing no room for trailing numbers after decimal
      if (input.length > 24) return e.preventDefault();
    }

    // stop input length from exceeding screen size
    if (input.length > 26) return e.preventDefault();

    // replace initial zero
    if (input === "0") return (input = e.target.innerText);

    // add number to input
    input += e.target.innerText;
  });

  button.addEventListener("mouseup", () => updateDisplay());
});

// ###############Operator Button Functionality###############
btnFunctions.forEach((button) => {
  button.addEventListener("mousedown", (e) => {
    // Continue from previous result
    if (result !== "0") {
      input = result + " " + e.target.innerText + " ";
      result = "0";
    }

    // prevent beginning with operator
    if (input === "0") return e.preventDefault();

    // restrict multiple operators in a row
    if (input[input.length - 1] === " ") return e.preventDefault();

    // restrict operator too close to end of string
    if (input.length > 23) return e.preventDefault();

    input = input + " " + e.target.innerText + " ";
  });

  button.addEventListener("mouseup", () => updateDisplay());
});

// ###############Equals Button Functionality###############
btnEquals.addEventListener("click", (e) => {
  result = eval(input);
  updateDisplay();
});

// ###############Clear Button Functionality###############
btnClear.addEventListener("click", () => {
  reset();
});

// ###############Back Button Functionality###############
btnBack.addEventListener("click", () => {
  // restrict functionality if result already calculated
  if (result !== "0") return;

  // "" input to a "0" input
  if (input.length === 1) {
    input = "0";
    return updateDisplay();
  }

  // Backspace (along with spaces for operators)
  if (input[input.length - 1] === " ") {
    input = input.slice(0, -3);
    updateDisplay();
  } else {
    input = input.slice(0, -1);
    updateDisplay();
  }
});
