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
function setIntervalDates(startDate) {
  startDate = new Date(startDate);
  const oneWeekLater = new Date(startDate);
  oneWeekLater.setDate(startDate.getDate() + 7);
  const oneMonthLater = new Date(startDate);
  oneMonthLater.setMonth(startDate.getMonth() + 1);
  const threeMonthsLater = new Date(startDate);
  threeMonthsLater.setMonth(startDate.getMonth() + 3);
  const sixMonthsLater = new Date(startDate);
  sixMonthsLater.setMonth(startDate.getMonth() + 6);
  const oneYearLater = new Date(startDate);
  oneYearLater.setFullYear(startDate.getFullYear() + 1);
  return [
    oneWeekLater,
    oneMonthLater,
    threeMonthsLater,
    sixMonthsLater,
    oneYearLater,
  ];
}

function initializePage() {
  populateDropdown();
  setDefaultDate();
}

window.onload = initializePage;
