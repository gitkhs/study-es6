const Task = class {
  #title;
  #date;
  #complete;
  static TITLE(a, b) {return a.getTitle().localeCompare(b.getTitle())}
  static DATE(a, b) {return a.getDate().localeCompare(b.getDate())}
  constructor(title, date=new Date, complete=false) {
    this.#title = title;
    this.#date = date;
    this.#complete = complete;
  }
  getTitle() {return this.#title}
  getDate() {return datetime('yyyy.mm.dd hh:mi:ss ms', this.#date)}
  isComplete() {return this.#complete}
  toggleComplete() {this.#complete = !this.#complete}
  toJSON() {
    return {
      title: this.#title,
      complete: this.#complete,
      date: this.#date.getTime(),
    };
  }
};
