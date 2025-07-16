import { createElement, createLayout, createHeader } from "./layout.js";
export function initLogic ({
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

function updateThemeUI() {
  switchTheme.setAttribute("src", isDarkTheme
    ? "/ToDO-List/assets/icons/icon-dark.png"
    : "/ToDO-List/assets/icons/icon-light.png");

  header.style.backgroundColor = isDarkTheme ? "var(--gray-700)" : "var(--gray-200)";
  document.body.style.backgroundColor = isDarkTheme ? "var(--gray-600)" : "var(--gray-100)";
  document.body.style.color = isDarkTheme ? "var(--gray-100)" : "var(--gray-700)";
  allTasksCountBadge.style.backgroundColor = isDarkTheme ? "var(--gray-400)" : "var(--gray-200)";
  allTasksCountBadge.style.color = isDarkTheme ? "var(--gray-100)" : "var(--gray-700)";
  doneTasksCountBadge.style.backgroundColor = isDarkTheme ? "var(--gray-400)" : "var(--gray-200)";
  doneTasksCountBadge.style.color = isDarkTheme ? "var(--gray-100)" : "var(--gray-700)";
  addTaskInput.style.backgroundColor = isDarkTheme ? "var(--gray-500)" : "var(--gray-200)";
  addTaskInput.style.color = isDarkTheme ? "var(--gray-100)" : "var(--gray-700)";

  const allTasks = document.querySelectorAll(".todo__new-task");
  allTasks.forEach(task => {
    task.style.backgroundColor = isDarkTheme ? "var(--gray-500)" : "var(--blue-dark)";
    task.style.color = isDarkTheme ? "var(--gray-100)" : "var(--gray-700)";
  });
}

switchTheme.addEventListener("click", () => {
  isDarkTheme = !isDarkTheme;
  updateThemeUI(); 
});

function updateCounter () {
    allTasksCountBadge.textContent = totalTasks;
    doneTasksCountBadge.textContent = `${completedTasks} de ${totalTasks}`; 
}

function createNewTask(text, container) {
    
    const newTask = createElement("div", "todo__new-task", container);
    totalTasks++;
    updateCounter();

    if (isDarkTheme) {
      newTask.style.backgroundColor = ("var(--gray-500)")
    } else {
      newTask.style.backgroundColor = ("var(--blue-dark)");
    }

    const checkBox = createElement("input", "todo__check-box", newTask);
    checkBox.type = "checkbox";

    const newTaskContent = createElement("p", "todo__new-task-content", newTask);
    newTaskContent.textContent = text;

    const newTaskImg = createElement("img", "todo__new-task-img", newTask);
    newTaskImg.src = "/ToDO-List/assets/icons/trash-noAct.svg";
    newTaskImg.alt = "Trash icon";

    checkBox.addEventListener("change", () => {
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
    })

    newTaskImg.addEventListener("mouseenter", () => {
        newTaskImg.src = "/ToDO-List/assets/icons/trash-act.svg";
      });
      
    newTaskImg.addEventListener("mouseleave", () => {
        newTaskImg.src = "/ToDO-List/assets/icons/trash-noAct.svg";
      });

    newTaskImg.addEventListener ("click", () => {
        newTask.remove();
        totalTasks--;

        if (container.children.length === 0) {
            emptyStorage.classList.remove("hidden");
          }
          updateCounter();
    })
}

addTaskBtn.addEventListener("click", (e) => {
e.preventDefault(); 

if (addTaskInput.value.trim() === "") {
    alert ("Adicione uma tarefa");
    return
} else {
    emptyStorage.classList.add("hidden");
    createNewTask(addTaskInput.value.trim(),taskContainer); 
    addTaskInput.value = "";
}
});

  }