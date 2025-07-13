// GPS-Tracking
navigator.geolocation.watchPosition(
  (pos) => {
    const lat = pos.coords.latitude.toFixed(5);
    const lon = pos.coords.longitude.toFixed(5);
    document.getElementById("coords").innerText = `Lat: ${lat}, Lon: ${lon}`;
    updateMap(lat, lon);
  },
  (err) => {
    document.getElementById("coords").innerText = "Kein GPS-Zugriff möglich.";
  },
  { enableHighAccuracy: true }
);

// Karte aktualisieren
let map, marker;
function updateMap(lat, lon) {
  if (!map) {
    map = L.map("map").setView([lat, lon], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    marker = L.marker([lat, lon]).addTo(map);
  } else {
    marker.setLatLng([lat, lon]);
    map.panTo([lat, lon]);
  }
}

// Bike-Garage
const bikeForm = document.getElementById("bikeForm");
const bikeList = document.getElementById("bikeList");

bikeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("bikeName").value;
  const brand = document.getElementById("bikeBrand").value;
  const model = document.getElementById("bikeModel").value;
  const bike = { name, brand, model };
  bikes.push(bike);
  saveData();
  renderBikes();
  bikeForm.reset();
});

function renderBikes() {
  bikeList.innerHTML = "";
  bikes.forEach((b, i) => {
    const li = document.createElement("li");
    li.textContent = `${b.name} (${b.brand} ${b.model})`;
    bikeList.appendChild(li);
  });
}

// Wartungsliste
const serviceForm = document.getElementById("serviceForm");
const serviceList = document.getElementById("serviceList");

serviceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const part = document.getElementById("servicePart").value;
  const interval = document.getElementById("serviceInterval").value;
  maintenance.push({ part, interval });
  saveData();
  renderMaintenance();
  serviceForm.reset();
});

function renderMaintenance() {
  serviceList.innerHTML = "";
  maintenance.forEach((m) => {
    const li = document.createElement("li");
    li.textContent = `Teil: ${m.part}, Intervall: ${m.interval}`;
    serviceList.appendChild(li);
  });
}

// Initial render
renderBikes();
renderMaintenance();