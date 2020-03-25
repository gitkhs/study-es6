const Renderer = class {
  #app;
  constructor(app) {this.#app = app}
  get app() {return this.#app}
  render() {this._render()}
  _render() {throw '_render is override'}
};

const DOMRenderer = class extends Renderer {
  #view = {};
  #folder;
  constructor(app) {
    super(app);
    this._makeView();
  }
  _render() {
    this._appRender();
    this._folderRender();
    this._taskRender();
  }
  _appRender() {
    const {title} = this.#view;
    title.innerText = this.app.getTitle();
  }
  _folderRender() {
    const {folder:{list}} = this.#view;
    const folders = this.app.getFolders();

    list.innerText = '';
    folders.forEach(f=> {
      const li = list.appendChild(el('li'));
      li.innerText = f.getTitle();
      li.style.cssText = `
        font-weight: ${this.#folder == f ? 'bold' : 'normal'};
        color: ${this.#folder == f ? 'red' : 'black'};
      `;
      li.onclick = evt=> {
        evt.stopPropagation();
        this.#folder = f;
        this.render();
      };

      const remove = li.appendChild(el('button'));
      remove.innerText = 'remove';
      remove.style.marginLeft = '1rem';
      remove.onclick = evt=> {
        evt.stopPropagation();
        this.app.removeFolder(f);
        if(this.#folder == f) this.#folder = null;
        this.render();
      };
    });
  }
  _taskRender() {
    const {task:{view, list}} = this.#view;
    if(!this.#folder) return (view.style.display = 'none');

    const tasks = this.#folder.getTasks();
    view.style.display = 'block';
    list.innerText = '';
    tasks.forEach(t=> {
      const li = list.appendChild(el('li'));
      li.innerText = `[${t.isComplete() ? 'O' : 'X'}] ${t.getTitle()}: ${t.getDate()}`;;
      li.onclick = _=> {
        t.toggleComplete();
        this.render();
      };

      const remove = li.appendChild(el('button'));
      remove.innerText = 'remove';
      remove.style.marginLeft = '1rem';
      remove.onclick = evt=> {
        evt.stopPropagation();
        this.#folder.removeTask(t);
        this.render();
      };
    });
  }
  _makeView() {
    const section = qs('section');
    section.innerHTML = '';

    const title = section.appendChild(el('h1'));

    Object.assign(
      this.#view,
      {title},
      this._getFolder(section),
      this._getTask(section)
    );
  }
  _getFolder(section) {
    const view = section.appendChild(el('div'));
    const label = view.appendChild(el('label'));
    label.innerText = 'folder';
    label.style.marginRight = '1rem';
    label.setAttribute('for', 'folder');
    
    const input = view.appendChild(el('input'));
    input.setAttribute('id', 'folder');
    input.setAttribute('type', 'text');

    const add = view.appendChild(el('button'));
    add.innerText = 'add';
    add.style.marginLeft = '1rem';
    add.onclick = ({target:{previousElementSibling:input}})=> {
      const vl = input.value.trim();
      input.value = '';
      if(!vl) return alert('폴더명 미입력'), input.focus();

      this.app.addFolder(new Folder(vl));
      this.render();
    };

    const list = view.appendChild(el('ul'));

    return {folder: {view, list}};
  }
  _getTask(section) {
    const view = section.appendChild(el('div'));
    const label = view.appendChild(el('label'));
    label.innerText = 'task';
    label.style.marginRight = '1rem';
    label.setAttribute('for', 'task');

    const input = view.appendChild(el('input'));
    input.setAttribute('id', 'task');
    input.setAttribute('type', 'text');

    const add = view.appendChild(el('button'));
    add.innerText = 'add';
    add.style.marginLeft = '1rem';
    add.onclick = ({target:{previousElementSibling:input}})=> {
      const vl = input.value.trim();
      input.value = '';
      if(!vl) return alert('타스크명 미입력'), input.focus();

      this.#folder.addTask(new Task(vl));
      this.render();
    };

    const titleSort = view.appendChild(el('button'));
    titleSort.innerText = 'title sort';
    titleSort.style.marginLeft = '1rem';
    titleSort.onclick = _=> {
      this.#folder.sort = Task.TITLE;
      this.render();
    };

    const dateSort = view.appendChild(el('button'));
    dateSort.innerText = 'date sort';
    dateSort.style.marginLeft = '1rem';
    dateSort.onclick = _=> {
      this.#folder.sort = Task.DATE;
      this.render();
    };

    const list = view.appendChild(el('ul'));

    return {task: {view, list}};
  }
};