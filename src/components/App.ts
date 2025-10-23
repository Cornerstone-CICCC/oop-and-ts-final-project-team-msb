import { Component } from "../common/Component.js";
import { Tasks } from "./Tasks.js";
import { Header } from "./Header.js";

export class App extends Component {
  render() {
    const app = document.createElement("div");
    app.className = "container";

    // 1. Crear el header
    const header = new Header().render();

    // 2. Crear el main
    const main = document.createElement("main");
    main.className = "main d-flex p-2 justify-content-between";

    // 3. Crear columnas
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

    // 4. Agregar header y main al contenedor principal
    app.append(header, main);

    return app;
  }
}
