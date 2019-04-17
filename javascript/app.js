var youtubeVideos = [];
var suggestedMovies = ["Avengers", "Get Smart"]
var titleSearch = "";

// --- form validation ---

$("#title-validation").hide();

// function for created prepopulated buttons
function createSuggestedButtons() {
  var i;
  for (i = 0; i < suggestedMovies.length; i++) {
    var btn = document.createElement("BUTTON");
    // setting and onlick event
    btn.onclick = displayMovieInfo;
    // button will show the suggested movie title
    btn.innerHTML = suggestedMovies[i];
    // Adding a class of movie-btn to our button
    btn.classList.add("movie-btn");
    btn.setAttribute("id", suggestedMovies[i]);
    document.getElementById("suggested").appendChild(btn);
  }
}
// run the function to created the suggested movie buttons
createSuggestedButtons();

// --- YouTube button ---
//Click event and query Youtube for recommended button title
document.getElementById("suggested").addEventListener("click", function (event) {
  event.preventDefault();
  var recommended = event.target.innerText + "official trailer"
  var youtubeQueryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${recommended}&key=AIzaSyDmKkf_-rWtH9yJ4insi91j9DWhxwj1e-o`
  // create a function for performing a request with the queryURL for youtube
  function youtubeFetch() {
    fetch(youtubeQueryURL, {
      method: "GET"
    })
      // Return JsonAfter data comes back from the request
      .then(function (response) {
        return response.json()
      })
      .then(function (response) {
        //Settimeout to allow for response to pull
        document.addEventListener(
          'DOMContentLoaded', () => setTimeout(initializeFreshchatWidget, 100)
        )
        console.log("youtube api responded")
        console.log(response)
        //grab youtube videos from query
        var youtubeVideos = response.items[0].id.videoId
        ytplayer.loadVideoById({ videoId: youtubeVideos })
      });
  }
  // call the youtubeFetch function

  youtubeFetch();
});

//  --- YoutTube search ---
//Click event and query YouTube for Search button
document.getElementById("movie-search-btn").addEventListener("click", function (event) {
  event.preventDefault();

  // Variable to grab data from user search
  var titleSearch = document.getElementById("title-input").value.trim();
  // form validation
  if (titleSearch == "") {
    $('#title-validation').slideDown("slow");
    $('#title-validation').slideUp(3000);
  } else {
    var search = titleSearch + "official trailer"
    var youtubeQueryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&key=AIzaSyDmKkf_-rWtH9yJ4insi91j9DWhxwj1e-o`

    // Performing a request with the queryURL for youtube
    fetch(youtubeQueryURL, {
      method: "GET"
    })
      // Return JsonAfter data comes back from the request
      .then(function (response) {
        return response.json()
      })
      .then(function (response) {
        //Settimeout to allow for response to pull
        document.addEventListener(
          'DOMContentLoaded', () => setTimeout(initializeFreshchatWidget, 100)
        )
        console.log("youtube api responded")
        console.log(response)
        //grab youtube videos from query
        var youtubeVideos = response.items[0].id.videoId
        ytplayer.loadVideoById({ videoId: youtubeVideos })
      });
  }
});

//create iframe for youtube
function video() {
  console.log("video function call")
  var tag = document.createElement('script');
  tag.id = 'iframe-demo';
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

//run youtube function.
var ytplayer;
function onYouTubeIframeAPIReady() {
  console.log("onYouTubeIframeAPIReady")
  ytplayer = new YT.Player('spherical-video-player', {
    height: '56%',
    width: '85%',
  });
}
video();


// --- OMDB buttons ---

// OMDB search for suggested movies
// displayMovieInfo function that is called when the button is clicked
function displayMovieInfo() {

  // Only run code if the current element has the "movie-btn" class
  if (this.classList.contains("movie-btn")) {
    // Set the movie search to the button id that we set earlier 
    var movie = event.target.getAttribute("id");

    // create the API search
    var queryURL = `https://www.omdbapi.com/?t="${movie}&apikey=d34a771e`;

    // Creating an AJAX call for the specific movie button being clicked
    // Check if fetch is supported in the browser. If so use fetch 
    if (window.fetch) {
      fetch(queryURL, {
        method: "GET"
      })
        .then((result) => result.json())
        .then((response) => {
          if (response.Error) {
            console.error(response.Error);
          } else {
            renderMovieElements(response);
          }
        });
    } else { // if fetch is not supported use XHR
      const xhr = new XMLHttpRequest();
      xhr.open("GET", queryURL);
      xhr.onload = event => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let response = JSON.parse(xhr.response)
            renderMovieElements(response);
          } else {
            console.error(xhr.responseText);
          }
        }
      };
      xhr.onerror = event => {
        console.error(xhr.responseText);
      };
      xhr.send();
    }
  }
  // display the results when someone clicks the suggested movies button
  shiftFocalPoint()
  $("#results").show();
  
}

