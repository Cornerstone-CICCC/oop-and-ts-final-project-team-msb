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

    // Collect all tasks from all contexts for the search functionality
    const allTasks = [
      ...this.props.todoContext.tasks,
      ...this.props.inProContext.tasks,
      ...this.props.doneContext.tasks,
    ];

    // Create the header and pass all tasks + click handler
    const header = new Header(allTasks, (task) => {
      alert(`Task selected: ${task.title}`);
      // TODO: Add scroll or highlight logic here if needed
    }).render();

    // Create the main container for task columns
    const main = document.createElement("main");
    const main = app.querySelector(".main") as HTMLElement;
    main.className = "main d-flex p-2 justify-content-between";

    // Pass contexts to each column (To Do, In Progress, Done)
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

    // Append all columns to main area
    main.append(todoColumn, inProColumn, doneColumn);

    // Create and append footer
    const footer = new Footer().render();

    // Final app layout
    app.append(header, main, footer);

    return app;
  }
}
}
