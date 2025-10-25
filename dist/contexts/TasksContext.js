export class TaskContext {
    constructor(type, title, content, priority, dueDate) {
        this.id = crypto.randomUUID();
        this.type = type;
        this.title = title;
        this.content = content;
        this.priority = priority;
        this.dueDate = dueDate;
    }
}
export class TasksContext {
    constructor(type) {
        this.type = type;
        this.tasks = [];
        this.listeners = [];
    }
    add(newTask) {
        this.tasks.push(newTask);
        this.notifyListeners();
    }
    update(id, updateTask) {
        const index = this.tasks.findIndex((task) => task.id === id);
        if (index === -1)
            return null;
        this.tasks[index] = Object.assign(Object.assign({}, this.tasks[index]), updateTask);
        this.notifyListeners();
    }
    delete(id) {
        const index = this.tasks.findIndex((task) => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
        this.notifyListeners();
    }
    subscribe(listener) {
        this.listeners.push(listener);
    }
    notifyListeners() {
        this.listeners.forEach((listener) => listener(this.tasks));
    }
}
//# sourceMappingURL=TasksContext.js.map