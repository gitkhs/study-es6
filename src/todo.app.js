const App = class {
  #title;
  #list = new Set;
  constructor(title) {
    this.#title = title;
  }
  getTitle() {
    return this.#title;
  }
  addData(data) {
    this.#list.add(data);
  }
  removeData(data) {
    this.#list.delete(data);
  }
  getDataLists() {
    return [...this.#list.values()];
  }
};