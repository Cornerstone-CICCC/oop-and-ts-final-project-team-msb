import { Component } from "../common/Component.js";

export class Task extends Component {
  render() {
    const taskItem = document.createElement("div");
    taskItem.classList = "task-item border border-dark px-3 py-2 mb-4";
    taskItem.innerHTML = `
      <div class="sub-type-edit-btn d-flex justify-content-between">
        <span>type</span>
        <button class="update-btn">Edit</button>

      </div>

      <div>
        <h3>Add a Title</h3>
        <p>${this.props.task.title}</p>
      </div>

      <div>
        <h3>Add a description</h3>
        <p>${this.props.task.content}</p>
      </div>

      <button class="delete-btn">Delete</button>


    `;

    taskItem.querySelector(".update-btn")?.addEventListener("click", () => {
      this.handleEditTask();
      console.log(this.props.task);
    });

    taskItem.querySelector(".delete-btn")?.addEventListener("click", () => {
      this.handleDeleteTask();
    });

    return taskItem;
  }

  handleEditTask() {
    this.props.tasksContext.update(this.props.task.id, {
      title: "Change",
      content: "Check to see if it's working",
    });
  }

  handleDeleteTask() {
    this.props.tasksContext.delete(this.props.task.id);
  }
}
