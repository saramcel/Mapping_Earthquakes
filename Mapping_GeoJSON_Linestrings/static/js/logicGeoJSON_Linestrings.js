// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let navDay = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'streets' tile layer to the map.
//streets.addTo(map);

// We create the dark view tile layer that will be an option for our map.
let navNight = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Day Navigation": navDay,
  "Night Navigation": navNight
};

// Create the map object with a center and zoom level.
let map = L.map("mapid", {
  center: [
    44.0, -80.0
  ],
  zoom: 2,
  layers: [navNight]
  });

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/saramcel/Mapping_Earthquakes/main/torontoRoutes.json";

// Create a style for the lines. This can also be done in the d3 function but it's easier to read it this way i guess.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

// Grabbing our GeoJSON data. 
// This makes a promise and then you have to do a function to get anything done with the data. Ugh.
// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
  style: myStyle,
  onEachFeature: function(feature,layer){
    layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr> <h3> Destination: " + feature.properties.dst + "</h3>");
  }

  })
  .addTo(map);
});

