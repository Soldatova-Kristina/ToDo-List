import { createElement, createLayout } from "./layout.js";
export function initLogic ({
    addTaskInput,
    addTaskBtn,
    allTasksCountBadge,
    doneTasksCountBadge,
    emptyStorage,
    form,
    storageContainer, 
    taskContainer
  }) {

    let totalTasks = 0;
    let completedTasks = 0;

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

function updateCounter () {
    allTasksCountBadge.textContent = totalTasks;
    doneTasksCountBadge.textContent = `${completedTasks} de ${totalTasks}`; 
}

function createNewTask(text, container) {
    
    const newTask = createElement("div", "todo__new-task", container);
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
  }