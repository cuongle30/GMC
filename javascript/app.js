
var youtubeVideos = [];
var ombdInfo = [];
var suggestedMovies = ["Avengers", "Get Smart"]

function runSuggested() {
  var i;
  for (i = 0; i < suggestedMovies.length; i++) {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = suggestedMovies[i];
    btn.setAttribute("id", suggestedMovies[i]);
    document.getElementById("suggested").appendChild(btn);
  }
}
runSuggested();

document.getElementById("container").addEventListener("click", function (event) {
  if (event.target.tagName == "BUTTON") {
    // Variable to grab data from inside button
    var search = event.target.innerText
    var youtubeQueryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&videoCaption=closedCaption&key=AIzaSyDmKkf_-rWtH9yJ4insi91j9DWhxwj1e-o`
    var omdbQueryURL = `https://www.omdbapi.com/?apikey=d34a771e&t=${search}`
    

    // Performing a request with the queryURL for youtube
    fetch(youtubeQueryURL, {
      method: "GET"
    })
      // Return JsonAfter data comes back from the request
      .then(function (response) {
        return response.json()
      })
      .then(function (response) {
        //grab youtube videos from query
        var youtubeVideos = response.items
        // Performing a request with the queryURL for OMDB
        fetch(omdbQueryURL, {
          method: "GET"
        })
          .then(function (response) {
            return response.json()
          })
          .then(function (response) {
            //Grab OMDB data from query
           var omdbInfo = response.Ratings;

            console.log(youtubeVideos);
            console.log(omdbQueryURL)
            console.log(ombdInfo)
          

        var resultRender = document.querySelector("#result");
        //Clear search
        resultRender.innerHTML = "";
        //OMDB for loop

        var movieTitle = document.createElement("h3");
          movieTitle.innerHTML = `Title: ${omdbInfo.Source}`;
        for (let response of omdbInfo) {
          console.log(response)
          // Creating and storing a div tag
          var suggestedDiv = document.createElement("div");
          
          // Creating a paragraph tag with the result item's rating
          var p = document.createElement("p")
          p.innerHTML = `Rating: ${response.Source} ${response.Value}`;

          // Creating and storing an image tag
          var resultImage = document.createElement("img");
          
          suggestedDiv.appendChild(p);
          suggestedDiv.appendChild(resultImage);
          resultRender.prepend(suggestedDiv)
        };

        for (let response of omdbInfo) {
          var resultVideo = document.createElement("video");

          resultVideo.innerHTML = response.id

          

        }

      });
    });
  };
});
