import { createElement} from "./layout.js";
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
  }
}

function updateThemeUI(isDarkTheme) {
  const theme = isDarkTheme ? themeStyles.dark : themeStyles.light;

  switchTheme.setAttribute("src", isDarkTheme
    ? "/assets/icons/icon-dark.png"
    : "/assets/icons/icon-light.png");

  header.style.backgroundColor = theme.headerBg;
  document.body.style.backgroundColor = theme.bodyBg;
  document.body.style.color = theme.bodyColor;
  allTasksCountBadge.style.backgroundColor = theme.badgeBg;
  allTasksCountBadge.style.color = theme.badgeColor;
  doneTasksCountBadge.style.backgroundColor = theme.badgeBg;
  doneTasksCountBadge.style.color = theme.badgeColor;
  addTaskInput.style.backgroundColor = theme.inputBg;
  addTaskInput.style.color = theme.inputColor;

  const allTasks = document.querySelectorAll(".todo__new-task");
  allTasks.forEach(task => {
    task.style.backgroundColor = theme.bodyBg;
    task.style.color = theme.bodyColor;
  });
}

switchTheme.addEventListener("click", () => {
  isDarkTheme = !isDarkTheme;
  updateThemeUI(isDarkTheme); 
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
    newTaskImg.src = "/assets/icons/trash-noAct.svg";
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
        newTaskImg.src = "/assets/icons/trash-act.svg";
      });
      
    newTaskImg.addEventListener("mouseleave", () => {
        newTaskImg.src = "/assets/icons/trash-noAct.svg";
      });

    newTaskImg.addEventListener ("click", () => {
      const checkbox = newTask.querySelector('input[type="checkbox"]');
      if (checkbox.checked) {
          completedTasks--;
      }
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
    addTaskInput.value = "";
    return
} else {
    emptyStorage.classList.add("hidden");
    createNewTask(addTaskInput.value.trim(),taskContainer); 
    addTaskInput.value = "";
}
});

function filterTasks(filter) {
  const allTasks = document.querySelectorAll(".todo__new-task");
  allTasks.forEach((task) => {
    const checkbox = task.querySelector('input[type="checkbox"]');
    const isChecked = checkbox.checked;
    if (
      filter === "Todas" ||
      (filter === "Activas" && !isChecked) ||
      (filter === "Completadas" && isChecked)
    ) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

document.querySelectorAll(".todo__tasks-filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".todo__tasks-filter-btn").forEach((b) => {
      b.classList.remove("todo__tasks-filter-btn-active");
    });
 
    btn.classList.add("todo__tasks-filter-btn-active");
    filterTasks(btn.textContent.trim());
  });
});

  }