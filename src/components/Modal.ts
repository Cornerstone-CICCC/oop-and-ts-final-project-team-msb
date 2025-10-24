import { Component } from "../common/Component.js";
import { TaskContext } from "../contexts/TasksContext.js";

type ModalProps = {
  task: TaskContext;
  onSave: (updated: {
    title?: string;
    content?: string;
    priority?: string;
    category?: string;
    dueDate?: string;
  }) => void;
  onClose?: () => void;
};

export class Modal extends Component {
  props: ModalProps;

  constructor(props: ModalProps) {
    super(props);
    this.props = props;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  render(): HTMLElement {
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
          <input class="modal-input title-input" type="text" value="${escapeHtml(
            this.props.task.title
          )}" />

          <label>Description</label>
          <textarea class="modal-input content-input" rows="5">${escapeHtml(
            this.props.task.content
          )}</textarea>

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
              <h5 class="preview-title">${escapeHtml(
                this.props.task.title
              )}</h5>
              <p class="preview-content">${escapeHtml(
                this.props.task.content
              )}</p>
            </div>
          </div>
        </div>
        <footer class="modal-footer">
          <button class="btn btn-cancel">Cancel</button>
          <button class="btn btn-save">Save</button>
        </footer>
      </div>
    `;

    const titleInput = wrapper.querySelector(
      ".title-input"
    ) as HTMLInputElement;
    const contentInput = wrapper.querySelector(
      ".content-input"
    ) as HTMLTextAreaElement;
    const previewTitle = wrapper.querySelector(".preview-title") as HTMLElement;
    const previewContent = wrapper.querySelector(
      ".preview-content"
    ) as HTMLElement;

    // 실시간 미리보기
    titleInput.addEventListener(
      "input",
      () => (previewTitle.textContent = titleInput.value)
    );
    contentInput.addEventListener(
      "input",
      () => (previewContent.textContent = contentInput.value)
    );

    wrapper
      .querySelector(".modal-overlay")
      ?.addEventListener("click", () => this.close());
    wrapper
      .querySelector(".modal-close")
      ?.addEventListener("click", () => this.close());
    wrapper
      .querySelector(".btn-cancel")
      ?.addEventListener("click", () => this.close());

    wrapper.querySelector(".btn-save")?.addEventListener("click", () => {
      const categoryInput = wrapper.querySelector(
        ".category-input"
      ) as HTMLSelectElement;
      const priorityInput = wrapper.querySelector(
        ".priority-input"
      ) as HTMLSelectElement;
      const dueInput = wrapper.querySelector(".due-input") as HTMLInputElement;

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
    if (this.props.onClose) this.props.onClose();
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") this.close();
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
