import CardItem from "./cardItem/card-item";
export default function rerenderBoard(data) {
  const card = new CardItem();
  const cardsList = document.querySelectorAll(".card-item");
  cardsList.forEach((i) => i.remove());

  data.forEach((i) => {
    card.renderCard(i.id, i.status, i.name, i.created);
  });
}
