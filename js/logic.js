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


let totalTasks = 0;
let completedTasks = 0;
const taskElements = [];
let isLightTheme = true;


function updateCounter () {
    allTasksCountBadge.textContent = totalTasks;
    doneTasksCountBadge.textContent = `${completedTasks} de ${totalTasks}`; 
}

function createNewTask(text, container) {
    
    const newTask = createElement("div", "todo__new-task", container);
    taskElements.push(newTask);
    totalTasks++;
    updateCounter();

    const checkBox = createElement("input", "todo__check-box", newTask);
    checkBox.type = "checkbox";

    const newTaskContent = createElement("p", "todo__new-task-content", newTask);
    newTaskContent.textContent = text;

    const newTaskImg = createElement("img", "todo__new-task-img", newTask);
    newTaskImg.src = "./assets/icons/trash noAct.svg";
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
        newTaskImg.src = "./assets/icons/trash act.svg";
      });
      
    newTaskImg.addEventListener("mouseleave", () => {
        newTaskImg.src = "./assets/icons/trash noAct.svg";
      });

    newTaskImg.addEventListener ("click", () => {
        newTask.remove();
        completedTasks--;
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

switchTheme.addEventListener("click", () => {
  isLightTheme = !isLightTheme;
  if (isLightTheme) {
    switchTheme.src = "./assets/icons/icon dark.png";

    header.style.backgroundColor = "var(--gray-100)";

    document.body.style.backgroundColor = "var(--gray-100)";
    document.body.style.color = "var(--gray-700)";
    
    allTasksCountBadge.style.backgroundColor = "var(--gray-200)";
    allTasksCountBadge.style.color = "var(--gray-700)";
  
    doneTasksCountBadge.style.backgroundColor = "var(--gray-200)";
    doneTasksCountBadge.style.color = "var(--gray-700)";
  
    addTaskInput.style.backgroundColor = "var(--gray-200)";
    addTaskInput.style.color = "var(--gray-700)";
  
  } else {
    switchTheme.src = "./assets/icons/icon light.png";

    header.style.backgroundColor = "var(--gray-700)";

    document.body.style.backgroundColor = "var(--gray-600)";
    document.body.style.color = "var(--gray-100)";
  
    allTasksCountBadge.style.backgroundColor = "var(--gray-400)";
    allTasksCountBadge.style.color = "var(--gray-100)";
  
    doneTasksCountBadge.style.backgroundColor = "var(--gray-400)";
    doneTasksCountBadge.style.color = "var(--gray-100)";
  
    addTaskInput.style.backgroundColor = "var(--gray-500)";
    addTaskInput.style.color = "var(--gray-100)";
  }

});
  }