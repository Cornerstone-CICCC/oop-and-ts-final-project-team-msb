import { Component } from "../common/Component.js";
import { TaskContext } from "../contexts/TasksContext.js";

type ModalProps = {
  task: TaskContext;
  onSave: (updated: {
    type?: string;
    title?: string;
    content?: string;
    priority?: string;
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
          <label>Type</label>
          <input class="modal-input type-input" type="text" value="${escapeHtml(
            this.props.task.type
          )}" />

          <label>Title</label>
          <input class="modal-input title-input" type="text" value="${escapeHtml(
            this.props.task.title
          )}" />

          <label>Description</label>
          <textarea class="modal-input content-input" rows="3">${escapeHtml(
            this.props.task.content
          )}</textarea>

          <label>Priority</label>
          <select class="modal-input priority-input">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <label>Due Date</label>
          <input class="modal-input due-input" type="date" />
        </div>
        <footer class="modal-footer">
          <button class="btn btn-cancel">Cancel</button>
          <button class="btn btn-save">Save</button>
        </footer>
      </div>
    `;

    const typeInput = wrapper.querySelector(".type-input") as HTMLInputElement;
    const titleInput = wrapper.querySelector(
      ".title-input"
    ) as HTMLInputElement;
    const contentInput = wrapper.querySelector(
      ".content-input"
    ) as HTMLTextAreaElement;

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
      const priorityInput = wrapper.querySelector(
        ".priority-input"
      ) as HTMLSelectElement;
      const dueInput = wrapper.querySelector(".due-input") as HTMLInputElement;

      this.props.onSave({
        type: typeInput.value,
        title: titleInput.value,
        content: contentInput.value,
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
