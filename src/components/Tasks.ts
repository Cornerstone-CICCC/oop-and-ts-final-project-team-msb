import { Component } from "../common/Component.js";
import { TasksContext, TaskContext } from "../contexts/TasksContext.js";
import { Task } from "./Task.js";

export class Tasks extends Component {
  state: { tasks: TaskContext[] };
  tasksContainer: HTMLElement | null;

  constructor(props: {
    tasksContext: TasksContext;
    allContexts: TasksContext[];
  }) {
    super(props);
    this.state = { tasks: [] };
    this.tasksContainer = null;

    this.renderTasks = this.renderTasks.bind(this);
    this.props.tasksContext.subscribe(this.renderTasks);
  }

  handleAddTask() {
    this.props.tasksContext.add(new TaskContext("", "", ""));
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
        <button class="add-btn bg-transparent border border-0"><i class="fa-solid fa-plus fa-lg"></i></button>
      </div>
    `;

    this.tasksContainer = document.createElement("div");
    this.tasksContainer.className = "task-item-container";

    this.tasksContainer.addEventListener("dragover", (ev) =>
      ev.preventDefault(),
    );
    this.tasksContainer.addEventListener("drop", (ev) => {
      ev.preventDefault();
      const taskId = ev.dataTransfer!.getData("text/plain");

      let taskObj: TaskContext | null = null;
      let sourceContext: TasksContext | null = null;

      for (const context of this.props.allContexts) {
        const found = context.tasks.find(
          (task: { id: string; title: string; content: string }) =>
            task.id === taskId,
        );

        if (found) {
          taskObj = found;
          sourceContext = context; // prev context
          break; // end the loop
        }
      }

      if (
        taskObj &&
        sourceContext &&
        sourceContext !== this.props.tasksContext
      ) {
        sourceContext.delete(taskId); // delete from prev context
        this.props.tasksContext.add(taskObj); // add to current context
      }
    });

    const addBtn = tasksList.querySelector(".add-btn");
    addBtn?.addEventListener("click", () => this.handleAddTask());

    this.renderTasks(this.state.tasks);
    this.renderTasks(this.props.tasksContext.tasks);
    tasksList.appendChild(this.tasksContainer);

    return tasksList;
  }
}
