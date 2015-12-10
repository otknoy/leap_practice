// value を min から max で正規化
// processing の map(value, min, max, 0, 1) と同じと考えればよし
//空間的類似度のための正規化
function normalize(value, min, max) {
    return (value - min) / (max - min);
};

// points を min から max で正規化
function normalizePoints(points) {
    var d = points.map(function(d) { return [d.x, d.y, d.z]; });
    var ary = Array.prototype.concat.apply([], d);
    var min = Math.min.apply(null, ary);
    var max = Math.max.apply(null, ary);

    var npoints = [];
    for (var i = 0; i < points.length; i++) {
	var p = points[i];
	var np = {
	    x: normalize(p.x, min, max),
	    y: normalize(p.y, min, max),
	    z: normalize(p.z, min, max)
	};

	npoints.push(np);
    }

    return npoints;
}

function clear(data){
    var n = data.length;
    var d = [];
    for (var i = 0; i < n; i++) {
	d.push(0);
    }
    return d;
}


function changeOfDistance(data) {
    var n = data.length - 1;
    var d = [];
    for (var i = 0; i < n; i++) {
	var x = Math.pow(data[i+1].x - data[i].x, 2);
	var y = Math.pow(data[i+1].y - data[i].y, 2);
	var z = Math.pow(data[i+1].z - data[i].z, 2);
	d.push(Math.sqrt(x + y + z));
    }
    return d;
}


console.log('points');
var points = [
    {x: 1, y: 2, z: 0},
    {x: 5, y: 5, z: 0},
    {x: 10, y: 20, z: 0},
    {x: 14, y: 29, z: 0}   
];
console.log(points);
var dpoints = changeOfDistance(points);
console.log(dpoints);

// console.log('Convert to 2 dimensional array');
// var d = dpoints.map(function(d) { return [d.x, d.y, d.z]; });
// console.log(d);
// console.log();

// console.log('Flatten');
// d = Array.prototype.concat.apply([], d);
// console.log(d);
// console.log();

// console.log('min');
// var min = Math.min.apply(null, d);
// console.log(min);
// console.log();

// console.log('max');
// var max = Math.max.apply(null, d);
// console.log(max);
// console.log();

// console.log('Normalize points');
// var normalizedPoints = normalizePoints(dpoints);
// console.log(normalizedPoints);
// console.log();

//時間的類似度のための正規化
function timeNormalize(array) {
    var max = Math.max.apply(null, array);
    var min = Math.min.apply(null, array);

    var narray = [];
    for (var i = 0; i < array.length; i++) {
	var nv = (array[i] - min) / (max - min);
	narray.push(nv);
    }
    return narray;
};

var npoints = timeNormalize(dpoints);
console.log("npoints"+npoints);

function extractAxis(points, axis) {
    return points.map(function(e) { return e[axis]; });
}
