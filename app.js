
// GPS Tracking & Distanzmessung
let map, marker, lastCoords = null, totalDistance = 0;

function updateMap(lat, lon) {
  if (!map) {
    map = L.map("map").setView([lat, lon], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    marker = L.marker([lat, lon]).addTo(map);
  } else {
    marker.setLatLng([lat, lon]);
    map.panTo([lat, lon]);
  }

  if (lastCoords) {
    const d = getDistanceFromLatLonInKm(lastCoords.lat, lastCoords.lon, lat, lon);
    totalDistance += d;
    document.getElementById("distance").innerText = `Distanz: ${totalDistance.toFixed(2)} km`;
  }
  lastCoords = { lat, lon };
}

navigator.geolocation.watchPosition(
  (pos) => {
    const { latitude: lat, longitude: lon } = pos.coords;
    document.getElementById("coords").innerText = `Lat: ${lat.toFixed(5)}, Lon: ${lon.toFixed(5)}`;
    updateMap(lat, lon);
  },
  () => {
    document.getElementById("coords").innerText = "Kein GPS-Zugriff möglich.";
  }
);

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Navigation
function showSection(id) {
  document.querySelectorAll("main section").forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Garage
const bikeForm = document.getElementById("bikeForm");
const bikeList = document.getElementById("bikeList");
bikeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = bikeForm.bikeName.value;
  const brand = bikeForm.bikeBrand.value;
  const model = bikeForm.bikeModel.value;
  const li = document.createElement("li");
  li.textContent = `${brand} ${model} – ${name}`;
  bikeList.appendChild(li);
  bikeForm.reset();
});

// Wartungsliste
const serviceForm = document.getElementById("serviceForm");
const serviceList = document.getElementById("serviceList");
serviceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const part = serviceForm.servicePart.value;
  const interval = serviceForm.serviceInterval.value;
  const li = document.createElement("li");
  li.textContent = `${part}: alle ${interval}`;
  serviceList.appendChild(li);
  serviceForm.reset();
});

// Empfehlungen
const recommendations = {
  kette: "Kette: Alle 500–700 km reinigen und schmieren.",
  bremsen: "Bremsen: Beläge alle 300–500 km prüfen.",
  dämpfer: "Dämpfer: Alle 50h kleiner Service, 100h Ölwechsel.",
  gabel: "Gabel: 50h reinigen, 100h Service.",
  reifen: "Reifen: Luftdruck prüfen, abgenutzte ersetzen."
};
document.getElementById("partSelector").addEventListener("change", (e) => {
  const part = e.target.value;
  document.getElementById("recommendation").innerText = recommendations[part] || "";
});
