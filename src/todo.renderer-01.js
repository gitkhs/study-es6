const Renderer = class {
  #app;
  view;
  constructor(app) {
    if(!(app instanceof App)) throw 'invalid App';
    this.#app = app;

    const section = qs('section');
    const title = qs('h1', section);
    this.view = {title};

    // 버튼 이벤트
    qs('button', section).addEventListener('click', ({target:{previousElementSibling:input}})=> {
      const vl = input.value.trim();
      input.value = '';
      if(!vl) return alert('내용 미입력'), input.focus();

      this.app.addData(new Task(vl)); 
      this._render();
    });
  }
  get app() {return this.#app}


  render() {this._render()}
  _render() {throw '_render is overrided'}
};

const DOMRenderer = class extends Renderer {
  constructor(app) {
    super(app);
    const section = qs('section');
    const ul = section.appendChild(el('ul'));
    Object.assign(this.view, {ul})
  }
  _render() {
    const {title, ul} = this.view;
    const list = this.app.getDataLists();
    title.innerText = this.app.getTitle();

    ul.innerHTML = '';
    list.forEach(itm=> {
      const li = ul.appendChild(el('li'));
      li.innerText = itm.getTitle() + `(${itm.getDate()})`;
    });
  }
};

const CanvasRenderer = class extends Renderer {
  constructor(app) {
    super(app);
    const section = qs('section');
    const canvas = section.appendChild(el('canvas'));
    Object.assign(this.view, {canvas})
  }
  _render() {
    const {title, canvas} = this.view;
    const list = this.app.getDataLists();
    title.innerText = this.app.getTitle();

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    list.forEach((itm, idx)=> {
      ctx.fillText(itm.getTitle(), 10, idx*20 + 10);
    });
  }
};
