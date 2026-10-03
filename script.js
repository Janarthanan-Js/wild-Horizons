const API_URL = "https://wild-horizons-pklw.onrender.com/api";

const loadBtn = document.getElementById("loadBtn");
const destinationsDiv = document.getElementById("destinations");

loadBtn.addEventListener("click", async () => {

    const response = await fetch(API_URL);

    const destinations = await response.json();

    destinationsDiv.innerHTML = "";

    destinations.forEach(destination => {

        const card = document.createElement("div");

        card.innerHTML = `
            <h2>${destination.name}</h2>
            <p>📍 ${destination.location}</p>
            <p>🌎 ${destination.country}</p>
            <p>🌍 ${destination.continent}</p>
        `;

        destinationsDiv.appendChild(card);
    });
});