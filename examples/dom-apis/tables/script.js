window.onload = () => {
  // Add the submit event listener to the form.
  // This will be triggered when the user clicks the submit button
  document.getElementById("form").addEventListener("submit", onFormSubmit);

  // Add buttons event listeners
  buttonEventListeners();
};

// Add event listeners for the action buttons
const buttonEventListeners = () => {
  document.querySelectorAll("table button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const action = event.target.getAttribute("data-action");
      const row = event.target.closest("tr");
      const rowIndex = row.rowIndex;

      switch (action) {
        case "move-up":
          moveRow("move-up", rowIndex);
          break;
        case "move-down":
          moveRow("move-down", rowIndex);
          break;
        case "delete":
          deleteRow(rowIndex);
          break;
      }
    });
  });
};

/**
 * Form submission
 */
const onFormSubmit = (event) => {
  event.preventDefault();

  const emailRegexExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const nameRegexExp = /^[a-zA-Z ]{2,100}$/;

  // Get the form elements
  const inputs = form.elements;

  const email = inputs.namedItem("email").value;
  const firstName = inputs.namedItem("first-name").value;
  const lastName = inputs.namedItem("last-name").value;

  if (
    validate(
      emailRegexExp,
      email,
      "Email must have the following format foo@bar.com"
    ) &&
    validate(
      nameRegexExp,
      firstName,
      "The first name must have between 2 and 100 charactes and use only letters"
    ) &&
    validate(
      nameRegexExp,
      lastName,
      "The last name must have between 2 and 100 charactes and use only letters"
    )
  ) {
    /**
     * Iterate through the form elements to get
     * only the inputs and remove the reset button
     */
    const values = Array.from(inputs)
      .map((input) => {
        if (input.nodeName === "INPUT" && input.type !== "reset") {
          return input.value;
        }
      })
      .filter((key) => {
        return key !== undefined;
      });

    // Call the function to add a new row
    addRow(values);
    // Reset the form
    document.getElementById("form").reset();
  }
};

/** Table DOM Api */

/**
 * Creates and appends a button to the provided table cell.
 *
 * @param {HTMLElement} tableCell
 * @param {string} buttonName
 * @param {string} buttonAction
 */
const createButton = (tableCell, buttonName, buttonAction) => {
  // Create a button element
  const button = document.createElement("button");
  // Set the action attribute
  button.setAttribute("data-action", buttonAction);
  // Create the button text
  const buttonText = document.createTextNode(buttonName);
  // Append the button text
  button.appendChild(buttonText);

  // Append the button to the provided cell
  tableCell.appendChild(button);
};

/**
 * Add a row to the table with the values from the form
 *
 * @param {Array} values
 */
const addRow = (values) => {
  // Get a reference to the table
  const table = document.getElementById("table");

  // Insert a row at the end of the table
  const newRow = table.insertRow(-1);

  // Let's insert the form values
  values.forEach((value, index) => {
    // For each value, we need to insert a cell
    const newCell = newRow.insertCell(index);

    // Create a text node with the value
    const newText = document.createTextNode(value);

    // Append a text node to the cell
    newCell.appendChild(newText);
  });

  // Now we need to add the buttons to the last cell
  const lastCell = newRow.insertCell(values.length);
  createButton(lastCell, "Move Up", "move-up");
  createButton(lastCell, "Move Down", "move-down");
  createButton(lastCell, "Delete", "delete");

  // And we need to add the event listeners
  buttonEventListeners();
};

/**
 * Delete a row from the table
 * @param {number} rowIndex
 */
const deleteRow = (rowIndex) => {
  const table = document.getElementById("table");

  // Delete given index row
  table.deleteRow(rowIndex);
};

/**
 * Moves row up and down
 *
 * @param {string} direction
 * @param {number} rowIndex
 */
const moveRow = (direction, rowIndex) => {
  const rows = document.getElementById("table").rows;
  const parent = rows[rowIndex].parentNode;

  if (direction === "move-up") {
    if (rowIndex > 1) {
      parent.insertBefore(rows[rowIndex], rows[rowIndex - 1]);
    }
  }

  if (direction === "move-down") {
    if (rowIndex < rows.length - 1) {
      parent.insertBefore(rows[rowIndex + 1], rows[rowIndex]);
    }
  }
};

/** From validation */
const validate = (regexExp, value, message) => {
  const isValid = regexExp.test(value);
  const errorDiv = document.getElementById("form-errors");

  if (!isValid) {
    const errorElement = document.createElement("p");
    const errorText = document.createTextNode(message);

    errorElement.appendChild(errorText);
    errorDiv.appendChild(errorElement);
  } else {
    errorDiv.innerHTML = "";
  }

  return isValid;
};
