const apikey = "f8a60488-cc45-4bbf-ba21-c3efff3b2c69"; // Removed extra offset
const teamContainer = document.querySelector(".container .layout .row");

const fetchTeam = async () => {
  try {
    const response = await fetch(
      `https://api.cricapi.com/v1/countries?apikey=${apikey}&offset=0`
    );

    const data = await response.json();
    console.log(data);

    if (data.status !== "success" || !data.data) {
      console.error("Failed to fetch data", data);
      return;
    }

    // Clear existing content
    teamContainer.innerHTML = "";

    // Loop through the country data
    data.data.forEach((country) => {
      const countryHTML = `
     
        <div class="col-lg-3">
            
          <a href="#" class="flag">

              <img src="${country.genericFlag}" alt="${country.name}" />

            <p>${country.name}</p>

          </a>

        </div>
        
      `;

      teamContainer.innerHTML += countryHTML;
    });
  } catch (error) {
    console.error("Error fetching team data:", error);
  }
};

// Call the function
fetchTeam();
