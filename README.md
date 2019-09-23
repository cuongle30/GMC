#GMC - Great Movies and Chill

##URL for Demo 
https://cuongle30.github.io/GMC

##Our Presentation
https://docs.google.com/presentation/d/1NJJWC8uu4MAgcYdZNuH0SBSS7nDlcYRjbepj80Ns1pg/edit#slide=id.g5692e0e7d8_2_111

###General Description of our final product
Our app allows user to select a movie title or if they don't quite know what to seach for, they can choose from a list what's trending (what other people have searched for). 

After a search or after clicking one of the trending buttons, the site will return with the movie trailer, and movie information: ratings from IMDb and Rotten Tomatoes, stars, plot, etc.

###Description of the methods used
We called to 2 APIs: OMDb and YoutTube.
We used Firebase to store the title of what others searched for - this database was used for the trending buttons. 
We used Javascript to get the results from our API, we used the title and year response from the OMDb to run the search for the YouTube and got the responses from both API to display. 
If the user doesn't enter any title and tries to search, the call to the APIs does not happen and instead the user is prompted to enter a title. 
If the user enters something that does not have a OMDb title, both the movie info and the trailer are prevented from displaying and the entries are not logged in the Firebase database. 
All of the users' searches are saved in Firebase so in the future if we wanted to expand on the trending to see which one had the most searches, we can do that, but to prevent the same trending button from showing up multiple times, the entries are run through a loop to remove duplicates. 
A few user experience functions were added, to hide and display certain features and to clear the search form after each search. 
We added a favicon, and a fancy shimmering search button to try new technology. 
Multiple media queries were defined to make the app mobile responsive. 
We used Bootstrap for the CSS and a separate CSS file for more fine-tuned styling. 

