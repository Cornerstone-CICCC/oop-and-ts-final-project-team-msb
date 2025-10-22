"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_js_1 = require("./components/App.js");
const TasksContext_js_1 = require("./contexts/TasksContext.js");
const root = document.querySelector("#app");
const tasksContext = new TasksContext_js_1.TasksContext();
const app = new App_js_1.App({ tasksContext });
if (root) {
    app.mount(root);
}
//# sourceMappingURL=mian.js.map