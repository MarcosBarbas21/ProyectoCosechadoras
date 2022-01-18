//import fs from 'fs';
const fs = require("fs");
//import { difference } from 'lodash';
const coords = fs.readFileSync("./Coordinates/recorrido (47).json");
const data = JSON.parse(coords);

let raysX = [];
let raysY = [];

let loft = [
    [
        -62.9451799,
        -35.9885978
      ],
      [
        -62.9373264,
        -35.9823124
      ],
      [
        -62.9354382,
        -35.9838578
      ],
      [
        -62.9349446,
        -35.9843266
      ],
      [
        -62.9344726,
        -35.9848301
      ],
      [
        -62.933507,
        -35.9856288
      ],
      [
        -62.9291296,
        -35.9889971
      ],
      [
        -62.9368973,
        -35.9953514
      ],
      [
        -62.9452014,
        -35.9886152
      ]
    /*[-62.9530549, -35.9822777],
    [-62.9451370, -35.9757835],
    [-62.9373264, -35.9822083],
    [-62.9452014, -35.9886672],
[-62.9531193, -35.9822430]*/];

for (let i = 0; i < loft.length; i++){
    loft[i] = loft[i].reverse();
}
//console.log(data);
//console.log(loft);

let minPointX = loft[0][0];
let minPointY = loft[0][1];
let maxPointX = loft[0][0];
let maxPointY = loft[0][1];

for (let i = 0; i < loft.length; i++){
    if (loft[i][0] < minPointX){
        minPointX = (loft[i][0]);
    }
    if (loft[i][1] < minPointY){
        minPointY = (loft[i][1]);
    }
    if (loft[i][0] > maxPointX){
        maxPointX = (loft[i][0]);
    }
    if (loft[i][1] > maxPointY){
        maxPointY = (loft[i][1]);
    }
    /*if (loft[i][1] > loft[i+1][0]){
        minPoint[0][0].push(loft[i][0]);
    }*/

}
//console.log(minPointX);
//console.log(maxPointX);
//console.log(minPointY);
//console.log(maxPointY);
const errorMargin = 1;
//minPointX -= errorMargin;
//minPointY -= errorMargin;
//maxPointX += errorMargin;
//maxPointY += errorMargin;

// We want the line in linear equation standard form: A*x + B*y + C = 0

let aVariableLoft = [];
let bVariableLoft = [];
let cVariableLoft = [];
for (let i = 0; i < loft.length -1; i++){
    aVariableLoft.push(-(loft[i+1][1]-loft[i][1]));
    bVariableLoft.push(loft[i+1][0]-loft[i][0]);
    cVariableLoft.push(-((loft[i+1][0]*loft[i][1])-(loft[i][0]*loft[i+1][1])));
    //console.log(aVariable[i],bVariable[i],cVariable[i]);
}

let aVariableaCoord = [];
let bVariableCoord = [];
let cVariableCoord = [];
for (let i = 0; i < data.length -1; i++){
    aVariableaCoord.push(-(data[i+1][1]-data[i][1]));
    bVariableCoord.push(data[i+1][0]-data[i][0]);
    cVariableCoord.push(-((data[i+1][0]*data[i][1])-(data[i][0]*data[i+1][1])));
    //console.log(aVariable[i],bVariable[i],cVariable[i]);
}

let coincidentMap = [];

for (let i = 0; i < data.length; i++){
    if (data[i][0] > minPointX && data[i][0] < maxPointX && data[i][1] > minPointY && data[i][1] < maxPointY){
        let count = 0;
        let d1 = 0;
        let d2 = 0;
        let d3 = 0;
        let d4 = 0;
        for (let j = 0; j < aVariableLoft.length; j++){
            d1 = (bVariableLoft[j] * minPointX) + (aVariableLoft[j] * data[i][0]) + cVariableLoft[j];
            d2 = (bVariableLoft[j] * data[i][1]) + (aVariableLoft[j] * data[i][0]) + cVariableLoft[j];
            /*d3 = (bVariableCoord[i] * minPointX) + (aVariableaCoord[i] * data[j][0]) + cVariableCoord[i];
            d4 = (bVariableCoord[i] * data[j][1]) + (aVariableaCoord[i] * data[j][0]) + cVariableCoord[i];*/
            //console.log(d1);
            //console.log(d2);
            //console.log(minPointX,data[i][1],data[i][0],data[i][1]);
            if ((d1 > 0 && d2 > 0) || (d1 < 0 && d2 < 0)/*|| (d3 < 0 && d4 < 0)|| (d3 < 0 && d4 < 0)*/) {
            }
            else{
                count++;
            }
        }/*
        for (let j = 0; j < a.length; j++){
            d1 = (bVariable[j] * minPointX) + (aVariable[j] * data[i][0]) + cVariable[j];
            d2 = (bVariable[j] * data[i][1]) + (aVariable[j] * data[i][0]) + cVariable[j];
            //console.log(d1);
            //console.log(d2);
            console.log(minPointX,data[i][1],data[i][0],data[i][1]);
            if ((d1 > 0 && d2 > 0) || (d1 < 0 && d2 < 0)) {
            }
            else{
                count++;
            }
        }*/
        if (count % 2 == 0){
            coincidentMap.push(data[i]);
        }
    }
}



//d1 = (a1 * v2x1) + (b1 * v2y1) + c1;
//d2 = (a1 * v2x2) + (b1 * v2y2) + c1;










function insidePoly(poly, pointx, pointy) {
    var i, j;
    var inside = false;
    for (i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        if(((poly[i].y > pointy) != (poly[j].y > pointy)) && (pointx < (poly[j].x-poly[i].x) * (pointy-poly[i].y) / (poly[j].y-poly[i].y) + poly[i].x) ) inside = true;
    }
    return inside;
}

function pointIsInPoly(p, polygon) {
    var isInside = false;
    var minX = polygon[0].x, maxX = polygon[0].x;
    var minY = polygon[0].y, maxY = polygon[0].y;
    for (var n = 1; n < polygon.length; n++) {
        var q = polygon[n];
        minX = Math.min(q.x, minX);
        maxX = Math.max(q.x, maxX);
        minY = Math.min(q.y, minY);
        maxY = Math.max(q.y, maxY);
    }data[i][0]

    if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
        return false;
    }

    var i = 0, j = polygon.length - 1;
    for (i, j; i < polygon.length; j = i++) {
        if ( (polygon[i].y > p.y) != (polygon[j].y > p.y) &&
                p.x < (polygon[j].x - polygon[i].x) * (p.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x ) {
            isInside = !isInside;
        }
    }

    return isInside;
}
let results = [];
for (let i = 0; i < data.length; i++ ){
//result = pointIsInPoly(data[i], loft);
result = insidePoly(loft, data[i][0], data[i][1]);
if (result != false){
    results.push(data[i]);
}
//console.log(result);
}
/*
let anomalyLat;
let anomalyLong;
for (let i = 0; i < data.length -1; i++){
    anomalyLat = ((data[i][0] - data[i+1][0])*1000);
    anomalyLong = ((data[i][1] - data[i+1][1])*1000);
    if ((anomalyLat > 2 || anomalyLat < -2) || (anomalyLong > 2 || anomalyLong < -2)){
        data.pop(i+1);
    }
    differenceBetweenLat.push(((data[i][0] - data[i+1][0])*1000)>3);
    differenceBetweenLong.push(((data[i][1] - data[i+1][1])*1000)>3);
*/
//console.log(data);
fs.writeFileSync("./NewMaps/newMap1.json",JSON.stringify(coincidentMap));