// Function for building our ajax response
function renderMovieElements(response) {
  // Creating a div to hold the movie
  var movieDiv = document.createElement("div");
  // bootstrap styling
  movieDiv.setAttribute("class", "movie p-2 mr-2");

  // storing the title data
  var title = response.Title;

  // creating an element to hold the title
  var h2Title = document.createElement("h2");
  h2Title.innerText = `${title}`;

  // displaying the title
  movieDiv.appendChild(h2Title);

  // Retrieving the URL for the image
  var posterImgURL = response.Poster;

  // Creating an element to hold the image
  var posterImage = document.createElement("img");
  posterImage.setAttribute("src", posterImgURL);

  // Appending the image
  movieDiv.appendChild(posterImage);

  // storing the genre data
  var genre = response.Genre;

  // creating an element to hold the genre
  var pGenre = document.createElement("p");
  pGenre.innerText = `Genre: ${genre}`;

  // displaying the genre
  movieDiv.appendChild(pGenre);

  // storing the movie length data
  var movieLength = response.Runtime;

  // creating an element to hold the genre
  var pMovieLength = document.createElement("p");
  pMovieLength.innerText = `Movie length: ${movieLength}`;

  // displaying the genre
  movieDiv.appendChild(pMovieLength);

  // Storing the rating data
  var rating = response.Rated;

  // Creating an element to have the rating displayed
  var pRating = document.createElement("p");
  pRating.innerText = `Rating: ${rating}`;

  // Displaying the rating
  movieDiv.appendChild(pRating);

  // Storing the release year
  var released = response.Released;

  // Creating an element to hold the release year
  var pReleased = document.createElement("p");
  pReleased.innerText = `Released: ${released}`;

  // Displaying the release year
  movieDiv.appendChild(pReleased);

  // Storing the plot
  var plot = response.Plot;

  // Creating an element to hold the plot
  var pPlot = document.createElement("p");
  pPlot.innerText = `Plot: ${plot}`;

  // Appending the plot
  movieDiv.appendChild(pPlot);

  // Storing the actors
  var actors = response.Actors;

  // Creating an element to hold the actors
  var pActors = document.createElement("p");
  pActors.innerText = `Actors: ${actors}`;

  // Appending the actors
  movieDiv.appendChild(pActors);

  // Putting the entire movie above the previous movies
  let movieParent = document.querySelector("#omdb-movie-results");
  movieParent.replaceChild(movieDiv, movieParent.firstChild);
}

// --- OMDB Search --
// this is the same as the Youtube -- consider combining
document.getElementById("movie-search-btn").addEventListener("click", function (event) {
  event.preventDefault();

  // Variable to grab data from inside button
  var titleSearch = document.getElementById("title-input").value.trim();

  // data validation
  if (titleSearch !== "") {
    var queryURL = `https://www.omdbapi.com/?t="${titleSearch}&apikey=d34a771e`;

    // Creating an AJAX call for the search
    // Check if fetch is supported in the browser. If so use fetch 
    if (window.fetch) {
      fetch(queryURL, {
        method: "GET"
      })
        .then((result) => result.json())
        .then((response) => {
          if (response.Error) {
            console.error(response.Error);
          } else {
            renderMovieElements(response);
          }
        });
    } else { // if fetch is not supported use XHR
      const xhr = new XMLHttpRequest();
      xhr.open("GET", queryURL);
      xhr.onload = event => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let response = JSON.parse(xhr.response)
            renderMovieElements(response);
          } else {
            console.error(xhr.responseText);
          }
        }
      };
      xhr.onerror = event => {
        console.error(xhr.responseText);
      };
      xhr.send();
    }

    // display the results when someone does a search
    $("#results").show();

    shiftFocalPoint () 

  }
});

// --- UX/UI ---
// --- to remove duplicate buttons ---
// globally accessible empty firebase array to add to 
var firebaseMovies = []
// an array to store only the unique values
var uniqueMovies = []

