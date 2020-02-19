// Create a map object
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 5
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-satellite",
    accessToken: API_KEY
  }).addTo(myMap);

  var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  // Create a map object
  d3.json(url).then((data) => {
    console.log(data)
    var features = data['features'];
    console.log(features)
    for (var i = 0; i < features.length; i++){
        var magnitude = features[i]['properties']['mag']
        console.log(magnitude)

        var geometry = features[i]['geometry']
        console.log(geometry)
        var coordinates = geometry['coordinates']
        console.log(coordinates)
        var longitude = coordinates[0]
        var latitude = coordinates[1]
        var location = [longitude,latitude]
        console.log(location)

        var color = "";
        if (magnitude > 5) {
            color = '#EA2C2C';
         }
        else if (magnitude > 4) {
          color = "#EA822C";
         }
         else if (magnitude > 3) {
           color = "#EE9C00";
         }
         else if (magnitude > 2) {
            color = "#EECC00";
          }
          else if (magnitude > 1) {
            color = "#D4EE00";
          }
          else {
            color = "#98EE00";
         };

    // Add circles to map
    L.circle(location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      // Adjust radius
      radius: magnitude*10000
    }).bindPopup("<h1>Location:" + location + "</h1> <hr> <h3>Magnitude: " + magnitude + "</h3>").addTo(myMap);
    
    
  
  }
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function() {

    var div = L.DomUtil.create('div', 'info legend');
    var grades = [0, 1, 2, 3, 4, 5];
    // var colors = [
    //   "#98EE00",
    //   "#D4EE00",
    //   "#EECC00",
    //   "#EE9C00",
    //   "#EA822C",
    //   "#EA2C2C"
    // ];
    var labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
      '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    };
    return div;
};

legend.addTo(myMap);
});

function getColor(i) {
  return i > 5 ? '#F30' :
  i > 4  ? '#F60' :
  i > 3  ? '#F90' :
  i > 2  ? '#FC0' :
  i > 1   ? '#FF0' :
            '#9F3';
}

  // Country data
// var countries = [
//     {
//       name: "Brazil",
//       location: [-14.2350, -51.9253],
//       points: 227
//     },
//     {
//       name: "Germany",
//       location: [51.1657, 10.4515],
//       points: 218
//     },
//     {
//       name: "Italy",
//       location: [41.8719, 12.5675],
//       points: 156
//     },
//     {
//       name: "Argentina",
//       location: [-38.4161, -63.6167],
//       points: 140
//     },
//     {
//       name: "Spain",
//       location: [40.4637, -3.7492],
//       points: 99
//     },
//     {
//       name: "England",
//       location: [52.355, 1.1743],
//       points: 98
//     },
//     {
//       name: "France",
//       location: [46.2276, 2.2137],
//       points: 96
//     },
//     {
//       name: "Netherlands",
//       location: [52.1326, 5.2913],
//       points: 93
//     },
//     {
//       name: "Uruguay",
//       location: [-32.4228, -55.7658],
//       points: 72
//     },
//     {
//       name: "Sweden",
//       location: [60.1282, 18.6435],
//       points: 61
//     }
//   ];
  
  
//   // Loop through the cities array and create one marker for each city object
//   for (var i = 0; i < countries.length; i++) {
  
//     // Conditionals for countries points
//     var color = "";
//     if (countries[i].points > 200) {
//       color = "yellow";
//     }
//     else if (countries[i].points > 100) {
//       color = "blue";
//     }
//     else if (countries[i].points > 90) {
//       color = "green";
//     }
//     else {
//       color = "red";
//     }
  
//     // Add circles to map
//     L.circle(countries[i].location, {
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: color,
//       // Adjust radius
//       radius: countries[i].points * 1500
//     }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
//   }