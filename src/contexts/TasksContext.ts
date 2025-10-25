export class TaskContext {
  readonly id: string;
  type: string;
  title: string;
  content: string;
  priority?: string;
  dueDate?: string;

  constructor(
    type: string,
    title: string,
    content: string,
    priority?: string,
    dueDate?: string
  ) {
    this.id = crypto.randomUUID();
    this.type = type;
    this.title = title;
    this.content = content;
    this.priority = priority;
    this.dueDate = dueDate;
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
}
