const apiSys = "f8a60488-cc45-4bbf-ba21-c3efff3b2c69";
const playersContainer = document.querySelector(".schedule .players");

const displayPlayers = (players) => {
  playersContainer.innerHTML = ""; // Clear previous data

  players.forEach((player) => {
    const playerCard = document.createElement("div");
    playerCard.classList.add("player-card");

    playerCard.innerHTML = `
                        <img src="${
                          player.image || "https://via.placeholder.com/100"
                        }" alt="${player.name}">
                        <h3>${player.name}</h3>
                        <p>Country: ${player.country || "Unknown"}</p>
                    `;

    playersContainer.appendChild(playerCard);
  });
};

const fetchPlayers = async () => {
  try {
    const response = await fetch(
      `https://api.cricapi.com/v1/players?apikey=${apiSys}&offset=0`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    // Check if data exists
    if (data && data.data) {
      displayPlayers(data.data);
    } else {
      playersContainer.innerHTML = "<p>No players found.</p>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    playersContainer.innerHTML = `<p>Error loading players. Please try again.</p>`;
  }
};

fetchPlayers();
