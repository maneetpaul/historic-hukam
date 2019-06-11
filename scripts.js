function run() {

  // Clear the content-root Div of anything already inside it
  document.getElementById("content-root").innerHTML = "";

  // Translates dropdown inputs to JS variables
  let month = document.getElementById("monthOption").value;
  let day = document.getElementById("dayOption").value;
  let year = document.getElementById("yearOption").value;

  // Verify vars are being set
  // console.log(month, day, year);

  // Declare HTML Variables
  const app = document.getElementById('content-root')
  // Creates a container for all the Gurbani divs to live inside
  const container = document.createElement('div')
  container.setAttribute('class','container')
  // Puts the container inside the root div
  app.appendChild(container)

  // Only runs API if a date is selected
  if (month != '' && day != '' && year !=''){

  let apiLink = `https://api.banidb.com/v2/hukamnamas/${year}/${month}/${day}`
  console.log(apiLink);

  // Error Handling function
  function handleErrors(res) {
    if (!res.ok) {
        throw Error(`Hukam cannot be found. Error ${res.status}`);
    } else {
        return res
        }
    }

    // Connect to the API, translate repsponse to JSON
    fetch(apiLink)
    .then(handleErrors)
    .then(response => response.json())
    .then(hukam => {

    // log all the raw API data
    console.log(hukam);

    // PRINT HUKAM
    for (let i = 0; i < hukam.shabads.length; i++) {
        for (let j = 0; j < hukam.shabads[i].verses.length; j++) {

        // Testing
        // console.log(hukam.shabads[i].verses[j].verse.unicode)

          // Creates a div for each line with hukamPrint class
          const hukamPrint = document.createElement('div')
          hukamPrint.setAttribute('class', 'hukamPrint')
          hukamPrint.textContent = hukam.shabads[i].verses[j].verse.gurmukhi

          // Put hukamPrint divs into the container
          container.appendChild(hukamPrint)

        } // second for
    } // for

    // Link Hukam to STTM
    let sttmShabadId = hukam.shabadIds[0]
    const sttmRedirectContainer = document.createElement('div')
    sttmRedirectContainer.setAttribute('class','sttmRedirectContainer')
    container.appendChild(sttmRedirectContainer)

    const sttmRedirectUrl = document.createElement('a')
    sttmRedirectUrl.textContent = 'Open in SikhiToTheMax...'
    sttmRedirectUrl.setAttribute("href",'https://www.sikhitothemax.org/shabad?id=' + sttmShabadId)
    sttmRedirectUrl.setAttribute('target','_blank')
    sttmRedirectUrl.setAttribute('class','sttmRedirectUrl')
    sttmRedirectContainer.appendChild(sttmRedirectUrl)


    }) // then hukam

  } else {
    console.log('Date not chosen');
  } // else
} // run()


/* To Do:

- Error handling for no hukam (1/1/2019)
- Styling hukamPrint

*/
