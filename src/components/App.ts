import { Component } from "../common/Component.js";
import { Tasks } from "./Tasks.js";
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";

export class App extends Component {
  render() {
    const app = document.createElement("div");
    app.className = "container";
    app.innerHTML = `
      <main class="main d-flex p-2 justify-content-between"></main>

    `;

    const header = new Header().render();

    const main = app.querySelector(".main") as HTMLElement;
    main.className = "main d-flex p-2 justify-content-between";

    const allContexts = [
      this.props.todoContext,
      this.props.inProContext,
      this.props.doneContext,
    ];

    allContexts.forEach((ctx) => {
      const context = new Tasks({ tasksContext: ctx, allContexts }).render();
      main.append(context);
    });

    const footer = new Footer().render();

    app.append(header, main, footer);

    return app;
  }
}
