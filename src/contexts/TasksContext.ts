export class TaskContext {
  readonly id: string;
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.content = content;
  }
}

export class TasksContext {
  type: string;
  tasks: TaskContext[];
  listeners: ((...args: any[]) => void)[];

  constructor(type: string) {
    this.type = type;
    this.tasks = [];
    this.listeners = [];
  }

  add(newTask: TaskContext) {
    this.tasks.push(newTask);

    this.notifyListeners();
  }

  update(id: string, updateTask: Partial<TaskContext>) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return null;
    this.tasks[index] = { ...this.tasks[index], ...updateTask };
    this.notifyListeners();
  }

  delete(id: string) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }

    this.notifyListeners();
  }

  subscribe(listener: (...args: any[]) => void) {
    this.listeners.push(listener);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.tasks));
  }

  // onDrag(element) - Drag a task to a different column
  // onDrop(element, targetColumn) - Drop a task on a different column
}
