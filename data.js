let bikes = JSON.parse(localStorage.getItem("bikes")) || [];
let maintenance = JSON.parse(localStorage.getItem("maintenance")) || [];

function saveData() {
  localStorage.setItem("bikes", JSON.stringify(bikes));
  localStorage.setItem("maintenance", JSON.stringify(maintenance));
}