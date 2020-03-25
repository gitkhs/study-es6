const Command = class {
  execute() {throw 'execute is override'}
  undo() {throw 'undo is override'}
};
const AddFolder = class extends Command {
  #app;
  #folder;
  constructor(app, title) {
    super();
    this.#app = app;
    this.#folder = new Folder(title);
  }
  execute() {this.#app.addFolder(this.#folder)}
  undo() {this.#app.removeFolder(this.#folder)}
};
const RemoveFolder = class extends Command {
  #app;
  #folder;
  constructor(app, folder) {
    super();
    this.#app = app;
    this.#folder = folder;
  }
  execute() {this.#app.removeFolder(this.#folder)}
  undo() {this.#app.addFolder(this.#folder)}
};
const SelectedFolder = class extends Command {
  #current;
  #folder;
  #procedure;
  constructor(current, folder, procedure) {
    if(typeof procedure != 'function') throw '3th is function';

    super();
    this.#current = current;
    this.#folder = folder;
    this.#procedure = procedure;
  }
  execute() {this.#procedure(this.#folder)}
  undo() {this.#procedure(this.#current)}
};
const AddTask = class extends Command {
  #folder;
  #task;
  constructor(folder, title) {
    super();
    this.#folder = folder;
    this.#task = new Task(title);
  }
  execute() {this.#folder.addTask(this.#task)}
  undo() {this.#folder.removeTask(this.#task)}
};
const RemoveTask = class extends Command {
  #folder;
  #task;
  constructor(folder, task) {
    super();
    this.#folder = folder;
    this.#task = task;
  }
  execute() {this.#folder.removeTask(this.#task)}
  undo() {this.#folder.addTask(this.#task)}
};
const ToggleTaskComplete = class extends Command {
  #task;
  constructor(task) {
    super();
    this.#task = task;
  }
  execute() {this.#task.toggleComplete()}
  undo() {this.#task.toggleComplete()}
};

const History = class {
  #commands = [];
  #position = 0;
  get begin() {return this.#position == 0}
  get last() {return this.#position == this.#commands.length}
  _add(cmd) {
    if(!(cmd instanceof Command)) throw 'invalid Command';

    cmd.execute();
    if(this.last) this.#commands.push(cmd);
    else this.#commands[this.#position] = cmd;

    this.#position ++;
  }
  clear() {this.#commands.length = this.#position = 0}
  undo() {if(!this.begin) this.#commands[--this.#position].undo()}
  redo() {if(!this.last) this.#commands[this.#position++].execute()}
  addFolder(app, title) {throw 'addFolder is override'}
  removeFolder(app, folder) {throw 'removeFolder is override'}
  selectedFolder(current, folder, proc) {throw 'selectedFolder is override'}
  addTask(folder, title) {throw 'addTask is override'}
  removeTask(folder, task) {throw 'removeTask is override'}
  toggleTaskComplete(task) {throw 'toggleTaskComplete is override'}
};