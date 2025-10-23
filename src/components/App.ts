import { Component } from "../common/Component.js";
import { Tasks } from "./Tasks.js";
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";

export class App extends Component {
  render() {
    const app = document.createElement("div");
    app.className = "container";

    const header = new Header().render();

    const main = document.createElement("main");
    main.className = "main d-flex p-2 justify-content-between";

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

    app.append(header, main, footer);

    return app;
  }
}

