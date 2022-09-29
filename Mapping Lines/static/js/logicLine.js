// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map("mapid", {
  center: [
    37.6213, -122.3790
  ],
  zoom: 5
  });

// Using the setView method it would be like this:
// let map = L.map('mapid').setView([[36.1733, -120.1794],7]);

// Get data from cities.js
let cityData = cities;

// Coordinates for each point to be used in the line.
let line = [
  
  [37.6213, -122.3790],
  [30.1975, -97.6664], 
  [43.6777,-79.6248],
  [40.641312,-73.778137]
  
];

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
  //color: "blue",
  weight: 4,
  opacity: .5,
  coloe: "blue",
  dashArray: "6"

}).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
    //  Add a marker to the map for Los Angeles, California.
    
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);