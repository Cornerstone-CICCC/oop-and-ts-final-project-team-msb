import { Component } from "../common/Component.js";
import { Tasks } from "./Tasks.js";
export class App extends Component {
    render() {
        const app = document.createElement("div");
        app.className = "container";
        app.innerHTML = `
      <main class="main d-flex p-2 justify-content-between"></main>

    `;
        const todoColumn = new Tasks({
            tasksContext: this.props.todoContext,
        }).render();
        const inProColumn = new Tasks({
            tasksContext: this.props.inProContext,
        }).render();
        const doneColumn = new Tasks({
            tasksContext: this.props.doneContext,
        }).render();
        const main = app.querySelector(".main");
        main.append(todoColumn, inProColumn, doneColumn);
        return app;
    }
}
//# sourceMappingURL=App.js.map