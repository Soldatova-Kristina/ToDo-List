export function createHeader () {
    const header = document.createElement("div");
    header.classList.add("header");
    
    const logo = document.createElement("div");
    logo.classList.add("header__logo");
    
    const logoImg = document.createElement("img")
    logoImg.src = "/assets/icons/Logo.svg";
    logoImg.alt = "logo";
    
    const switchTheme = document.createElement("img");
    switchTheme.classList.add("todo__switch-theme");
    switchTheme.src = "/assets/icons/icon-dark.png";
    switchTheme.alt = "icon dark";
    switchTheme.style.width = "40px";
    switchTheme.style.height = "40px";

    logo.appendChild(logoImg)
    header.appendChild(logo);
    header.appendChild(switchTheme)
    document.body.appendChild(header);

    return { switchTheme, header };
    };
    
export function createSection(parent, sectionClass, containerExtraClass = "") {
        const section = document.createElement("section");
        section.classList.add(sectionClass);
      
        const container = document.createElement("div");
        container.classList.add("container");
      
        if (containerExtraClass) {
            container.classList.add(containerExtraClass);
          }
    
        section.appendChild(container);
        parent.appendChild(section);
      
        return container; 
    };
    
export function createElement (tag, className, parent) {
        const el = document.createElement(tag);
        if (className) el.classList.add(className);
        if (parent) parent.appendChild(el);
        return el;
    };
    
export function createLayout () {
    const main = createElement("main", "todo", document.body);
    
    const formContainer = createSection(main, "todo__add-tasks-form");
    const countContainer = createSection(main, "todo__tasks-count", "todo__tasks-count-container");
    const storageContainer = createSection(main, "todo__tasks-storage");
    const filterContainer = createSection(main, "todo__tasks-filter", "todo__tasks-filter-container");
    
    const form = createElement("form", "form", formContainer);
    const addTaskInput = createElement("input", "form__input", form);
    addTaskInput.id = "addTaskInput";
    addTaskInput.type = "text";
    addTaskInput.name = "task";
    addTaskInput.placeholder = "Adicione uma nova tarefa";
    
    const addTaskBtn = createElement("button", "form__btn", form);
    addTaskBtn.textContent = "Criar";
    
    const addTaskBtnImg = createElement("img", null, addTaskBtn);
    addTaskBtnImg.src = "/assets/icons/icon-plus.svg";
    addTaskBtnImg.alt = "icon plus";
    
    const allTasksCount = createElement("p", "todo__tasks-count-all", countContainer);
    allTasksCount.textContent = "Tarefas criadas";
    
    const doneTasksCount = createElement("p","todo__tasks-count-done", countContainer);
    doneTasksCount.textContent = "Concludas";
    
    const allTasksCountBadge = createElement("span", "todo__tasks-count-badge", allTasksCount);
    allTasksCountBadge.textContent = "0";
    
    const doneTasksCountBadge = createElement("span", "todo__tasks-count-badge", doneTasksCount);
    doneTasksCountBadge.textContent = "0 de 0";
    
    const emptyStorage = createElement("div", "todo__tasks-empty", storageContainer);
    
    const emptyStorageImg = createElement("img", "todo__tasks-empty-img", emptyStorage);
    emptyStorageImg.src = "/assets/icons/Clipboard.svg";
    emptyStorageImg.alt = "clipboard icon";
    
    const emptyStorageText1 = createElement("p", "todo__tasks-empty-text-1", emptyStorage);
    emptyStorageText1.textContent = "Você ainda não tem tarefas cadastradas";
    
    const emptyStorageText2 = createElement("p", "todo__tasks-empty-text-2", emptyStorage);
    emptyStorageText2.textContent = "Crie tarefas e organize seus itens a fazer";
    
    const taskContainer = createElement("div", "todo__new-task-container", storageContainer);

    
    ["Todas", "Activas", "Completadas"].forEach(text => {
        const btn = createElement("button", "todo__tasks-filter-btn", filterContainer);
        btn.textContent = text;
        btn.dataset.filter = text; 
      });


      return {
        addTaskInput,
        addTaskBtn,
        allTasksCountBadge,
        doneTasksCountBadge,
        emptyStorage,
        form,
        storageContainer,
        taskContainer, 
      };

} 
