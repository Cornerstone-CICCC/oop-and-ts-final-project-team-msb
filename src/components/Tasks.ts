import { Component } from "../common/Component.js";
import { TasksContext } from "../contexts/TasksContext.js";
import { Task } from "./Task.js";
import { TaskContext } from "../contexts/TasksContext.js";

export class Tasks extends Component {
  state: { tasks: TaskContext[] };
  tasksContainer: HTMLElement | null;

  constructor(props: { tasksContext: TasksContext }) {
    super(props);
    this.state = {
      tasks: [] as TaskContext[],
    };

    this.renderTasks = this.renderTasks.bind(this);
    this.props.tasksContext.subscribe(this.renderTasks);

    this.tasksContainer = null;
  }

  handleAddTask() {
    this.props.tasksContext.add(new TaskContext("", ""));
  }

  renderTasks(tasklist: TaskContext[]) {
    this.state.tasks = tasklist;

    if (this.tasksContainer) {
      this.tasksContainer.innerHTML = "";

      tasklist.forEach((task) => {
        const taskItem = new Task({
          task,
          tasksContext: this.props.tasksContext,
          state: this.state,
        }).render();
        this.tasksContainer?.appendChild(taskItem);
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

    const addBtn = tasksList.querySelector(".add-btn");
    addBtn?.addEventListener("click", () => {
      this.handleAddTask();
    });

    this.renderTasks(this.state.tasks);
    this.renderTasks(this.props.tasksContext.tasks);
    tasksList.appendChild(this.tasksContainer);

    return tasksList;
  }
}
