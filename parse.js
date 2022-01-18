

const parseKMZ = require('parse2-kmz');
const fs = require('fs');

    parseKMZ.toJson('recorrido (47).kmz')
        .then(data => {
            fs.writeFileSync('JSONs/recorrido (47).json', JSON.stringify(data))})
        .catch(console.error);
    console.log('PRIMERO');
    const getCoordinates = require('./coordinates');
    
    getCoordinates('JSONs/recorrido (47).json', 'Coordinates/recorrido (47).json');

