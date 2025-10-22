import { App } from "./components/App.js";
import { TasksContext, TaskContext } from "./contexts/TasksContext.js";

const root = document.querySelector("#app");

const todoContext = new TasksContext("To-do");
todoContext.add(new TaskContext("Chores", "Laundry", "Wash clothes"));

const inProContext = new TasksContext("In-Progress");
inProContext.add(new TaskContext("School", "Study", "Midterm project"));
inProContext.add(new TaskContext("Work out", "Push up", "Working out"));

const doneContext = new TasksContext("Done");
doneContext.add(new TaskContext("Day", "Shower", "cleaning"));

const app = new App({ todoContext, inProContext, doneContext });

if (root) {
  app.mount(root as HTMLElement);
}
