var LinearInterpolation = require('./LinearInterpolation.js');
var DTW = require('./dtw.js');

// 一次元の場合のユークリッド距離は差の絶対値に等しい
function distance1D(p1, p2) {
    var d = Math.abs(p1 - p2);
    return d;
};

// 時間的類似度を求めるための前処理
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

    // linear interpolation?

    // change of distance
    var ts_cod = changeOfDistance(ts);

    // normalize
    var ts_cod_n = timeNormalize(ts_cod);

    return ts_cod_n;    
}

// 時間的類似度を求める関数
var temporalDistance = function(ts1, ts2) {
    var ts1_p = temporalPreprocess(ts1);
    var ts2_p = temporalPreprocess(ts2);

    // dtw
    var d =  DTW.distance(ts1_p, ts2_p, distance1D, 30);
    return d;
};

// 空間的類似度を求めるための前処理
function spatialPreprocess(ts) {
    function ignoreZAxis(ts) {
	var xy = [];
	for (var i = 0; i < ts.length; i++) {
	    // set z-axis to 0
	    var d = {"x": ts[i].x, "y": ts[i].y, "z": 0};
	    xy.push(d);
	}
	return xy;
    }

    function spatialNormalize(ts) {
	function normalize(value, min, max) {
	    if(min == max){
		var d = 0.5;
	    }else{
		d = (value - min) / (max - min);
	    }
	    return d;
	};

	var d = ts.map(function(d) { return [d.x, d.y, d.z]; });
	var ary = Array.prototype.concat.apply([], d);
	var min = Math.min.apply(null, ary);
	var max = Math.max.apply(null, ary);

	var npoints = [];
	for (var i = 0; i < ts.length; i++) {
	    var p = ts[i];
	    var np = {
		x: normalize(p.x, min, max),
		y: normalize(p.y, min, max),
		z: normalize(p.z, min, max)
	    };

	    npoints.push(np);
	}

	return npoints;
    }

    // linear interpolation
    var ts_li = LinearInterpolation.compute(ts);

    // ignore z-axis
    var ts_li_z0 = ignoreZAxis(ts_li);
    
    // normalize
    var ts_li_z0_n = spatialNormalize(ts_li_z0);

    // get x-axis
    var ts_x = ts_li_z0_n.map(function(e) { return e.x; });

    // get y-axis
    var ts_y = ts_li_z0_n.map(function(e) { return e.y; });

    return {"x": ts_x, "y": ts_y};
}

var spatialDistance = function(ts1, ts2) {
    var ts1_p = spatialPreprocess(ts1);
    var ts2_p = spatialPreprocess(ts2);

    // dtw x-axis
    var xdist = DTW.distance(ts1_p.x, ts2_p.x, distance1D, 30);

    // dtw y-axis
    var ydist = DTW.distance(ts1_p.y, ts2_p.y, distance1D, 30);
    
    return {"x": xdist, "y": ydist};
};


// test
var samples = require('./test/data.json');
var query = samples[0];

var ts1 = query.points;
console.log(ts1.length);

for (var i = 0; i < samples.length; i++) {
    var ts2 = samples[i].points;

    // temporal
    var tdist = temporalDistance(ts1, ts2);

    // spatial
    var sdist = spatialDistance(ts1, ts2);

    console.log("temporal distance: " + tdist);
    console.log("spatial distance: {x: " + sdist.x + ", y: " + sdist.y + "}");
}
