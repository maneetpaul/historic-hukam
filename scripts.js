function run() {

  // Translates dropdown inputs to JS variables
  let month = document.getElementById("monthOption").value;
  let day = document.getElementById("dayOption").value;
  let year = document.getElementById("yearOption").value;

  // Verify vars are being set
  // console.log(month, day, year);

  // Declare HTML Variables
  const app = document.getElementById('root2')
  // Creates a container for all the Gurbani divs to live inside
  const container = document.createElement('div')
  container.setAttribute('class','container')
  // Puts the container inside the root div
  app.appendChild(container)

  // Only runs API if a date is selected
  if (month != '' && day != '' && year !=''){

  let apiLink = `https://api.banidb.com/v2/hukamnamas/${year}/${month}/${day}`
  console.log(apiLink);

    // Connect to the API, translate repsponse to JSON
    fetch(apiLink)
    .then(response => response.json())
    .then(hukam => {

      // log all the raw API data
      console.log(hukam);

      for (let i = 0; i < hukam.shabads.length; i++) {
          for (let j = 0; j < hukam.shabads[i].verses.length; j++) {

          // Testing
          // console.log(hukam.shabads[i].verses[j].verse.unicode)

            // Creates a div for each line with hukamPrint class
            const hukamPrint = document.createElement('div')
            hukamPrint.setAttribute('class', 'hukamPrint')
            hukamPrint.textContent = hukam.shabads[i].verses[j].verse.unicode

            // Put hukamPrint divs into the container
             container.appendChild(hukamPrint)

          } // second for
      } // for

    }) // then fetch


  } else {
    console.log('Date not chosen');
  } // else
} // run()


/* To Do:

- Error handling for no hukam (1/1/2019)
- Prevent multiple queries from stacking
- Styling hukamPrint

*/
