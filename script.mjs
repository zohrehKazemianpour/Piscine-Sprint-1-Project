import { getUserIds } from "./common.mjs";
import { getData, addData} from "./storage.mjs";
import { setIntervalDates } from "./utils.mjs";

const dropdown = document.getElementById("user-select");
const topicsContainer = document.getElementById("topics");
const userForm = document.getElementById("topic-form");
const titleInput = document.getElementById("title");
const datePickerInput = document.getElementById("date");

function populateDropdown() {
  const userIds = getUserIds();
  userIds.forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    dropdown.appendChild(option);
  });
}

function createAgenda(topic) {
  const container = document.createElement("li");
  const topicTitleElement = document.createElement("strong");
  topicTitleElement.textContent = topic.title;
  const dateElement = document.createElement("span");
  dateElement.textContent = ", " + new Date(topic.date).toDateString();

  container.appendChild(topicTitleElement);
  container.appendChild(dateElement);
  return container;
}
function showAgendaForSelectedUser(userId) {
  const data = getData(userId);
  if (!data || data.length === 0) {
    topicsContainer.innerHTML = "The user has no topic to revise";
  } else {
    topicsContainer.innerHTML = "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filteredData = data.filter((topic) => {
      const topicDate = new Date(topic.date);
      topicDate.setHours(0, 0, 0, 0);
      return topicDate >= today;
    });

    const sortedData = filteredData.sort(
      (topicA, topicB) => new Date(topicA.date) - new Date(topicB.date)
    );
    sortedData.forEach((topic) => {
      const topicElement = createAgenda(topic);
      topicsContainer.appendChild(topicElement);
    });
  }
}
function handleUserSelect(event) {
  const selectedUser = event.target.value;
  showAgendaForSelectedUser(selectedUser);
}

function setDefaultDate() {
  const dateInput = document.getElementById("date");
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  dateInput.value = `${year}-${month}-${day}`;
}

function handleUserSubmit(event) {
  event.preventDefault();
  const selectedUser = dropdown.value;
  const titleInputValue = titleInput.value;
  const datePickerInputValue = datePickerInput.value;

  if (titleInputValue.trim() === "" || datePickerInputValue.trim() === "") {
    alert("Please fill in the form");
    return;
  } else if (selectedUser === "") {
    alert("Please select a user");
    return;
  }

  const revisionDates = setIntervalDates(datePickerInputValue);

  const newTopics = revisionDates.map((date) => ({
    title: titleInputValue,
    date: date,
  }));

  addData(selectedUser, newTopics);
  showAgendaForSelectedUser(selectedUser);
  titleInput.value = "";
  setDefaultDate();
}
userForm.addEventListener("submit", handleUserSubmit);
dropdown.addEventListener("change", handleUserSelect);

function initializePage() {
  populateDropdown();
  setDefaultDate();
}

window.onload = initializePage;

