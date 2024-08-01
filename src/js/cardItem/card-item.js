import "./card-item.css";
import Modal from "../modal/modal";
import rerenderBoard from "../rerenderBoard";
import editCard from "../editCard";
export default class CardItem {
  constructor() {
    this.parentel = document.querySelector(".cards-container");
  }

  renderCard(id, status, name, created) {
    const parent = document.querySelector(".cards-container");
    const date = new Date(created);

    const options = {
      hour: "numeric",
      minute: "numeric",
    };
    const dateFormatted = date
      .toLocaleDateString("ru-RU", options)
      .replace(",", "");

    const markup = `
      <div class="card-item" data-id=${id}>
      <div class="card-item-main">
        <div class="card-item-block">
          <input type="checkbox" class="checkbox ${status === true ? "checked" : ""}"></input>
          <div class="text-container">${name}</div>
        </div>
        <div class="card-item-block">
          <div class="date-container">${dateFormatted}</div>
          <button class="button edit"></button>
          <button class="button delete"></button>
        </div>
        </div>
        <div class="card-item-description"></div>
      </div>
    `;
    parent.insertAdjacentHTML("beforeend", markup);
    const items = document.querySelectorAll(".card-item");
    const editBtns = document.querySelectorAll(".edit");
    const deleteBtns = document.querySelectorAll(".delete");
    const checkbox = document.querySelectorAll(".checkbox");
    deleteBtns.forEach((i) => i.addEventListener("click", this.removeCard));

    editBtns.forEach((i) => i.addEventListener("click", this.editCard));
    items.forEach((i) => i.addEventListener("click", this.showDescription));
    checkbox.forEach((i) => i.addEventListener("click", this.checkboxClick));
  }

  checkboxClick(e) {
    const card = e.target.closest(".card-item");

    fetch(`http://localhost:3000/?method=ticketById&id=${card.dataset.id}`)
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        data[0].status = true;
        fetch(
          `http://localhost:3000/?method=editTicket&id=${card.dataset.id}`,
          {
            method: "PUT",
            body: JSON.stringify(data[0]),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          },
        )
          .then((response) => response.json())
          .then((data) => {
            editCard(data);
          });
      });
  }

  showDescription(e) {
    e.preventDefault();
    const target = e.target;
    const card = e.target.closest(".card-item");
    const description = card.querySelector(".card-item-description");

    if (card.classList.contains("description-opened")) {
      description.textContent = "";
      card.classList.remove("description-opened");
      return;
    }
    if (
      !target.classList.contains("checkbox") &&
      !target.classList.contains("button")
    ) {
      fetch(`http://localhost:3000/?method=ticketById&id=${card.dataset.id}`)
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          description.textContent = data[0].description;
          card.classList.add("description-opened");
        });
    }
  }

  editCard(e) {
    e.preventDefault();
    const card = e.target.closest(".card-item");
    new Modal("edit", card.dataset.id);
  }

  removeCard(e) {
    e.preventDefault();

    new Modal("delete");
    const card = e.target.closest(".card-item");
    const deleteBtn = document.querySelector(".ok");

    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      fetch(`http://localhost:3000/?method=deleteTicket&id=${card.dataset.id}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => rerenderBoard(data));
      e.target.closest(".popup").remove();
    });
  }
}
