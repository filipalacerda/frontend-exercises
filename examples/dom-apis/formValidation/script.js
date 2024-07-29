window.onload = () => {
  // Add the submit event listener to the form.
  // This will be triggered when the user clicks the submit button
  document.getElementById("form").addEventListener("submit", onFormSubmit);

  const usernameField = document.getElementById("username");
  const passwordField = document.getElementById("password");
  const emailField = document.getElementById("email");
  const dateField = document.getElementById("date");

  usernameField.addEventListener("input", onChangeUsername);
  passwordField.addEventListener("input", onChangePassword);
  emailField.addEventListener("input", onChangeEmail);
  dateField.addEventListener("change", onChangeDate);
};

const onFormSubmit = (e) => {
  e.preventDefault();
  const form = document.getElementById("form");

  const inputs = form.elements;

  // We only want to submit the form is values are valid
  if (
    isUsernameValid(inputs.namedItem("username").value) &&
    isEmailValid(inputs.namedItem("email").value) &&
    isPasswordValid(inputs.namedItem("password").value)
  ) {
    const values = Array.from(inputs)
      .map((input) => {
        if (input.nodeName === "INPUT" && input.type !== "reset") {
          return {
            [input.id]: input.value,
          };
        }
      })
      .filter((key) => {
        return key !== undefined;
      });

    addValues(values);
  } else {
    alert("your form has errors");
  }
};

// Handle error states
const toggleHiddenClass = (element, visible) => {
  if (visible) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
};

/**
 * Checks if the username has at least 6 characters
 * @param {string} value
 * @returns
 */
const isUsernameValid = (value) => {
  return value.length >= 6;
};

/**
 * Checks if the value has:
 * - 6 characters
 * - 1 number
 * - 1 uppercase letter
 * - 1 symbol
 * @param {string} value
 * @returns boolean
 */
const isPasswordValid = (value) => {
  return (
    /\d/g.test(value) &&
    value.length >= 6 &&
    /[A-Z]/.test(value) &&
    /\W|_/g.test(value)
  );
};

/**
 * Checks if the email address has the valid format
 *
 * @param {string} value
 * @returns boolean
 */
const isEmailValid = (value) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value);
};

const isDateValid = (today, currentDate) => {};

/**
 * When the user tyopes, we want to validate is a valid username
 * If it's not we want to show an error message
 * @param {*} event
 */
const onChangeUsername = (event) => {
  const value = event.target.value;
  const errorField = document.querySelector("#username-field .error");
  const isValid = isUsernameValid(value);

  if (!isValid) {
    toggleHiddenClass(errorField, true);
  } else {
    toggleHiddenClass(errorField, false);
  }
};

/**
 * When the user types, we want to validate that's a valid password
 * If it's not we want to show an error
 * @param {*} event
 */
const onChangePassword = (event) => {
  const value = event.target.value;

  const errorField = document.querySelector("#password-field .error");
  const isValid = isPasswordValid(value);

  // Test if the field has at least one number, one uppercase character and one symbol
  if (isValid) {
    toggleHiddenClass(errorField, false);
  } else {
    toggleHiddenClass(errorField, true);
  }
};

/**
 * When the user types, we want to validate that's a valid email address
 * If it's not we want to show an error
 * @param {*} event
 */
const onChangeEmail = (event) => {
  const value = event.target.value;
  const errorField = document.querySelector("#email-field .error");
  const isValid = isEmailValid(value);

  if (!isValid) {
    toggleHiddenClass(errorField, true);
  } else {
    toggleHiddenClass(errorField, false);
  }
};

/**
 * We want the birthdate to be in the past!
 * @param {*} event
 */
const onChangeDate = (event) => {
  const value = event.target.value;
  const today = new Date();
  const errorField = document.querySelector("#date-field .error");

  if (new Date(value).getTime() > today.getTime()) {
    toggleHiddenClass(errorField, true);
  } else {
    toggleHiddenClass(errorField, false);
  }
};

/**
 * Let's insert the form values into the DOM
 * @param {Array} values
 */
const addValues = (values) => {
  const rightColumn = document.getElementById("form-values");

  values.forEach((value) => {
    // Let's create a div for each value
    const newDiv = document.createElement("div");
    const key = Object.keys(value);
    let newText;

    // Making sure we do not print the password in plain text
    if (key[0] !== "password") {
      newText = document.createTextNode(`${key} : ${value[key]}`);
    } else {
      newText = document.createTextNode(`${key} : *****`);
    }
    // Let's append the text node with the form values
    newDiv.appendChild(newText);
    // Let's append each div into the right column
    rightColumn.appendChild(newDiv);
  });
};
