import { App } from "./components/App.js";
import { TasksContext } from "./contexts/TasksContext.js";
const root = document.querySelector("#app");
const todoContext = new TasksContext("To-do");
const inProContext = new TasksContext("In-Progress");
const doneContext = new TasksContext("Done");
const app = new App({ todoContext, inProContext, doneContext });
if (root) {
    app.mount(root);
}
//# sourceMappingURL=main.js.map