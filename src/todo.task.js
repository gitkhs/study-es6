const Task = class {
  #title;
  #date;
  #complete = false;
  constructor(title, date) {
    this.#title = title;
    this.#date = date || new Date;
  }
  getTitle() {
    return this.#title;
  }
  getDate() {
    return datetime('yyyy.mm.dd hh:mi:ss ms', this.#date);
  }
  isComplete() {
    return this.#complete;
  }
  toggleComplete() {
    this.#complete = !this.#complete;
  }
};
