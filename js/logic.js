import { createElement } from "./layout.js";
export function initLogic({
  header,
  switchTheme,
  addTaskInput,
  addTaskBtn,
  allTasksCountBadge,
  doneTasksCountBadge,
  emptyStorage,
  taskContainer,
}) {

let isDarkTheme = true;
let totalTasks = 0;
let completedTasks = 0;

const themeStyles = {
  dark: {
    headerBg: "var(--gray-700)",
    bodyBg: "var(--gray-600)",
    bodyColor: "var(--gray-100)",
    allBadgeBg: "var(--gray-400)",
    allBadgeColor:  "var(--gray-100)",
    doneBadgeBg: "var(--gray-400)", 
    doneBadgeColor: "var(--gray-100)", 
    inputBg: "var(--gray-500)",
    inputColor: "var(--gray-100)",
    taskBg: "var(--gray-500)",
  }, 
  light: {
    headerBg: "var(--gray-200)",
    bodyBg: "var(--gray-100)",
    bodyColor: "var(--gray-700)",
    allBadgeBg: "var(--gray-200)",
    allBadgeColor:  "var(--gray-700)",
    doneBadgeBg: "var(--gray-200)", 
    doneBadgeColor: "var(--gray-700)", 
    inputBg: "var(--gray-200)",
    inputColor: "var(--gray-700)",
    taskBg: "var(--blue-dark)",
  }
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function loadTasksFromStorage() {
  const data = localStorage.getItem("todoTasks");
  return data ? JSON.parse(data) : [];
}

let tasks = loadTasksFromStorage();

function updateCounter() {
  allTasksCountBadge.textContent = totalTasks;
  doneTasksCountBadge.textContent = `${completedTasks} de ${totalTasks}`;
}

function updateThemeUI(isDarkTheme) {
  const theme = isDarkTheme ? themeStyles.dark : themeStyles.light;

  switchTheme.setAttribute("src", isDarkTheme ? "./assets/icons/icon-dark.png" : "./assets/icons/icon-light.png");

  header.style.backgroundColor = theme.headerBg;
  document.body.style.backgroundColor = theme.bodyBg;
  document.body.style.color = theme.bodyColor;
  allTasksCountBadge.style.backgroundColor = theme.allBadgeBg;
  allTasksCountBadge.style.color = theme.allBadgeColor;
  doneTasksCountBadge.style.backgroundColor = theme.doneBadgeBg;
  doneTasksCountBadge.style.color = theme.doneBadgeColor;
  addTaskInput.style.backgroundColor = theme.inputBg;
  addTaskInput.style.color = theme.inputColor;

  const allTasks = document.querySelectorAll(".todo__new-task");
  allTasks.forEach((task) => {
    task.style.backgroundColor = theme.taskBg;
    task.style.color = theme.bodyColor;
  });
}

switchTheme.addEventListener("click", () => {
  isDarkTheme = !isDarkTheme;
  updateThemeUI(isDarkTheme); 
});

function createNewTask(text, container, completed = false, save = true) {
  const newTask = createElement("div", "todo__new-task", container);
  totalTasks++;

  const theme = isDarkTheme ? themeStyles.dark : themeStyles.light;
  newTask.style.backgroundColor = theme.taskBg;

  const checkBox = createElement("input", "todo__check-box", newTask);
  checkBox.type = "checkbox";
  checkBox.checked = completed;

  const newTaskContent = createElement("p", "todo__new-task-content", newTask);
  newTaskContent.textContent = text;

  const newTaskImg = createElement("img", "todo__new-task-img", newTask);
  newTaskImg.src = "./assets/icons/trash-noAct.svg";
  newTaskImg.alt = "trash icon";

  if (completed) {
    completedTasks++;
    newTaskContent.style.textDecoration = "line-through";
    newTaskContent.style.color = "var(--gray-300)";
  }

  checkBox.addEventListener("change", () => {
    const idx = Array.from(taskContainer.children).indexOf(newTask);
    tasks[idx].completed = checkBox.checked;
    if (checkBox.checked) {
      completedTasks++;
      newTaskContent.style.textDecoration = "line-through";
      newTaskContent.style.color = "var(--gray-300)";
    } else {
      completedTasks--;
      newTaskContent.style.textDecoration = "none";
      newTaskContent.style.color = "var(--gray-100)";
    }
    updateCounter();
    saveTasksToStorage(tasks);
  });

  newTaskImg.addEventListener("mouseenter", () => {
    newTaskImg.src = "./assets/icons/trash-act.svg";
  });

  newTaskImg.addEventListener("mouseleave", () => {
    newTaskImg.src = "./assets/icons/trash-noAct.svg";
  });

  newTaskImg.addEventListener("click", () => {
    const idx = Array.from(taskContainer.children).indexOf(newTask);
    if (checkBox.checked) {
      completedTasks--;
    }
    newTask.remove();
    totalTasks--;
    tasks.splice(idx, 1);
    updateCounter();
    saveTasksToStorage(tasks);
    if (container.children.length === 0) {
      emptyStorage.classList.remove("hidden");
    }
  });

  if (save) {
    tasks.push({ text, completed });
    saveTasksToStorage(tasks);
  }

  updateCounter();
}

function renderTasks() {
  taskContainer.innerHTML = "";
  totalTasks = 0;
  completedTasks = 0;
  tasks.forEach((task) => {
    createNewTask(task.text, taskContainer, task.completed, false);
  });
  updateCounter();
  emptyStorage.classList.toggle("hidden", tasks.length > 0);
}

function filterTasks(filter) {
  const allTasks = document.querySelectorAll(".todo__new-task");
  let visibleCount = 0;

  allTasks.forEach((task) => {
    const checkbox = task.querySelector('input[type="checkbox"]');
    const isChecked = checkbox.checked;
    if (
      filter === "Todas" ||
      (filter === "Activas" && !isChecked) ||
      (filter === "Completadas" && isChecked)
    ) {
      task.style.display = "flex";
      visibleCount++;
    } else {
      task.style.display = "none";
    }
  });
  const emptyBlock = document.querySelector(".todo__tasks-empty");
  if (emptyBlock) {
    if (visibleCount === 0) {
      emptyBlock.classList.remove("hidden");
    } else {
      emptyBlock.classList.add("hidden");
    }
  }
}

addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (addTaskInput.value.trim() === "") {
    alert("Adicione uma tarefa");
    addTaskInput.value = "";
    return;
  } else {
    emptyStorage.classList.add("hidden");
    createNewTask(addTaskInput.value.trim(), taskContainer);
    addTaskInput.value = "";
  }
});

document.querySelectorAll(".todo__tasks-filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".todo__tasks-filter-btn").forEach((b) => {
      b.classList.remove("todo__tasks-filter-btn-active");
    });
    btn.classList.add("todo__tasks-filter-btn-active");
    filterTasks(btn.dataset.filter);
  });
});

renderTasks();

}