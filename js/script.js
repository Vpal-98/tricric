// // https://api.cricapi.com/v1/series?apikey=f8a60488-cc45-4bbf-ba21-c3efff3b2c69&offset=0

const apikey = "f8a60488-cc45-4bbf-ba21-c3efff3b2c69&offset=0";
const scheduleContainer = document.querySelector(
  ".schedule .container .layout"
);

const fetchSchedule = async () => {
  try {
    // try is the block of handle the potential errors when making a api request.
    const response = await fetch(
      //fetch is the make a http request to given url.
      `https://api.cricapi.com/v1/series?apikey=${apikey}&offset=0`
    ); //response.json() converts JSON response to a JavaScript object.
    //await response.json() ensures JavaScript waits for conversion to complete.

    const data = await response.json(); //const data = await response.json();
    console.log(data);

    const filteredData = data.data.sort(
      //sort() is used to arrange the array elements.
      //data.data is the array of objects.
      (a, b) => new Date(a.startDate) - new Date(b.startDate)
    );
    console.log(filteredData);

    // console.log(data);

    if (data && data.data) {
      // Initialize an empty string to accumulate HTML
      let htmlContent = "";

      // Loop through the data to build the HTML string
      filteredData.forEach((series) => {
        function formatDate(i) {
          const date = new Date(i);
          const options = {
            weekday: "short",
            month: "short",
            day: "2-digit",
            year: "numeric",
          };
          const formattedDate = date
            .toLocaleDateString("en-US", options)
            .toUpperCase();
          return formattedDate;
        }

        htmlContent += `
            <ul>
              <li>
                <div class="date">${formatDate(series.startDate)}</div>
                <div class="row">
                  <div class="col-lg-4">
                    <h6 class="custom-h">
                      <a href="#">${series.name}</a>
                    </h6>
                  </div>
                  <div class="col-lg-8">
                    <div class="list">
                      <div class="item">
                       <p><b>start-date:</b> ${formatDate(series.startDate)}</p>
                       <p><b>end-date:</b> ${formatDate(series.endDate)}</p>
                        <span> Total all matches between: ${
                          series.matches
                        }</span>
                      </div>
                      <div class="item">
                        <b>T20I - ${series.t20}</b>
                        <span>ODI - ${series.odi}</span>
                        <span>Test - ${series.test}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          `;
      });

      // Insert the generated HTML into the container
      scheduleContainer.innerHTML = htmlContent;
    } else {
      console.error("No data available.");
    }
  } catch (error) {
    console.error("डेटा फ़ेच करने में त्रुटि:", error);
  }
};
// fetchSchedule();

// players lists

// const fetchPlayer = async () => {
//   try {
//     // try is the block of handle the potential errors when making a api request.
//     const request = await fetch(
//       //fetch is the make a http request to given url.
//       `https://api.cricapi.com/v1/players?apikey=${apikey}&offset=0`
//     ); //response.json() converts JSON response to a JavaScript object.
//     //await response.json() ensures JavaScript waits for conversion to complete.

//     const data = await request.json(); //const data = await response.json();
//     console.log(data);
//   }
// }
