window.onload = () => {
  const formElem = document.getElementById("form");
  // Add submit event listener to the form
  formElem.addEventListener("submit", onFormSubmit);
  formElem.addEventListener("formdata", onFormData);
};

// grab reference to form

// submit handler
const onFormSubmit = (e) => {
  // on form submission, prevent default
  e.preventDefault();
  const formElem = document.getElementById("form");

  // construct a FormData object, which fires the formdata event
  const formData = new FormData(formElem);
};

// formdata handler to retrieve data

const onFormData = (e) => {
  // modifies the form data
  const formData = e.formData;
  console.log(formData);
  const formattedName = formData.get("name").toLowerCase();
  const formattedEmail = formData.get("email").toLowerCase();

  formData.set("name", formattedName);
  formData.set("email", formattedEmail);
  formData.set("userID", getRandomInt(20));

  showData(formData);
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const showData = (formData) => {
  const rightColumn = document.querySelector(".right");
  formData.forEach((value) => {
    const newDiv = document.createElement("div");
    const data = document.createTextNode(value);

    newDiv.appendChild(data);
    rightColumn.appendChild(newDiv);
  });
};
