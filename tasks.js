/* globals */
let taskList = {
  college: [],
  routine: [],
};
let collegeList = [];
let routineList = [];

const addItemToList = (itemText, list) => {
  let node = document.createElement("li");
  let text = document.createTextNode(itemText);
  node.appendChild(text);
  list.appendChild(node);
};

const rmvIndexFromList = (index, list) => {
  list.removeChild(list.childNodes[index]);
};

/* DOM related */
const addTaskForm = document.getElementById("add-task-form");
const rmvTaskForm = document.getElementById("rmv-task-form");
const lists = {
  college: document.getElementById("college-list"),
  routine: document.getElementById("routine-list"),
};
const empties = {
  college: document.getElementById("college-list-empty"),
  routine: document.getElementById("routine-list-empty"),
};

addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(addTaskForm);
  taskList[formData.get("add-task-category")].push(
    formData.get("add-task-name")
  );
  addItemToList(
    formData.get("add-task-name"),
    lists[formData.get("add-task-category")]
  );
  empties[formData.get("add-task-category")].setAttribute("hidden", true);
});

rmvTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(rmvTaskForm);
  let itemIndex = taskList[formData.get("rmv-task-category")].findIndex(
    (item) => item === formData.get("rmv-task-name")
  );
  if (itemIndex >= 0) {
    taskList[formData.get("rmv-task-category")].splice(itemIndex, 1);
  }

  rmvIndexFromList(itemIndex, lists[formData.get("rmv-task-category")]);

  if (taskList[formData.get("rmv-task-category")].length == 0) {
    empties[formData.get("rmv-task-category")].removeAttribute("hidden");
  }
});
