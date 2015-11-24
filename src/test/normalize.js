// array: array of number
// e.g. [1, 2, 3]
function normalize(array) {
    var max = Math.max.apply(null, array);
    var min = Math.min.apply(null, array);

    var narray = [];
    for (var i = 0; i < array.length; i++) {
	var nv = (array[i] - min) / (max - min);
	narray.push(nv);
    }
    return narray;
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

var normalized = normalize(pointsX);
console.log(normalized);


