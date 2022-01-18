const fs = require('fs');
const getCoordinates = (completeJSON, toCoordinatesJSON) => {
  const data = JSON.parse(fs.readFileSync(completeJSON));
  const featuresLength = data['features'].length;
  let coordinates = data['features'][featuresLength-1]['geometry']['coordinates'];
  for (let i = 0; i < coordinates.length; i++){
    coordinates[i].pop([2]);
    coordinates[i] = coordinates[i].reverse();
  }
  console.log('TERCERO');
  let data2 = JSON.stringify(coordinates);
  fs.writeFileSync(toCoordinatesJSON,data2);
};
module.exports = getCoordinates;
