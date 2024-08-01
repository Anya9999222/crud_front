import Modal from "../modal/modal";
import "./widget.css";

export default class Widget {
  constructor(parentEl) {
    this.parentEl = parentEl;

    this.onClick = this.onClick.bind(this);
  }
  static get markup() {
    return `
    <div class="header">
    <button class="add">Добавить тикет</button>
    </div>
      
      <div class="cards-container"></div>
    `;
  }
  static get selector() {
    return ".add";
  }

  bindToDOM() {
    this.parentEl.innerHTML = Widget.markup;

    this.element = this.parentEl.querySelector(Widget.selector);

    this.element.addEventListener("click", this.onClick);
  }

  onClick(e) {
    e.preventDefault();

    new Modal("new");
  }
}
