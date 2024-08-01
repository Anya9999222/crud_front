export default function editCard(newData) {
  const ticket = document.querySelector(`[data-id="${newData.id}"]`);
  const content = ticket.querySelector(".text-container");
  const done = ticket.querySelector(".checkbox");
  newData.status === true ? done.classList.add("checked") : "";
  content.textContent = newData.name;
}
