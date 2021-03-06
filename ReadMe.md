
# Neighborhood Map - Mohit Menghnani

This is one of the projects of the udacity front end nano degree program. I have developed a single page application featuring a map in the SF downtown neighborhood with some of my favorite places to visit. Each Place has a marker on the map. Clicking on the marker highlights the marker to a green color and opens an info window listing more details about the location(their website, phone number, and exact address. There is also a left navigation bar listing all the locations. Clicking on any of the locations from the list view also highlights the corresponding marker in the map.

There is a search functionality in the application. The listings in the list view and the markers update according to the filtering criteria entered in the search text box.

# API
The location data is being pulled from the foursquare API and the map is being generated using google maps API.

# Framework Used
I have used knockout JS framework for this application

# Code
HTML
Index.html - This is where all the data-bindings have created

JS
1) app.js - This is where all the logic is stored
2) knockout-min.js - Knockout Framework file
3) bootstrap.js - Bootstrap js file

CSS
1) bootstrap.min.css - CSS file for the bootstrap framework
2) styles.css - Customized styling for the project

# Tools/Skills utilized for this project
1) Javascript
2) Jquery
3) Knockout JS
4) Foursquare API
5) Google Maps API
6) Bootstrap

# Live Version of this application is hosted at
https://mmenghnani.github.io/Neighborhood/

# Steps to run the application
1) Open the folder and click on index.html
2) Click on the hamburger menu on the top left. This will display a list
3) Enter the 3 starting alphabets of any of the destinations in the searhbox. For example : Gol. This will update the list and the markers in the map to display one. Related to Golden gate.
4) Now, click on reset to reset the map and display all markers and the complete list
5) Click on any of any of the items on the list
6) The color of the corresponding marker on the map will change to green and the infoWindow will open automatically.
7) Now close the infoWindow and click on any of the markers on the screen
8) The corresponding list in the left navigation will be highlighted
9) Enjoy the reviews of my favorite places in SF ;)

