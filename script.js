const API_URL = "https://wild-horizons-pklw.onrender.com/api";

const loadBtn = document.getElementById("loadBtn");
const filterBtn = document.getElementById("filterBtn");

const countrySelect = document.getElementById("country");
const continentSelect = document.getElementById("continent");
const openSelect = document.getElementById("open");

const destinationsDiv = document.getElementById("destinations");


// =========================
// LOAD DESTINATIONS
// =========================

async function loadDestinations(url) {

    try {

        const response = await fetch(url);

        const destinations = await response.json();

        destinationsDiv.innerHTML = "";

        destinations.forEach(destination => {

            const card = document.createElement("div");

            card.classList.add("destination-card");

            card.innerHTML = `
                <h2>${destination.name}</h2>

                <p>📍 ${destination.location}</p>

                <p>🌎 ${destination.country}</p>

                <p>🌍 ${destination.continent}</p>

                <p>
                    👥 Open to public:
                    ${destination.is_open_to_public ? "Yes" : "No"}
                </p>

                <button class="details-btn">
                    View Details →
                </button>
            `;


            const detailsButton = card.querySelector(".details-btn");


            detailsButton.addEventListener("click", () => {

                showDetails(destination);

            });


            destinationsDiv.appendChild(card);

        });

    } catch (error) {

        console.error("Error loading destinations:", error);

        destinationsDiv.innerHTML = `
            <p>❌ Failed to load destinations.</p>
        `;

    }

}


// =========================
// SHOW DESTINATION DETAILS
// =========================

function showDetails(destination) {

    const funFact = destination.details.find(
        detail => detail.fun_fact
    );

    const description = destination.details.find(
        detail => detail.description
    );


    destinationsDiv.innerHTML = `

        <div class="details-page">

            <button id="backBtn">
                ← Back to Destinations
            </button>

            <h1>${destination.name}</h1>

            <p>
                📍 <strong>Location:</strong>
                ${destination.location}
            </p>

            <p>
                🌎 <strong>Country:</strong>
                ${destination.country}
            </p>

            <p>
                🌍 <strong>Continent:</strong>
                ${destination.continent}
            </p>

            <p>
                👥 <strong>Open to Public:</strong>
                ${destination.is_open_to_public ? "Yes" : "No"}
            </p>


            <div class="details-text">

                <h2>📖 About this place</h2>

                <p>
                    ${description ? description.description : "No description available."}
                </p>


                <h2>💡 Fun Fact</h2>

                <p>
                    ${funFact ? funFact.fun_fact : "No fun fact available."}
                </p>

            </div>

        </div>
    `;


    const backBtn = document.getElementById("backBtn");


    backBtn.addEventListener("click", () => {

        loadDestinations(API_URL);

    });

}


// =========================
// LOAD ALL DESTINATIONS
// =========================

loadBtn.addEventListener("click", () => {

    loadDestinations(API_URL);

});


// =========================
// APPLY FILTER
// =========================

filterBtn.addEventListener("click", () => {

    const country = countrySelect.value;

    const continent = continentSelect.value;

    const isOpen = openSelect.value;


    const params = new URLSearchParams();


    if (country) {

        params.append("country", country);

    }


    if (continent) {

        params.append("continent", continent);

    }


    if (isOpen) {

        params.append("is_open_to_public", isOpen);

    }


    const url = `${API_URL}?${params.toString()}`;


    console.log("Request URL:", url);


    loadDestinations(url);

});