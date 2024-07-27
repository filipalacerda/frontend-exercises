window.onload = () => {
  // Add the submit event listener to the form.
  // This will be triggered when the user clicks the submit button
  document.getElementById("form").addEventListener("submit", onFormSubmit);

  // Add event listeners for the action buttons
  document.querySelectorAll("table button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const action = event.target.getAttribute("data-action");
      const row = event.target.closest("tr");
      const rowIndex = row.rowIndex;

      switch (action) {
        case "move-up":
          // moveRowUp()
          break;
        case "move-down":
          // moveRowDown()
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

  // Get the form elements
  const inputs = form.elements;

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
};

/** Table DOM Api */

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
