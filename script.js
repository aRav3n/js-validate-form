const setError = function addErrorClass(target) {
  const errorClassName = "error";
  target.classList.add(errorClassName);
};

const removeError = function removeErrorClass(target) {
  const errorClassName = "error";
  target.classList.remove(errorClassName);
};

const assignError = function assignErrorClass(errorItem, errorMessage) {
  const errorField = errorItem.parentElement.querySelector("p > span > span");
  errorField.innerHTML = errorMessage;
  setError(errorField);
};

const checkMissing = function checkIfInputIsFilledOut(item) {
  if (item.validity.valueMissing) {
    assignError(item, "This field needs to be filled out.");
  }
};

const checkLong = function verifyStringIsntTooLong(item, maxLength) {
  const errorMessage = `Must be less than ${maxLength} characters`;
  if (item.validity.tooLong) {
    assignError(item, errorMessage);
  }
};

const checkShort = function verifyStringIsntTooShort(item, minLength) {
  const errorMessage = `Must be at least ${minLength} characters`;
  if (item.validity.tooShort) {
    assignError(item, errorMessage);
  }
};

const checkMismatch = function checkIfItemsDoNotMatch(itemOne, itemTwo) {
  if (itemOne === itemTwo) {
    return true;
  }
  return false;
};

const checkItemOnInput = function checkDesignatedItemWhenFieldIsModified(
  item,
  functionToExecute
) {
  item.addEventListener("input", functionToExecute());
};

const checkEmail = function validateEmailAddress() {
  const email = document.querySelector("id", "email");
  checkMissing(email);
  if (email.validity.typeMismatch) {
    assignError(email, "Needs to be an email.");
  }
  checkItemOnInput(email, checkEmail);
};

const checkCountry = function validateCountry() {
  const country = document.querySelector("id", "country");
  checkMissing(country);
  checkItemOnInput(country, checkCountry);
};

const checkZip = function validateZipCode() {
  const zip = document.querySelector("id", "zip");
  checkMissing(zip);
  checkLong(zip, 5);
  checkShort(zip, 5);
  checkItemOnInput(zip, checkZip);
};

const checkPw = function validatePassword() {
  const pw = document.querySelector("id", "password");
  const pwConfirm = document.querySelector("id", "passwordConfirm");
  checkMissing(pw);
  checkMissing(pwConfirm);
  checkLong(pw, 20);
  checkLong(pwConfirm, 20);
  checkShort(pw, 8);
  checkShort(pwConfirm, 8);
  if (checkMismatch(pw, pwConfirm)) {
    assignError(pwConfirm, "Needs to match the Password field.");
  }
  checkItemOnInput(pw, checkPw);
  checkItemOnInput(pwConfirm, checkPw);
};

const executeCheck = function executeChecksOnButtonPress() {
  const buttonSubmit = document.querySelector("id", "submit");
  buttonSubmit.addEventListener("click", () => {
    checkEmail();
    checkCountry();
    checkZip();
    checkPw();
  });
};

window.addEventListener("DOMContentLoaded", () => {
  executeCheck();
});
