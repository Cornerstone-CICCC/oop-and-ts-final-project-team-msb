import { Component } from "../common/Component.js";
export class Modal extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    render() {
        var _a, _b, _c, _d;
        const wrapper = document.createElement("div");
        wrapper.className = "modal-wrapper";
        wrapper.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal">
        <header class="modal-header">
          <h3>Edit Task</h3>
          <button class="modal-close">✕</button>
        </header>

        <div class="modal-body">
          <label>Type</label>
          <input class="modal-input type-input" type="text" value="${escapeHtml(this.props.task.type)}" />

          <label>Title</label>
          <input class="modal-input title-input" type="text" value="${escapeHtml(this.props.task.title)}" />

          <label>Description</label>
          <textarea class="modal-input content-input" rows="3">${escapeHtml(this.props.task.content)}</textarea>

          <label>Priority</label>
          <select class="modal-input priority-input">
            <option value="Low" ${this.props.task.priority === "Low" ? "selected" : ""}>Low</option>
            <option value="Medium" ${this.props.task.priority === "Medium" ? "selected" : ""}>Medium</option>
            <option value="High" ${this.props.task.priority === "High" ? "selected" : ""}>High</option>
          </select>

          <label>Due Date</label>
          <input class="modal-input due-input" type="date" value="${this.props.task.dueDate || ""}" />
        </div>

        <footer class="modal-footer">
          <button class="btn btn-cancel">Cancel</button>
          <button class="btn btn-save">Save</button>
        </footer>
      </div>
    `;
        const typeInput = wrapper.querySelector(".type-input");
        const titleInput = wrapper.querySelector(".title-input");
        const contentInput = wrapper.querySelector(".content-input");
        const priorityInput = wrapper.querySelector(".priority-input");
        const dueInput = wrapper.querySelector(".due-input");
        (_a = wrapper
            .querySelector(".modal-overlay")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.close());
        (_b = wrapper
            .querySelector(".modal-close")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => this.close());
        (_c = wrapper
            .querySelector(".btn-cancel")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => this.close());
        (_d = wrapper.querySelector(".btn-save")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
            // 변경 사항 전달
            this.props.onSave({
                type: typeInput.value.trim(),
                title: titleInput.value.trim(),
                content: contentInput.value.trim(),
                priority: priorityInput.value,
                dueDate: dueInput.value,
            });
            this.close();
        });
        document.addEventListener("keydown", this.handleKeyDown);
        return wrapper;
    }
    close() {
        document.removeEventListener("keydown", this.handleKeyDown);
        this.unmount();
        if (this.props.onClose)
            this.props.onClose();
    }
    handleKeyDown(e) {
        if (e.key === "Escape")
            this.close();
    }
}
function escapeHtml(str) {
    return String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
//# sourceMappingURL=Modal.js.map