// hide the suggested buttons until someone clicks
$("#suggested").hide();

// when someone clicks the suggested button
$("#suggested-toggle").click(function () {
  console.log("suggested movie has been clicked");
  // add everything in the suggested div to an array
  $(".movie-btn").each(function(){
    console.log("this id is: " + this.id);
    firebaseMovies.splice(0,0, this.id);
  })
  console.log("the firebaseMovies array: " + firebaseMovies);
  // capture only the unique values
  uniqueMovies = getUnique(firebaseMovies);
  console.log("the new unique movies array: " + uniqueMovies);
  clearExistingButtons();
  addUniqueButtons();
  $("#suggested").slideToggle();
});

// function for shift focal point
function shiftFocalPoint () {
  document.getElementById("enticing-image").style.height = "0px";
  $(".photo-credit").hide();
  document.getElementById("movie-search").removeAttribute("class");
  document.getElementById("movie-search").setAttribute("class", "col-12 rounded" );
  document.getElementById("movie-search").style.position = "static";
}

//create a function to help remove duplcations pulled from: https://www.tutorialrepublic.com/faq/how-to-remove-duplicate-values-from-a-javascript-array.php
function getUnique(array){
  var uniqueArray = [];
  for (i=0; i < array.length; i++) {
    if(uniqueArray.indexOf(array[i]) === -1) {
      uniqueArray.push(array[i]);
    }
  }
  return uniqueArray;
}

// function to loop through unqie array and make buttons
function addUniqueButtons (){
  var i;
  for (i=0; i < uniqueMovies.length; i++) {
      let newBtn = document.createElement("BUTTON")
      newBtn.innerHTML = uniqueMovies[i];
      newBtn.onclick = displayMovieInfo;

      newBtn.setAttribute("class", "movie-btn btn btn-outline-secondary");

      newBtn.setAttribute("id", uniqueMovies[i]);
      document.getElementById("suggested").appendChild(newBtn);
  }
}

// function to clear existing buttons
function clearExistingButtons() {
  $("#suggested").empty();
  // var existingButtons = document.getElementById("suggested");
  // while (existingButtons.hasChildNodes()) {
  //   existingButtons.removeChild(existingButtons.firstChild);
  // }
}


// hide the results area until someone clicks a button or searches for a movie
$("#results").hide();

// --- firebase ---
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBWpkmTPb8Jz22vRZY3PEH4HlmPBlN_-LY",
  authDomain: "great-movies-and-chill.firebaseapp.com",
  databaseURL: "https://great-movies-and-chill.firebaseio.com",
  projectId: "great-movies-and-chill",
  storageBucket: "great-movies-and-chill.appspot.com",
  messagingSenderId: "511630558004"
};

firebase.initializeApp(config);

var database = firebase.database();

// when someone does a search -- may be redundant -- consider looping together with omdb and youtube search
document.getElementById("movie-search-btn").addEventListener("click", function (event) {
  event.preventDefault();

  // Variable to grab data from inside button
  var titleSearch = document.getElementById("title-input").value.trim();

  // data validation
  if (titleSearch !== "") {

    // create local "temporary" object for holding movie searches
    var newMovie = {
      titleSearch: titleSearch
    };

    // upload new movie data to the database
    database.ref().push(newMovie);

    // log to console
    console.log(newMovie.titleSearch);

    // --- UI/UX ---
    // clear the text field after someone searches
    document.getElementById("title-input").value = "";
  }
})


// create Firebase event for adding movie to the database
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // store everything into a variable
  var titleSearch = childSnapshot.val().titleSearch;

  // displayMovieInfo -- this part is important! how can i get this to compare with what already exists in the html (that it just created)? the firebase would be loaded but the html wouldn't 
  console.log(titleSearch);

  // create temp object of our values
  let tempMovieData = {
    titleSearch: titleSearch
  };

  console.log(tempMovieData);
  // loop through the childSnapshot object and add buttons
  for (let prop of Object.values(tempMovieData)) {
    let newBtn = document.createElement("BUTTON")
    newBtn.innerHTML = prop;
    newBtn.onclick = displayMovieInfo;
    newBtn.classList.add("movie-btn");
    newBtn.setAttribute("id", prop);
    document.getElementById("suggested").appendChild(newBtn);
  }

}) 
    
    

    
    

