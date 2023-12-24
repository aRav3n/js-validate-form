const setError = function addErrorClass(target) {
  const errorClassName = "error";
  target.classList.add(errorClassName);
};

const removeError = function removeErrorClass(target) {
  const errorClassName = "error";
  target.classList.remove(errorClassName);
};

const assignError = function assignErrorClass(errorItem, errorMessage) {
  const errorField = errorItem.parentElement.querySelector("p > span + span");
  errorField.innerHTML = errorMessage;
  setError(errorField);
};

const checkMissing = function checkIfInputIsFilledOut(item) {
  if (item.validity.valueMissing) {
    assignError(item, "This field needs to be filled out.");
  } else {
    removeError(item);
  }
};

const checkLong = function verifyStringIsntTooLong(item, maxLength) {
  const errorMessage = `Must be less than ${maxLength} characters`;
  if (item.validity.tooLong) {
    assignError(item, errorMessage);
  } else {
    removeError(item);
  }
};

const checkShort = function verifyStringIsntTooShort(item, minLength) {
  const errorMessage = `Must be at least ${minLength} characters`;
  if (item.validity.tooShort) {
    assignError(item, errorMessage);
  } else {
    removeError(item);
  }
};

const checkMismatch = function checkIfItemsDoNotMatch(itemOne, itemTwo) {
  if (itemOne === itemTwo) {
    return true;
  } else {
    removeError(item);
  }
  return false;
};

const checkEmail = function validateEmailAddress() {
  const email = document.querySelector("#email");
  checkMissing(email);
  if (email.validity.typeMismatch) {
    assignError(email, "Needs to be an email.");
  }
};

const checkCountry = function validateCountry() {
  const country = document.querySelector("#country");
  checkMissing(country);
};

const checkZip = function validateZipCode() {
  const zip = document.querySelector("#zip");
  checkMissing(zip);
  checkLong(zip, 5);
  checkShort(zip, 5);
};

const checkPw = function validatePassword() {
  const pw = document.querySelector("#password");
  checkMissing(pw);
  checkLong(pw, 20);
  checkShort(pw, 8);
};

const checkPwConf = function validatePasswordConfirmation() {
  const pw = document.querySelector("#password");
  const pwConfirm = document.querySelector("#passwordConfirm");
  if (checkMismatch(pw, pwConfirm)) {
    assignError(pwConfirm, "Needs to match the Password field.");
  }
  checkMissing(pwConfirm);
  checkLong(pwConfirm, 20);
  checkShort(pwConfirm, 8);
};

const focusOutCheck = function checkFieldOnFocusOut(fieldId, checkFunction) {
  const field = document.getElementById(fieldId);
  field.addEventListener("focusout", () => {
    checkFunction();
  });
};

const checkAllFocusOut = function checkAllFieldsOnFocusOut() {
  focusOutCheck("email", checkEmail);
  focusOutCheck("country", checkCountry);
  focusOutCheck("zip", checkZip);
  focusOutCheck("password", checkPw);
  focusOutCheck("passwordConfirm", checkPwConf);
};

const executeCheck = function executeChecksOnButtonPress() {
  const buttonSubmit = document.querySelector("#submitButton");
  checkAllFocusOut();
  buttonSubmit.addEventListener("click", () => {
    checkEmail();
    checkCountry();
    checkZip();
    checkPw();
    checkPwConf();
  });
};

window.addEventListener("DOMContentLoaded", () => {
  const emailField = document.querySelector("#email");
  emailField.focus();
  emailField.select();
  executeCheck();
});
