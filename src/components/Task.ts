import { Component } from "../common/Component.js";

export class Task extends Component {
  render() {
    const taskItem = document.createElement("div");
    taskItem.classList = "task-item border border-dark px-3 py-2 mb-4";
    taskItem.draggable = true;
    taskItem.innerHTML = `
      <div class="sub-type-edit-btn d-flex justify-content-between mb-2">
        <div>
          <span><i class="fa-regular fa-circle-dot"></i></span>
          <span>${this.props.task.type}</span>
        </div>
        <div>
          <button class="update-btn bg-transparent border border-0"><i class="fa-solid fa-pen"></i></button>
          <button class="delete-btn bg-transparent border border-0"><i class="fa-solid fa-trash"></i></button>
        </div>

      </div>

      <div class="mb-3">
        <h5>Title</h5>
        <input type="text" placeholder="Enter title..." id="input-title" value = "${this.props.task.title}" />
      </div>

      <div>
        <h5>Description</h5>
        <textarea id="input-content" placeholder="Enter Content..." rows="4" cols="35">${this.props.task.content}</textarea>
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

    const inputTitle = taskItem.querySelector(
      "#input-title",
    ) as HTMLInputElement;
    inputTitle.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.handleEditTask(inputTitle.value, this.props.task.content);
        console.log(this.props.tasksContext.tasks);
      }
    });

    const inputDes = taskItem.querySelector(
      "#input-content",
    ) as HTMLInputElement;
    inputDes.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.handleEditTask(this.props.task.content, inputDes.value);
        console.log(this.props.tasksContext.tasks);
      }
    });

    return taskItem;
  }

  handleEditTask(taskTitle?: string, taskDes?: string) {
    this.props.tasksContext.update(this.props.task.id, {
      title: taskTitle,
      content: taskDes,
    });
  }

  handleDeleteTask() {
    this.props.tasksContext.delete(this.props.task.id);
  }
}
