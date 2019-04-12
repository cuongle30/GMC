document.querySelector(".container").addEventListener("click", function(event) { 
    if (event.target.tagName == "BUTTON") {
    // Variable to grab data from inside button
    var search = event.target.innerText
    // Constructing a queryURL using the animal name
    var queryURL = `https://www.googleapis.com/youtube/v3/videos?${search}&key=AIzaSyCSWFckVRIzwf7VdUWd4EFtufS3Ma3Mp0&part=snippet,contentDetails,statistics,status`;
    
    var movie = this.dataset.name;
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

      console.log(queryURL)
    // Performing a request with the queryURL
    fetch(queryURL, {
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) { return response.json() })
      .then(function(response) {
        console.log(queryURL);
        console.log(response);
      
        var result = response.data;
        
      })}})
