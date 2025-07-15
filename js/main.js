import { createHeader, createLayout} from "./layout.js";
import { initLogic } from "./logic.js"

createHeader();

const {
    addTaskInput,
    addTaskBtn,
    allTasksCountBadge,
    doneTasksCountBadge,
    emptyStorage,
    form,
    storageContainer, 
    taskContainer
  } = createLayout();
  
  initLogic({
    addTaskInput,
    addTaskBtn,
    allTasksCountBadge,
    doneTasksCountBadge,
    emptyStorage,
    form,
    storageContainer,
    taskContainer
  });
