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


function createNewTask(text, container) {
    
    const newTask = createElement("div", "todo__new-task", container);

    const checkBox = createElement("input", "todo__check-box", newTask);
    checkBox.type = "checkbox";

    const newTaskContent = createElement("p", "todo__new-task-content", newTask);
    newTaskContent.textContent = text;

    const newTaskImg = createElement("img", "todo__new-task-img", newTask);
    newTaskImg.src = "./assets/icons/trash noAct.svg";
    newTaskImg.alt = "Trash icon";
}
  }