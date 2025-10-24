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
          <label>Title</label>
          <input class="modal-input title-input" type="text" value="${escapeHtml(this.props.task.title)}" />

          <label>Description</label>
          <textarea class="modal-input content-input" rows="5">${escapeHtml(this.props.task.content)}</textarea>

          <label>Category</label>
          <select class="modal-input category-input">
            <option value="">None</option>
            <option value="Bug">Bug</option>
            <option value="Feature">Feature</option>
            <option value="Improvement">Improvement</option>
          </select>

          <label>Priority</label>
          <select class="modal-input priority-input">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <label>Due Date</label>
          <input class="modal-input due-input" type="date" />
          
          <div class="modal-preview">
            <h4>Preview</h4>
            <div class="preview-card">
              <h5 class="preview-title">${escapeHtml(this.props.task.title)}</h5>
              <p class="preview-content">${escapeHtml(this.props.task.content)}</p>
            </div>
          </div>
        </div>
        <footer class="modal-footer">
          <button class="btn btn-cancel">Cancel</button>
          <button class="btn btn-save">Save</button>
        </footer>
      </div>
    `;
        const titleInput = wrapper.querySelector(".title-input");
        const contentInput = wrapper.querySelector(".content-input");
        const previewTitle = wrapper.querySelector(".preview-title");
        const previewContent = wrapper.querySelector(".preview-content");
        // 실시간 미리보기
        titleInput.addEventListener("input", () => (previewTitle.textContent = titleInput.value));
        contentInput.addEventListener("input", () => (previewContent.textContent = contentInput.value));
        (_a = wrapper
            .querySelector(".modal-overlay")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.close());
        (_b = wrapper
            .querySelector(".modal-close")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => this.close());
        (_c = wrapper
            .querySelector(".btn-cancel")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => this.close());
        (_d = wrapper.querySelector(".btn-save")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
            const categoryInput = wrapper.querySelector(".category-input");
            const priorityInput = wrapper.querySelector(".priority-input");
            const dueInput = wrapper.querySelector(".due-input");
            this.props.onSave({
                title: titleInput.value,
                content: contentInput.value,
                category: categoryInput.value,
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
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
//# sourceMappingURL=Modal.js.map