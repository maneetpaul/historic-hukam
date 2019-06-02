function run() {

  // Translates dropdown inputs to JS variables
  let month = document.getElementById("monthOption").value;
  let day = document.getElementById("dayOption").value;
  let year = document.getElementById("yearOption").value;

  // Verify vars are being set
  // console.log(month, day, year);

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
          console.log(hukam.shabads[i]);

      }

    }) // fetch


  } else {
    console.log('Date not chosen');
  }
} // run()
