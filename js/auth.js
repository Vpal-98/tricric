// const apikey = "f8a60488-cc45-4bbf-ba21-c3efff3b2c69&offset=0";
// const liveMatches = document.querySelector(".schedule.layout");

// const fetchSchedule = async () => {
//   const res = await fetch(
//     `https://api.cricapi.com/v1/currentMatches?apikey=${apikey}&offset=0`
//   );

//   const data = await res.json();
//   console.log(data);
// };

// const API_URL = "f8a60488-cc45-4bbf-ba21-c3efff3b2c69&offset=0";

// async function fetchMatches() {
//   try {
//     const response = await fetch(
//       `https://api.cricapi.com/v1/currentMatches?apikey=${API_URL}&offset=0`
//     );
//     const data = await response.json();
//     console.log(data);

//     if (!data || !data.data) {
//       document.getElementById("matchesContainer").innerHTML =
//         "<p>No matches found.</p>";
//       return;
//     }

//     displayMatches(data.data);
//   } catch (error) {
//     console.error("Error fetching matches:", error);
//     document.getElementById("matchesContainer").innerHTML =
//       "<p>Error loading matches.</p>";
//   }
// }

// function displayMatches(matches) {
//   const container = document.getElementById("matchesContainer");
//   container.innerHTML = "";

//   matches.forEach((match) => {
//     const matchCard = document.createElement("div");
//     matchCard.classList.add("match-card");

//     matchCard.innerHTML = `
//             <h2>${match.name}</h2>
//             <p><strong>Series:</strong> ${match.series}</p>
//             <p><strong>Status:</strong> ${match.status}</p>
//             <p><strong>Teams:</strong> ${match.teamInfo[0].name} vs ${match.teamInfo[1].name}</p>
//             <p><strong>Venue:</strong> ${match.venue}</p>
//         `;

//     container.appendChild(matchCard);
//   });
// }

// // Call API on page load
// fetchMatches();

const apiKey = "f8a60488-cc45-4bbf-ba21-c3efff3b2c69&offset=0"; // 👈 Yahan apna API key daalein

async function fetchMatches() {
  try {
    const response = await fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${apikey}&offset=0`
    );
    const data = await response.json();
    console.log(data);

    if (!data || !data.data) {
      document.getElementById("matchContainer").innerHTML =
        "<p>No matches found.</p>";
      return;
    }

    displayMatches(data.data);
  } catch (error) {
    console.error("Error fetching matches:", error);
    document.getElementById("matchContainer").innerHTML =
      "<p>Error loading matches.</p>";
  }
}

function displayMatches(matches) {
  const container = document.getElementById("matchContainer");
  container.innerHTML = ""; // Clear previous content

  matches.forEach((match) => {
    if (!match.teamInfo || match.teamInfo.length < 2) return;

    const matchCard = document.createElement("div");
    matchCard.classList.add("layout");

    matchCard.innerHTML = `
            <ul>
                <li>
                    <div class="date">${match.series}</div>
                </li>
            </ul>

            <div class="vs">
                <div class="vs1">
                    <h5>
                        <a href="#"><b>${match.teamInfo[0].name} v/s ${
      match.teamInfo[1].name
    }</b></a>
                    </h5>
                    <span><small>, ${match.matchType.toUpperCase()}</small></span>
                </div>
                <p>
                    <small>
                        ${match.date} • ${match.venue}
                    </small>
                </p>
            </div>

            <div class="live-scores">
                <a href="#">
                    <table>
                        <tr>
                            <td>${match.teamInfo[0].shortname}</td>
                            <td>${
                              match.score && match.score[0]
                                ? match.score[0].runs +
                                  "-" +
                                  match.score[0].wickets +
                                  " (" +
                                  match.score[0].overs +
                                  " Ovs)"
                                : "Yet to bat"
                            }</td>
                        </tr>
                        <tr>
                            <td>${match.teamInfo[1].shortname}</td>
                            <td>${
                              match.score && match.score[1]
                                ? match.score[1].runs +
                                  "-" +
                                  match.score[1].wickets +
                                  " (" +
                                  match.score[1].overs +
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

    container.appendChild(matchCard);
  });
}

// Call API on page load
fetchMatches();
