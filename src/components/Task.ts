import { Component } from "../common/Component.js";

export class Task extends Component {
  static firstRender = true;

  render() {
    const taskItem = document.createElement("div");
    taskItem.classList = "task-item border border-dark px-3 py-2 mb-4";
    taskItem.draggable = true;
    taskItem.innerHTML = `
  <div class="sub-type-edit-btn">
    <div class="type-input-group">
      <span class="dot" style="background-color: #d6d6d6;"></span>
      <input
        type="text"
        placeholder="Enter title..."
        id="input-type"
        value="${this.props.task.type}"
      />
    </div>
    <div>
      <button class="update-btn bg-transparent border-0">
        <i class="fa-solid fa-pen"></i>
      </button>
      <button class="delete-btn bg-transparent border-0">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </div>

  <div class="mb-3">
    <h5>Title</h5>
    <input
      type="text"
      placeholder="Enter title..."
      id="input-title"
      value="${this.props.task.title}"
    />
  </div>

  <div>
    <h5>Description</h5>
    <textarea
      id="input-content"
      placeholder="Enter Content..."
      rows="4"
      cols="35"
    >${this.props.task.content}</textarea>
  </div>
`;


    taskItem.addEventListener("dragstart", (ev) => {
      if (ev.dataTransfer) {
        ev.dataTransfer.setData("text/plain", this.props.task.id);
      }
    });

    taskItem.querySelector(".delete-btn")?.addEventListener("click", () => {
      this.handleDeleteTask();
    });

    const inputType = taskItem.querySelector("#input-type") as HTMLInputElement;
    inputType.addEventListener("change", () => {
      this.handleEditTask(
        inputType.value,
        this.props.task.title,
        this.props.task.content,
      );
      console.log(this.props.tasksContext.tasks);
    });

    if (Task.firstRender) {
      setTimeout(() => inputType.focus(), 0);
      Task.firstRender = false;
    }

    const inputTitle = taskItem.querySelector(
      "#input-title",
    ) as HTMLInputElement;
    inputTitle.addEventListener("change", () => {
      this.handleEditTask(
        this.props.task.type,
        inputTitle.value,
        this.props.task.content,
      );
      console.log(this.props.tasksContext.tasks);
    });

    const inputDes = taskItem.querySelector(
      "#input-content",
    ) as HTMLInputElement;
    inputDes.addEventListener("change", () => {
      this.handleEditTask(
        this.props.task.type,
        this.props.task.title,
        inputDes.value,
      );
      console.log(this.props.tasksContext.tasks);
    });

    taskItem.querySelector("#input-content") as HTMLInputElement;
    inputDes.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.handleEditTask(
          this.props.task.type,
          this.props.task.title,
          inputDes.value,
        );
        console.log(this.props.tasksContext.tasks);
      }
    });

    return taskItem;
  }

  handleEditTask(taskType?: string, taskTitle?: string, taskDes?: string) {
    this.props.tasksContext.update(this.props.task.id, {
      type: taskType,
      title: taskTitle,
      content: taskDes,
    });
  }

  handleDeleteTask() {
    this.props.tasksContext.delete(this.props.task.id);
  }
}
