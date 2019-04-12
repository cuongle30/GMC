

var suggestedMovies = ["Avengers", "Get Smart"]

function runSuggested() {
  var i;
  for (i = 0; i < suggestedMovies.length; i++) {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = suggestedMovies[i];
    btn.setAttribute("id", suggestedMovies[i]);
    document.getElementById("suggested").appendChild(btn);
  }}
  runSuggested();

  document.getElementById("container").addEventListener("click", function (event) {
    if (event.target.tagName == "BUTTON") {
      // Variable to grab data from inside button
      var search = event.target.innerText
      // Constructing a queryURL using the animal name
      var queryURL = `https://www.googleapis.com/youtube/v3/videos?${search}&key=AIzaSyCSWFckVRIzwf7VdUWd4EFtufS3Ma3Mp0&part=snippet,contentDetails,statistics,status`;

      var movie = event.target.innerText
      var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

      console.log(queryURL)
      // Performing a request with the queryURL
      fetch(queryURL, {
        method: "GET"
      })
        // After data comes back from the request
        .then(function (response) { return response.json() })
        .then(function (response) {
          console.log(queryURL);
          console.log(response);

          var result = response.data;

        })
        var resultRender = document.querySelector("#results");
          resultRender.innerHTML = "";

          for (let item of results) {

            // Creating and storing a div tag
            var suggestedDiv = document.createElement("div");

            // Creating a paragraph tag with the result item's rating
            var p = document.createElement("p")
            p.innerText = `Rating: ${item.rating}`;

            // Creating and storing an image tag
            var resultImage = document.createElement("img");
            suggestedDiv.appendChild(p);
            suggestedDiv.appendChild(resultImage);

            // Prependng the countryDiv to the HTML page in the "#gifs-appear-here" div
            resultRender.prepend(suggestedDiv)
    }}
  })
