// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map("mapid", {
  center: [
    30,30
  ],
  zoom: 2
  });

// Using the setView method it would be like this:
// let map = L.map('mapid').setView([[30,30],2]);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'streets' tile layer to the map.
streets.addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/saramcel/Mapping_Earthquakes/main/majorAirports.json";

// Grabbing our GeoJSON data. 
// This makes a promise and then you have to do a function to get anything done with the data. Ugh.
d3.json(airportData).then(function(data) {
  //console.log(data);
// Creating a GeoJSON layer with the retrieved data. this takes the long lat and reverses it to be lat long.
L.geoJSON(data).addTo(map);

});

d3.json(airportData).then(function(data) {

  // Loop through and make a pop-up for each airport
  L.geoJSON(data, {
      
     onEachFeature: function(feature, layer) {
      console.log(feature);
      return L.marker(layer)
      .bindPopup("<h2> Airport code: " + feature.properties.faa + "</h2> <hr> <h3> Airport Name: " + feature.properties.name);
  }
  }).addTo(map);

});
