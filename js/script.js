function createHeader () {
const header = document.createElement("div");
header.classList.add("header");

const logo = document.createElement("div");
logo.classList.add("header__logo");

const img = document.createElement("img")
img.src = "assets/icons/Logo.svg";
img.alt = "Логотип";

logo.appendChild(img)
header.appendChild(logo);
document.body.appendChild(header);
}

createHeader();

const main = document.createElement("main")
main.classList.add("todo")
document.body.appendChild(main);

function createSection(parent, sectionClass) {
    const section = document.createElement("section");
    section.classList.add(sectionClass);
  
    const container = document.createElement("div");
    container.classList.add("container");
  
    section.appendChild(container);
    parent.appendChild(section);
  
    return container; 
}

  const formContainer = createSection(main, "todo__add-task-form");
  const countContainer = createSection(main, "todo__tasks-count");
  const storageContainer = createSection(main, "todo__tasks-storage");
  const filterContainer = createSection(main, "todo__tasks-filter");

function createElement (tag, className, parent) {
    const el = document.createElement(tag);
    if (className) el.classList.add(className);
    if (parent) parent.appendChild(el);
    return el;
}

const form = createElement("form", "form", formContainer);
const addTaskInput = createElement("input", "form__input", form);
addTaskInput.id = "addTaskInput";
addTaskInput.type = "text";
addTaskInput.name = "task";
addTaskInput.placeholder = "Adicione uma nova tarefa";
addTaskInput.required = true;
addTaskInput.autocomplete = "on";

const addTaskBtn = createElement("button", "form__btn", form);
addTaskBtn.textContent = "Criar";

fetch("assets/icons/plus.svg")
  .then(res => res.text())
  .then(svg => {
    const wrapper = document.createElement("span");
    wrapper.innerHTML = svg;
    wrapper.classList.add("btn__icon");
    button.appendChild(wrapper);
    addTaskBtn.appendChild(wrapper);
  });
