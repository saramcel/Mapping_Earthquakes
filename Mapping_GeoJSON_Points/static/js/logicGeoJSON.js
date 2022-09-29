// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map("mapid", {
  center: [
    37.5, -122.5
  ],
  zoom: 10
  });

// Using the setView method it would be like this:
// let map = L.map('mapid').setView([[36.1733, -120.1794],7]);

// Add ONE SINGLE POINT GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

//Please note that the coordinates appear in reverse order [-122.375, 37.61899948120117], compared to their order in the setView() method. This is because the GeoJSON data coordinates are set with the first parameter as X (longitude) and the second parameter as Y (latitude)
//The L.geoJSON()layer reverses the coordinates to plot them on the map.
// Grabbing our GeoJSON data.
L.geoJSON(sanFranAirport).addTo(map);

// Grabbing our GeoJSON data.
L.geoJSON(sanFranAirport, {
    
    // We turn selected features into a marker on the map.
    pointToLayer: function(feature, latlng) {
      console.log(feature);
      return L.marker(latlng)
      .bindPopup("<h2> Airport code: " + feature.properties.faa + "</h2> <hr> <h3> Airport Name: " + feature.properties.name);
    }
    
}).addTo(map);

// //put each feature into the console
// L.geoJSON(sanFranAirport, {
    
//    onEachFeature: function(feature, layer) {
//     console.log(layer);
//     // This popup appears to be blank for some reason????
//     layer.bindPopup();
// }
//}).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
    //  Add a marker to the map for Los Angeles, California.
    
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);