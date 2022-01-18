//const fs = require("fs");
//const parseKMZ = require('parse2-kmz');
//module.export = () => {
//import fs from "fs";
import parseKMZ from 'parse2-kmz';

const fileName = 'recorrido (47)';
const fileKMZ = `../recorrido (47).kmz`;
const fileCompleteJSON = `../JSONs/recorrido (47).json`;
const fileCoordinatesJSON = `../Coordinates/recorrido (47).json`;

let completeJSON;
parseKMZ.toJson('../recorrido (47).kmz')
    .then(data => {
        //fs.writeFileSync('recorrido (47).kmz', JSON.stringify(data))
        completeJSON = data;
      })
    .catch(console.error);

//const data = JSON.parse(fs.readFileSync(completeJSON));
const featuresLength = completeJSON['features'].length;
let coordinates = completeJSON['features'][featuresLength-1]['geometry']['coordinates'];
for (let i = 0; i < coordinates.length; i++){
  coordinates[i].pop([2]);
  coordinates[i] = coordinates[i].reverse();
}
console.log('TERCERO');
//let data2 = JSON.stringify(coordinates);
//fs.writeFileSync(toCoordinatesJSON,data2);

//generateJSON('recorrido (47).kmz' ,`../JSONs/recorrido (47).json`, `../Coordinates/recorrido (47).json`);
//data = JSON.parse(`../Coordinates/recorrido (47).json`);

for (let i = 0; i < data.length; i++){
  averageLatitude += coordinates[i][0];
  averageLongitude += coordinates[i][1];
}
averageLatitude = averageLatitude/coordinates.length;
averageLongitude = averageLongitude/coordinates.length;
var map = L.map("map").setView([averageLatitude,averageLongitude], 10);

var tiles = L.tileLayer(
  "https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
).addTo(map);

var polygon = L.polygon(coordinates).addTo(map).bindPopup("I am a polygon.");

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on("click", onMapClick);
//}