const apiKey = "f8a60488-cc45-4bbf-ba21-c3efff3b2c69"; // 👈 Apna API key yahan daalein
const liveMatches = document.querySelector(".schedule .container .layout");

async function fetchMatches() {
  try {
    const response = await fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // 👈 Console me response check karein

    if (!data || !data.data || data.data.length === 0) {
      document.getElementById("matchContainer").innerHTML =
        "<p>No matches found.</p>";
      return;
    }

    displayMatches(data.data);
  } catch (error) {
    console.error("Error fetching matches:", error);
    document.getElementById("matchContainer").innerHTML =
      "<p>Error fetching data. Check console for details.</p>";
  }
}

function displayMatches(matches) {
  liveMatches.innerHTML = ""; // Purana content hatao

  matches.forEach((match) => {
    if (!match.teamInfo || match.teamInfo.length < 2) return;

    const matchCard = document.createElement("div");
    matchCard.classList.add(".layout");

    matchCard.innerHTML = `
            <ul>
                <li>
                           <div class="vs1">
                    <h5>
                        <a href="#"><b>${match.teamInfo[1].name} v/s ${
      match.teamInfo[0].name
    }</b></a>
                    </h5>
                    <span><small>, ${match.matchType.toUpperCase()}</small></span>
                </div>
                </li>
            </ul>
            <div class="vs">        
                <p>
                    <small>${match.date} • ${match.venue}</small>
                </p>
            </div>
            <div class="live-scores">
                <a href="#">
                    <table>
                        <tr>
                              <td>
        <img src="${match.teamInfo[1].img}" alt="${
      match.teamInfo[1].shortname
    }" width="30">
        ${match.teamInfo[1].shortname}
    </td>
                            <td>${
                              match.score && match.score.length > 0
                                ? match.score[0].r +
                                  "-" +
                                  match.score[0].w +
                                  " (" +
                                  match.score[0].o +
                                  " Ovs)"
                                : "Yet to bat"
                            }</td>
                        </tr>
                        <tr>
                  <td>
        <img src="${match.teamInfo[0].img}" alt="${
      match.teamInfo[0].shortname
    }" width="30">
        ${match.teamInfo[0].shortname}
    </td>
                            <td>${
                              match.score && match.score.length > 1
                                ? match.score[1].r +
                                  "-" +
                                  match.score[1].w +
                                  " (" +
                                  match.score[1].o +
                                  " Ovs)"
                                : "Yet to bat"
                            }</td>
                        </tr>
                    </table>
                    <p>${match.status}</p>
                </a>
            </div>

            <div class="list-style-link">
                <ul>
                    <li><a href="#">Live Score</a></li> |
                    <li><a href="#">Scorecard</a></li>
                </ul>
            </div>
        `;

    liveMatches.appendChild(matchCard);
  });
}

// Page load par API call karein
fetchMatches();
