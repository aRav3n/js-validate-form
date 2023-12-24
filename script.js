const setError = function addErrorClass(target) {
  const errorClassName = "error";
  target.classList.add(errorClassName);
};

const removeError = function removeErrorClass(target) {
  const errorField = target.parentElement.querySelector("p > span + span");
  const errorClassName = "error";
  errorField.classList.remove(errorClassName);
  errorField.innerHTML = "";
};

const assignError = function assignErrorClass(errorItem, errorMessage) {
  const errorField = errorItem.parentElement.querySelector("p > span + span");
  errorField.innerHTML = errorMessage;
  setError(errorField);
};

const checkMissing = function checkIfInputIsFilledOut(item) {
  const errorMessage = "This field needs to be filled out.";
  if (item.validity.valueMissing) {
    assignError(item, errorMessage);
    return false;
  }
  return true;
};

const checkEmailLegit = function verifyThisMatchesEmailAddressFormat(item) {
  if (item.validity.typeMismatch) {
    assignError(item, "Needs to be an email.");
    return false;
  }
  return true;
};

const checkLong = function verifyStringNotTooLong(item, maxLength) {
  const errorMessage = `Must be less than ${maxLength} characters`;
  if (item.validity.tooLong) {
    assignError(item, errorMessage);
    return false;
  }
  return true;
};

const checkShort = function verifyStringNotTooShort(item, minLength) {
  const errorMessage = `Must be at least ${minLength} characters`;
  if (item.validity.tooShort) {
    assignError(item, errorMessage);
    return false;
  }
  return true;
};

const checkMismatch = function checkIfItemsDoNotMatch(
  password,
  passwordConfirm
) {
  const errorMessage = "Needs to match the Password field.";
  if (password.value !== passwordConfirm.value) {
    assignError(passwordConfirm, errorMessage);
    return false;
  }
  return true;
};

const checkNumber = function checkIfFieldIsPositiveInteger(field) {
  const errorMessage = "Needs to be an integer";
  const stringToCheck = field.value;
  if (!isNaN(stringToCheck)) {
    const numberToCheck = Number(stringToCheck);
    if (Number.isInteger(numberToCheck)) {
      if (numberToCheck > 0) {
        return true;
      }
    }
  }
  assignError(field, errorMessage);
  return false;
};

const checkEmail = function validateEmailAddress() {
  const email = document.querySelector("#email");
  if (checkEmailLegit(email) && checkMissing(email)) {
    removeError(email);
  }
};

const checkCountry = function validateCountry() {
  const country = document.querySelector("#country");
  if (checkMissing(country)) {
    removeError(country);
  }
};

const checkZip = function validateZipCode() {
  const zip = document.querySelector("#zip");
  if (
    checkLong(zip, 5) &&
    checkShort(zip, 5) &&
    checkMissing(zip) &&
    checkNumber(zip)
  ) {
    removeError(zip);
  }
};

const checkPw = function validatePassword() {
  const pw = document.querySelector("#password");
  if (checkLong(pw, 20) && checkShort(pw, 8) && checkMissing(pw)) {
    removeError(pw);
  }
};

const checkPwConf = function validatePasswordConfirmation() {
  const pw = document.querySelector("#password");
  const pwConfirm = document.querySelector("#passwordConfirm");
  if (checkMismatch(pw, pwConfirm) && checkMissing(pwConfirm)) {
    removeError(pwConfirm);
  }
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
  const form = document.querySelector("form");
  form.reset();
  emailField.focus();
  emailField.select();
  executeCheck();
});
