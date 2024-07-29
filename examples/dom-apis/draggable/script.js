window.onload = () => {
  // Set event listeners for the draggable functions

  /**
   * For all draggable elements, let's add the onDragStart event
   */
  document.querySelectorAll(".draggable").forEach((element) => {
    element.addEventListener("dragstart", onDragStart);
  });

  // Let's add the events for the left-hand side draggable zone
  document
    .getElementById("dropzone-1")
    .addEventListener("dragover", onDragOver);
  document.getElementById("dropzone-1").addEventListener("drop", onDrop);

  // let's add the events for the right-hand side draggable zone
  document.getElementById("dropzone").addEventListener("dragover", onDragOver);
  document.getElementById("dropzone").addEventListener("drop", onDrop);
};

/**
 * We need to save the id of the element we want to drag
 * @param {} event
 */
const onDragStart = (event) => {
  event.dataTransfer.setData("text/plain", event.target.id);
};

const onDragOver = (event) => {
  event.preventDefault();
};

/**
 * We want to append the draggable element into a dropzone
 * @param {*} event
 */
const onDrop = (event) => {
  // Let's retrieve the ID we saved on the dragStart event
  const id = event.dataTransfer.getData("text");

  // Let's get the draggable element
  const draggableElement = document.getElementById(id);

  // Now we need to get the dropzone element
  const dropzone = event.target;

  // Append the child in the dropzone
  dropzone.appendChild(draggableElement);

  // Clear the data transfer object with the id we just dropped
  event.dataTransfer.clearData();
};
