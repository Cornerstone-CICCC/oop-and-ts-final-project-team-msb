import { Component } from "../common/Component.js";
export class ViewTaskModal extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    render() {
        var _a, _b, _c;
        const wrapper = document.createElement("div");
        wrapper.className = "modal-wrapper";
        wrapper.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal">
        <header class="modal-header">
          <h3>Task Details</h3>
          <button class="modal-close">✕</button>
        </header>

        <div class="modal-body view-only">
          <p><strong>Type:</strong> ${escapeHtml(this.props.task.type)}</p>
          <p><strong>Title:</strong> ${escapeHtml(this.props.task.title)}</p>
          <p><strong>Description:</strong><br/>${escapeHtml(this.props.task.content)}</p>
          <p><strong>Priority:</strong> ${this.props.task.priority || "Not set"}</p>
          <p><strong>Due Date:</strong> ${this.props.task.dueDate || "Not set"}</p>
        </div>

        <footer class="modal-footer">
          <button class="btn btn-cancel">Close</button>
        </footer>
      </div>
    `;
        (_a = wrapper.querySelector(".modal-overlay")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.close());
        (_b = wrapper.querySelector(".modal-close")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => this.close());
        (_c = wrapper.querySelector(".btn-cancel")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => this.close());
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
//# sourceMappingURL=ViewTaskModal.js.map