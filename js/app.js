const apiKey = "f8a60488-cc45-4bbf-ba21-c3efff3b2c69"; // Replace if needed
const playersContainer = document.querySelector(".schedule .row");

const fetchPlayers = async () => {
  try {
    console.log("Fetching players...");

    const response = await fetch(
      `https://api.cricapi.com/v1/players?apikey=${apiKey}&offset=0`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data.data);
    const displayPlayers = (players) => {
      playersContainer.innerHTML = ""; // Clear previous data

      if (players.length === 0) {
        playersContainer.innerHTML = "<p>No players found.</p>";
        return;
      }

      players.forEach((player) => {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-lg-4");
        colDiv.classList.add("col-md-6");
        colDiv.classList.add("col-sm-12");

        const playerCard = document.createElement("div");
        playerCard.classList.add("profile-card");

        const playerImg = document.createElement("img");
        playerImg.src = "./images/dummy/dummy1.jfif";
        playerImg.alt = player.name;
        playerImg.classList.add("profile-img");

        const profileInfo = document.createElement("div");
        profileInfo.classList.add("profile-info");

        const playerName = document.createElement("h3");
        playerName.textContent = player.name;

        const playerCountry = document.createElement("p");
        playerCountry.textContent = `Country: ${player.country || "Unknown"}`;

        // Append elements properly
        profileInfo.appendChild(playerName);
        profileInfo.appendChild(playerCountry);
        playerCard.appendChild(playerImg);
        playerCard.appendChild(profileInfo);
        colDiv.appendChild(playerCard);
        playersContainer.appendChild(colDiv);
      });
    };

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

// Fetch and display players
fetchPlayers();
