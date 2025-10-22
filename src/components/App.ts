import { Component } from "../common/Component.js";
import { Tasks } from "./Tasks.js";

export class App extends Component {
  render() {
    const app = document.createElement("div");
    app.className = "container";
    app.innerHTML = `<main class="main d-flex p-2 justify-content-between"></main>`;

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

    const main = app.querySelector(".main") as HTMLElement;
    main.append(todoColumn, inProColumn, doneColumn);

    return app;
  }
}