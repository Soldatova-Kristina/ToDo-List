import { createHeader, createLayout} from "./layout.js";
import { initLogic } from "./logic.js"

const { switchTheme, header } = createHeader();

const {
    addTaskInput,
    addTaskBtn,
    allTasksCountBadge,
    doneTasksCountBadge,
    emptyStorage,
    form,
    storageContainer, 
    taskContainer, 
  } = createLayout();
  
  initLogic({
    switchTheme,
    header, 
    addTaskInput,
    addTaskBtn,
    allTasksCountBadge,
    doneTasksCountBadge,
    emptyStorage,
    form,
    storageContainer,
    taskContainer, 
  });
