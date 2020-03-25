const Folder = class {
  #title;
  #tasks = new Set;
  #sort = Task.DATE;
  constructor(title) {this.#title = title}
  set sort(v) {this.#sort = v}
  getTitle() {return this.#title}
  addTask(t) {this.#tasks.add(t)}
  removeTask(t) {this.#tasks.delete(t)}
  getTasks() {return [...this.#tasks].sort(this.#sort)}
  toJSON() {
    return {
      title: this.#title,
      tasks: [...this.#tasks]
    }
  }
};