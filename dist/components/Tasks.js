import { Component } from "../common/Component.js";
import { TaskContext } from "../contexts/TasksContext.js";
import { Task } from "./Task.js";
export class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [] };
        this.tasksContainer = null;
        this.renderTasks = this.renderTasks.bind(this);
        this.props.tasksContext.subscribe(this.renderTasks);
    }
    handleAddTask() {
        this.props.tasksContext.add(new TaskContext("", ""));
    }
    renderTasks(tasklist) {
        this.state.tasks = tasklist;
        if (this.tasksContainer) {
            this.tasksContainer.innerHTML = "";
            tasklist.forEach((task) => {
                var _a;
                const taskItem = new Task({
                    task,
                    tasksContext: this.props.tasksContext,
                    state: this.state,
                }).render();
                (_a = this.tasksContainer) === null || _a === void 0 ? void 0 : _a.appendChild(taskItem);
            });
        }
    }
    render() {
        const tasksList = document.createElement("div");
        tasksList.className = "task-column border border-black p-3";
        tasksList.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-5">
        <h1>${this.props.tasksContext.type}</h1>
        <button class="add-btn">+</button>
      </div>
    `;
        this.tasksContainer = document.createElement("div");
        this.tasksContainer.className = "task-item-container";
        this.tasksContainer.addEventListener("dragover", (ev) => ev.preventDefault());
        this.tasksContainer.addEventListener("drop", (ev) => {
            ev.preventDefault();
            const taskId = ev.dataTransfer.getData("text/plain");
            let taskObj = null;
            let sourceContext = null;
            for (const context of this.props.allContexts) {
                const found = context.tasks.find((task) => task.id === taskId);
                if (found) {
                    taskObj = found;
                    sourceContext = context; // prev context
                    break; // end the loop
                }
            }
            if (taskObj && sourceContext && sourceContext !== this.props.tasksContext) {
                sourceContext.delete(taskId); // delete from prev context
                this.props.tasksContext.add(taskObj); // add to current context
            }
        });
        const addBtn = tasksList.querySelector(".add-btn");
        addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", () => this.handleAddTask());
        this.renderTasks(this.state.tasks);
        this.renderTasks(this.props.tasksContext.tasks);
        tasksList.appendChild(this.tasksContainer);
        return tasksList;
    }
}
//# sourceMappingURL=Tasks.js.map