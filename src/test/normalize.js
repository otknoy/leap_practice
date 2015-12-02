// array: array of number
// e.g. [1, 2, 3]
// function normalize(array) {
//     var max = Math.max.apply(null, array);
//     var min = Math.min.apply(null, array);

//     var narray = [];
//     for (var i = 0; i < array.length; i++) {
// 	var nv = (array[i] - min) / (max - min);
// 	narray.push(nv);
//     }
//     return narray;
// };
function normalize(arrayX, arrayY) {
    var maxX = Math.max.apply(null, arrayX);
    var minX = Math.min.apply(null, arrayX);

    var maxY = Math.max.apply(null, arrayY);
    var minY = Math.min.apply(null, arrayY);
    var max;
    if((maxX - minX) > (maxY - minY)){
	max = maxX - minX;
    }else{
	max = maxY - minY;
    }
    
    var nxarray = [];
    for (var i = 0; i < arrayX.length; i++) {
	var nvx = (arrayX[i] - minX) / max;
	nxarray.push(nvx);
    }
    
    var nyarray =[];
    for (var j = 0; j < arrayY.length; j++) {
	var nvy = (arrayY[i] - minY) / max;
	nxarray.push(nvy);
    }    
    
    return nxarray, nyarray;
};

function extractAxis(points, axis) {
    return points.map(function(e) { return e[axis]; });
}


var points = [
    {x: 1, y: 2, z: 3},
    {x: 10, y: 20, z: 30},
    {x: 100, y: 200, z: 300}
];


console.log(points);

var pointsX = extractAxis(points, 'x');
console.log(pointsX);

var pointsY = extractAxis(points, 'y');
console.log(pointsY);
var normalized = normalize(pointsX, pointsY);
console.log(normalized);



// var normalizedY = normalize(pointsY);
// console.log(normalizedY);


// var normalizedZ = normalize(pointsZ);
// console.log(normalizedZ);

function clear(data){
    var n = data.length;
    var d = [];
    for (var i = 0; i < n; i++) {
	d.push(0);
    }
    return d;
}
 var pointsZ = extractAxis(points, 'z');
 console.log(pointsZ);

var zclear = clear(pointsZ);

function setNormalizeArray(arrayX,arrayY,arrayZ){
    var arrayN =[];
    for (var i = 0; i < arrayX.length; i++) {
	arrayN.push({
	    x: arrayX[i],
	    y: arrayY[i],
	    z: arrayZ[i]
	});
    }
    return arrayN;
}

var ts_Q =setNormalizeArray(normalized,zclear);
console.log(ts_Q);
