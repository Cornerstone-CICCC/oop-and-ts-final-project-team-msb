import { Component } from "../common/Component.js";
import { Modal } from "./Modal.js";
export class Task extends Component {
    render() {
        var _a, _b;
        const taskItem = document.createElement("div");
        taskItem.classList = "task-item border border-dark px-3 py-2 mb-4";
        taskItem.draggable = true;
        taskItem.innerHTML = `
      <div class="sub-type-edit-btn d-flex justify-content-between mb-2">
        <div>
          <span><i class="fa-regular fa-circle-dot"></i></span>
        <input type="text" placeholder="Enter title..." id="input-type" value = "${this.props.task.type}" />
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
        (_a = taskItem.querySelector(".delete-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            this.handleDeleteTask();
        });
        /* ---------------------------*/
        (_b = taskItem.querySelector(".update-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            this.openModal();
        });
        const inputType = taskItem.querySelector("#input-type");
        inputType.addEventListener("change", () => {
            this.handleEditTask(inputType.value, this.props.task.title, this.props.task.content);
            console.log(this.props.tasksContext.tasks);
        });
        if (Task.firstRender) {
            setTimeout(() => inputType.focus(), 0);
            Task.firstRender = false;
        }
        const inputTitle = taskItem.querySelector("#input-title");
        inputTitle.addEventListener("change", () => {
            this.handleEditTask(this.props.task.type, inputTitle.value, this.props.task.content);
            console.log(this.props.tasksContext.tasks);
        });
        const inputDes = taskItem.querySelector("#input-content");
        inputDes.addEventListener("change", () => {
            this.handleEditTask(this.props.task.type, this.props.task.title, inputDes.value);
            console.log(this.props.tasksContext.tasks);
        });
        taskItem.querySelector("#input-content");
        inputDes.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.handleEditTask(this.props.task.type, this.props.task.title, inputDes.value);
                console.log(this.props.tasksContext.tasks);
            }
        });
        return taskItem;
    }
    handleEditTask(taskType, taskTitle, taskDes) {
        this.props.tasksContext.update(this.props.task.id, {
            type: taskType,
            title: taskTitle,
            content: taskDes,
        });
    }
    /*-----------------------------*/
    openModal() {
        const modal = new Modal({
            task: this.props.task,
            onSave: (updated) => {
                this.props.tasksContext.update(this.props.task.id, {
                    type: updated.type,
                    title: updated.title,
                    content: updated.content,
                });
            },
            onClose: () => { },
        });
        modal.mount(document.body);
    }
    handleDeleteTask() {
        this.props.tasksContext.delete(this.props.task.id);
    }
}
Task.firstRender = true;
/*----------------------------*/
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
//# sourceMappingURL=Task.js.map