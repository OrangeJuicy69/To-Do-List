// index.js

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskListUL = document.getElementById("taskList");
const clearCompletedButton = document.getElementById("clearCompletedButton");
const clearAllButton = document.getElementById("clearALL");

let allTasks = getTasks();
updateTaskList();

// ➕ Task hinzufügen
addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText.length > 0) {
    const taskObject = {
      text: taskText,
      completed: false,
    };
    allTasks.push(taskObject);
    updateTaskList();
    saveTasks();
    taskInput.value = "";
  }
}

// 📋 Liste updaten
function updateTaskList() {
  taskListUL.innerHTML = "";
  allTasks.forEach((task, taskIndex) => {
    const taskItem = createTaskItem(task, taskIndex);
    taskListUL.append(taskItem);
  });
}

// 🎨 Task-Item erstellen
function createTaskItem(task, taskIndex) {
  const taskId = "task-" + taskIndex;
  const taskLI = document.createElement("li");
  taskLI.className = "task";
  taskLI.innerHTML = `
    <input type="checkbox" id="${taskId}">
    <label for="${taskId}" class="task-text">${task.text}</label>
    <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
  `;

  // ✅ Checkbox
  const checkbox = taskLI.querySelector("input");
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => {
    allTasks[taskIndex].completed = checkbox.checked;
    saveTasks();
  });

  // 🗑️ Delete Button
  const deleteButton = taskLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTask(taskIndex);
  });

  return taskLI;
}

// ❌ Task löschen
function deleteTask(taskIndex) {
  allTasks = allTasks.filter((_, i) => i !== taskIndex);
  saveTasks();
  updateTaskList();
}

// 🧹 Completed löschen
clearCompletedButton.addEventListener("click", () => {
  allTasks = allTasks.filter((task) => !task.completed);
  saveTasks();
  updateTaskList();
});

// 🗑️ Alles löschen
clearAllButton.addEventListener("click", () => {
  allTasks = [];
  saveTasks();
  updateTaskList();
});

// 💾 Speichern
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

// 📂 Laden
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}
