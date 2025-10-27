import { Component } from "../common/Component.js";
import { Tasks } from "./Tasks.js";
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";
import { Modal } from "./Modal.js";
export class App extends Component {
    render() {
        const app = document.createElement("div");
        app.className = "container";
        // Base layout
        app.innerHTML = `
      <main class="main d-flex p-2 justify-content-between"></main>
    `;
        const getAllTasks = () => [
            ...this.props.todoContext.tasks,
            ...this.props.inProContext.tasks,
            ...this.props.doneContext.tasks,
        ];
        const openTaskModal = (task) => {
            const modal = new Modal({
                task,
                onSave: (updatedData) => {
                    Object.assign(task, updatedData);
                    console.log("Task updated:", task);
                },
                onClose: () => console.log("Modal closed"),
            });
            const modalElement = modal.render();
            document.body.appendChild(modalElement);
        };
        const header = new Header({
            getAllTasks,
            onTaskClick: openTaskModal,
        }).render();
        // Main layout
        const main = app.querySelector(".main");
        const allContexts = [
            this.props.todoContext,
            this.props.inProContext,
            this.props.doneContext,
        ];
        const todoColumn = new Tasks({
            tasksContext: this.props.todoContext,
            allContexts,
        }).render();
        const inProColumn = new Tasks({
            tasksContext: this.props.inProContext,
            allContexts,
        }).render();
        const doneColumn = new Tasks({
            tasksContext: this.props.doneContext,
            allContexts,
        }).render();
        main.append(todoColumn, inProColumn, doneColumn);
        const footer = new Footer().render();
        app.prepend(header);
        app.append(footer);
        return app;
    }
}
//# sourceMappingURL=App.js.map