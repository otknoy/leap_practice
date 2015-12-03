var DTW = require('../dtw');

function normalize(value, min, max) {
    return (value - min) / (max - min);
};

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


function distFunc(p1, p2) {
    var x = Math.pow(p1.x - p2.x, 2);
    var y = Math.pow(p1.y - p2.y, 2);
    var z = Math.pow(p1.z - p2.z, 2);
    var d = Math.sqrt(x + y + z);
    return d;
};

// baseline
function methodA(a, b) {
    var d = DTW.distance(a, b, distFunc);
    return d;
}

// normalize
function methodB(a, b) {
    var na = normalizePoints(a);
    var nb = normalizePoints(b);

    var d = DTW.distance(na, nb, distFunc);
    return d;
}

// experiment
function experiment(method, query, data) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
	var cost = method(query.points, data[i].points);
	
	result.push({cost: cost, data: data[i]});
    }
    
    return result.sort(function(a, b) { return a.cost - b.cost; });
}


var data = require('./samples.json');
var query = data[0];

var a_result = experiment(methodA, query, data);
var b_result = experiment(methodB, query, data);

console.log(a_result.map(function(d) { return d.data.name; }));
console.log(b_result.map(function(d) { return d.data.name; }));