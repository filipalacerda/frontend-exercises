window.onload = () => {
  document.getElementById("form").addEventListener("submit", onFormSubmit);
};

/**
 * Form submission
 */
const onFormSubmit = (event) => {
  event.preventDefault();

  const inputs = Array.from(form.elements);

  const values = inputs
    .map((input) => {
      if (input.nodeName === "INPUT" && input.type !== "reset") {
        return input.value;
      }
    })
    .filter((key) => {
      return key !== undefined;
    });

  addRow(values);
  document.getElementById("form").reset();
};

/** Table DOM Api */

const addRow = (values) => {
  // Get a reference to the table
  const table = document.getElementById("table");

  // Insert a row at the end of the table
  const newRow = table.insertRow(-1);

  values.forEach((value) => {
    // Insert a cell in the row at index 0
    const newCell = newRow.insertCell(0);

    // Append a text node to the cell
    const newText = document.createTextNode(value);

    newCell.appendChild(newText);
  });
};
