// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./common.mjs";


function populateDropdown() {
  const dropdown = document.getElementById("user-select");
  const userIds = getUserIds();

  userIds.forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    dropdown.appendChild(option);
  });
}

function setDefaultDate() {
  const dateInput = document.getElementById("date");
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  dateInput.value = `${year}-${month}-${day}`;
}

function initializePage() {
  populateDropdown();
  setDefaultDate();
}

window.onload = initializePage;

