import CardItem from "./cardItem/card-item";

export default function renderBoard() {
  const card = new CardItem();
  const ticketList = document.querySelectorAll(".card-item");
  const ticketsId = [];
  ticketList.forEach((i) => {
    ticketsId.push(i.dataset.id);
  });
  fetch("http://localhost:3000/?method=allTickets")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((i) => {
        if (!ticketsId.includes(i.id)) {
          card.renderCard(i.id, i.status, i.name, i.created);
        }
      });
    });
}
