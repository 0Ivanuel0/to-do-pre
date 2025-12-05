let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks-array"));

  if (tasks[0]) return tasks;
  return items;
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);

  const textElement = clone.querySelector(".to-do__item-text");
  textElement.textContent = item;

  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  deleteButton.addEventListener("click", function () {
    clone.remove();
    saveTasks(getTasksFromDOM());
  });

  const duplicateButton = clone.querySelector(
    ".to-do__item-button_type_duplicate"
  );
  duplicateButton.addEventListener("click", function () {
    const newItem = textElement.textContent;
    listElement.prepend(createItem(newItem));
    saveTasks(getTasksFromDOM());
  });

  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  editButton.addEventListener("click", function () {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });

  textElement.addEventListener("blur", function () {
    textElement.setAttribute("contenteditable", "false");
    saveTasks(getTasksFromDOM());
  });

  return clone;
}

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
  const tasks = [];

  itemsNamesElements.forEach(function (element) {
    tasks.push(element.textContent);
  });

  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("tasks-array", JSON.stringify(tasks));
}

function setSubmitButtonState(isValid) {
  const submitButton = document.querySelector(".to-do__submit");
  if (isValid) submitButton.removeAttribute("disabled");
  else submitButton.setAttribute("disabled", true);
}

items = loadTasks();
items.forEach(function (item) {
  listElement.append(createItem(item));
});

setSubmitButtonState(false);

formElement.addEventListener("input", function () {
  const isValid = inputElement.value.length > 0;
  setSubmitButtonState(isValid);
});

formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  listElement.prepend(createItem(inputElement.value));
  formElement.reset();
  setSubmitButtonState(false);

  saveTasks(getTasksFromDOM());
});
