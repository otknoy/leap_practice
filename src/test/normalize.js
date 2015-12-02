// value を min から max で正規化
// processing の map(value, min, max, 0, 1) と同じと考えればよし
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


console.log('points');
var points = [
    {x: 1, y: 2, z: 3},
    {x: 10, y: 20, z: 30},
    {x: 100, y: 200, z: 300}
];
console.log(points);
console.log();

console.log('Convert to 2 dimensional array');
var d = points.map(function(d) { return [d.x, d.y, d.z]; });
console.log(d);
console.log();

console.log('Flatten');
d = Array.prototype.concat.apply([], d);
console.log(d);
console.log();

console.log('min');
var min = Math.min.apply(null, d);
console.log(min);
console.log();

console.log('max');
var max = Math.max.apply(null, d);
console.log(max);
console.log();

console.log('Normalize points');
var normalizedPoints = normalizePoints(points);
console.log(normalizedPoints);
console.log();
