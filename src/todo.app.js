const App = class {
  #title;
  #folders = new Set;
  constructor(title) {
    this.#title = title;
  }
  getTitle() {
    return this.#title;
  }
  addFolder(f) {this.#folders.add(f)}
  removeFolder(f) {this.#folders.delete(f)}
  getFolders() {return [...this.#folders]}
  toJSON() {
    return {
      title: this.#title,
      folders: [...this.#folders]
    }
  }
};