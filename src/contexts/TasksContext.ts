export class TaskContext {
  readonly id: number;
  title: string;
  content: string;

  static count: number = 0;

  constructor(title: string, content: string) {
    TaskContext.count++;
    this.id = TaskContext.count;
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

  update(id: number, updateTask: Partial<TaskContext>) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return null;
    this.tasks[index] = { ...this.tasks[index], ...updateTask };
    this.notifyListeners();
  }

  delete(id: number) {
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
