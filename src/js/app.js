import Widget from "./widget/widget";
import rerenderBoard from "./renderBoard";
const container = document.querySelector(".container");

const widget = new Widget(container);
widget.bindToDOM();

rerenderBoard();
