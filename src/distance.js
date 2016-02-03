var LinearInterpolation = require('./LinearInterpolation.js');
var DTW = require('./dtw.js');
// var preprocess = require('./preprocess.js');

// 一次元の場合のユークリッド距離は差の絶対値に等しい
function distance1D(p1, p2) {
    var d = Math.abs(p1 - p2);
    return d;
};

function temporalPreprocess(ts) {
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

    function timeNormalize(array) {
	var max = Math.max.apply(null, array);
	var min = Math.min.apply(null, array);
	
	var narray = [];
	for (var i = 0; i < array.length; i++) {
	    if(min == max){
		var nv = 0.5;
	    }else{
		nv = (array[i] - min) / (max - min);
	    }
	    narray.push(nv);
	}
	return narray;
    }

    // change of distance
    var ts_cod = changeOfDistance(ts);

    // normalize
    var ts_cod_n = timeNormalize(ts_cod);

    return ts_cod_n;    
}


var temporalDistance = function(ts1, ts2) {
    var ts1_p = temporalPreprocess(ts1);
    var ts2_p = temporalPreprocess(ts2);

    // dtw
    var d =  DTW.distance(ts1_p, ts2_p, distance1D, 30);
    return d;
};

var spatialSimilarity = function(ts1, ts2) {
    function spatialPreprocess(ts) {
	// linear interpolation

	// ignore z-axis
	
	// normalize

	// get x-axis

	// get y-axis
    }


    // dtw x-axis


    // dtw y-axis
    

    return 0;
};


// test
var samples = require('./test/data.json');
var query = samples[0];

var ts1 = query.points;
console.log(ts1.length);

for (var i = 0; i < samples.length; i++) {
    var ts2 = samples[i].points;

    // temporal
    var d = temporalDistance(ts1, ts2);
    console.log(d);
    
}
