import { Component } from "../common/Component.js";
import { Modal } from "./Modal.js";
export class Task extends Component {
    render() {
        var _a, _b;
        const taskItem = document.createElement("div");
        taskItem.classList = "task-item border border-dark px-3 py-2 mb-4";
        taskItem.draggable = true;
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
        taskItem.addEventListener("dragstart", (ev) => {
            if (ev.dataTransfer) {
                ev.dataTransfer.setData("text/plain", this.props.task.id);
            }
        });
        (_a = taskItem.querySelector(".update-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            this.handleEditTask();
        });
        (_b = taskItem.querySelector(".delete-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            this.handleDeleteTask();
        });
        return taskItem;
    }
    handleEditTask() {
        // 모달 생성, mount -> body에 붙임
        const modal = new Modal({
            task: this.props.task,
            onSave: (updated) => {
                // TasksContext.update 호출
                this.props.tasksContext.update(this.props.task.id, {
                    title: updated.title,
                    content: updated.content,
                });
            },
            onClose: () => {
                // 필요시 추가 동작
            },
        });
        // body에 모달 마운트 (항상 최상위)
        modal.mount(document.body);
    }
    handleDeleteTask() {
        this.props.tasksContext.delete(this.props.task.id);
    }
}
/* escapeHtml 유틸 (중복되므로 나중에 common/util로 뺄 수 있음) */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
//# sourceMappingURL=Task.js.map