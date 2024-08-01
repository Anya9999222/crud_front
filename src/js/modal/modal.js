import "./modal.css";
import renderBoard from "../renderBoard";
import editCard from "../editCard";
const container = document.querySelector(".container");

export default class Modal {
  constructor(type, cardId = null) {
    this.type = type;
    this.cardId = cardId;
    this.showModal();
  }
  static get selector() {
    return `.popup`;
  }

  static get returnButton() {
    return `.return`;
  }

  showModal() {
    if (this.type === "delete") {
      this.deleteModal();
    } else if (this.type === "new") {
      this.newCardModal();
    } else if (this.type === "edit") {
      this.editCardModal(this.cardId);
    }
  }

  newCardModal() {
    const markup = `
        <div class="popup" >
       <div class="popup-container">
        Добавить тикет
        <form class="form-modal">
            <input class="input name" type="text" name="name" placeholder="Краткое описание"></input>
            <input class="input description" type="text" name="description" placeholder="Подробное описание"></input>
            <button class="form-button return">Отмена</button>
            <button class="form-button submit"type="submit">OK</button>
        </form>
    </div>
    </div>`;
    container.insertAdjacentHTML("beforebegin", markup);
    const form = document.querySelector(".form-modal");
    const returnButton = document.querySelector(Modal.returnButton);
    returnButton.addEventListener("click", this.onClick);
    form.addEventListener("submit", this.onSubmit);
  }

  editCardModal(id) {
    const markup = `
        <div class="popup" >
       <div class="popup-container">
        Изменить тикет
        <form class="form-edit">
            <input class="input name" type="text" name="name" placeholder="Краткое описание"></input>
            <input class="input description" type="text" name="description" placeholder="Подробное описание"></input>
            <button class="form-button return">Отмена</button>
            <button class="form-button edit-btn"type="submit">OK</button>
        </form>
    </div>
    </div>`;

    container.insertAdjacentHTML("beforebegin", markup);

    const popup = document.querySelector(".popup");

    const name = popup.querySelector(".name");
    const description = popup.querySelector(".description");

    fetch(`http://localhost:3000/?method=ticketById&id=${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        name.value = data[0].name;
        description.value = data[0].description;
      });
    const returnButton = document.querySelector(Modal.returnButton);
    returnButton.addEventListener("click", this.onClick);

    const editForm = document.querySelector(".form-edit");

    editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(editForm);
      data.append("status", false);
      data.append("created", new Date());

      fetch(`http://localhost:3000/?method=editTicket&id=${id}`, {
        method: "PUT",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          editCard(data);
        });
      e.target.closest(".popup").remove();
    });
  }

  deleteModal() {
    const markup = `
         <div class="popup" >
       <div class="popup-container">
        Удалить тикет
        <div class="content">
            <div class="content-text">
                Вы уверены, что хотите удалить тикет? Это действие необратимо.
            </div>
            <button class="form-button return">Отмена</button>
            <button class="form-button ok" type="submit">OK</button>
        </div>
    </div>
        
        `;
    container.insertAdjacentHTML("beforebegin", markup);

    const returnButton = document.querySelector(Modal.returnButton);
    returnButton.addEventListener("click", this.onClick);
  }

  onClick(e) {
    e.target.closest(".popup").remove();
  }

  onSubmit(e) {
    e.preventDefault();
    const form = document.querySelector(".form-modal");
    const data = new FormData(form);
    data.append("status", false);
    data.append("created", new Date());

    fetch("http://localhost:3000/?method=createTicket", {
      method: "POST",
      body: data,
    })
      // eslint-disable-next-line no-unused-vars
      .then((response) => renderBoard());
    e.target.closest(".popup").remove();
  }
}
