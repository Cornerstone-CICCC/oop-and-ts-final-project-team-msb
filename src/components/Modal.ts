import { Component } from "../common/Component.js";
import { TaskContext } from "../contexts/TasksContext.js";

type ModalProps = {
  task: TaskContext;
  onSave: (updated: { title?: string; content?: string }) => void;
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
          <button class="modal-close" title="Close">✕</button>
        </header>
        <div class="modal-body">
          <label class="modal-label">Title</label>
          <input class="modal-input title-input" type="text" value="${escapeHtml(
            this.props.task.title
          )}" />
          <label class="modal-label">Content</label>
          <textarea class="modal-input content-input" rows="6">${escapeHtml(
            this.props.task.content
          )}</textarea>
        </div>
        <footer class="modal-footer">
          <button class="btn btn-cancel">Cancel</button>
          <button class="btn btn-save">Save</button>
        </footer>
      </div>
    `;

    // 닫기(오버레이/close 버튼/취소)
    wrapper.querySelector(".modal-overlay")?.addEventListener("click", () => {
      this.close();
    });
    wrapper.querySelector(".modal-close")?.addEventListener("click", () => {
      this.close();
    });
    wrapper.querySelector(".btn-cancel")?.addEventListener("click", () => {
      this.close();
    });

    // 저장 버튼
    wrapper.querySelector(".btn-save")?.addEventListener("click", () => {
      const titleEl = wrapper.querySelector(".title-input") as HTMLInputElement;
      const contentEl = wrapper.querySelector(
        ".content-input"
      ) as HTMLTextAreaElement;

      const updated = {
        title: titleEl.value.trim(),
        content: contentEl.value.trim(),
      };

      this.props.onSave(updated);
      this.close();
    });

    // ESC 눌러 닫기 가능하도록
    document.addEventListener("keydown", this.handleKeyDown);

    return wrapper;
  }

  // 모달 닫기 (언마운트 + 키리스너 제거 + 콜백)
  close() {
    document.removeEventListener("keydown", this.handleKeyDown);
    this.unmount();
    if (typeof this.props.onClose === "function") this.props.onClose();
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      this.close();
    }
  }
}

/* 간단한 XSS 예방(입력값 삽입에 사용) */
function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
