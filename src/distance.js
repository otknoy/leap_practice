var LinearInterpolation = require('./LinearInterpolation.js');
var DTW = require('./dtw.js');

var Distance = {};


function normalize(value, min, max) {
    return (value - min) / (max - min);
}

function normalizeArray(array, min, max) {
    var narray = [];
    for (var i = 0; i < array.length; i++) {
	var nv = normalize(array[i], min, max);
	narray.push(nv);
    }
    return narray;
}

function normalizeXYZArray(array, min, max) {
    var narray = [];
    for (var i = 0; i < array.length; i++) {
	var p = array[i];
	var np = {
	    x: normalize(p.x, min, max),
	    y: normalize(p.y, min, max),
	    z: normalize(p.z, min, max)
	};
	narray.push(np);
    }
    return narray;
}

// 1次元の点同士のユークリッド距離を求める関数
// 1次元の場合のユークリッド距離は差の絶対値に等しい
function distance1D(p1, p2) {
    var d = Math.abs(p1 - p2);
    return d;
};


// 3次元時系列データの変移を求める関数
// 1次元時系列データを返す
function changeOfDistance(ts) {
    var n = ts.length - 1;
    var d = [];
    for (var i = 0; i < n; i++) {
	var x = Math.pow(ts[i+1].x - ts[i].x, 2);
	var y = Math.pow(ts[i+1].y - ts[i].y, 2);
	var z = Math.pow(ts[i+1].z - ts[i].z, 2);
	d.push(Math.sqrt(x + y + z));
    }
    return d;
}

// 1次元時系列データをその最小値から最大値の間の値に正規化する
function temporalNormalize(ts) {
    var max = Math.max.apply(null, ts);
    var min = Math.min.apply(null, ts);
    
    if (min == max) {
	// create a '0.5' filled array
	var ret = Array.apply(null, Array(ts.length)).map(Number.prototype.valueOf, 0.5);
	return ret;
    }

    return normalizeArray(ts, min, max);
}

// 時間的類似度を求めるための前処理
function temporalPreprocess(ts) {
    // linear interpolation?

    // change of distance
    var ts_cod = changeOfDistance(ts);

    // normalize
    var ts_cod_n = temporalNormalize(ts_cod);

    return ts_cod_n;    
}

// 時間的類似度を求める関数
Distance.temporalDistance = function(ts1, ts2) {
    var ts1_p = temporalPreprocess(ts1);
    var ts2_p = temporalPreprocess(ts2);

    // dtw
    var d =  DTW.distance(ts1_p, ts2_p, distance1D, 30);
    return d;
};


// 3次元時系列データをその最小値から最大値の間に正規化する
function spatialNormalize(ts) {
    var d = ts.map(function(d) { return [d.x, d.y, d.z]; });
    var ary = Array.prototype.concat.apply([], d);
    var min = Math.min.apply(null, ary);
    var max = Math.max.apply(null, ary);

    if (min == max) {
	// create a '0.5' filled xyz array
	var ret = Array.apply(null, Array(ts.length)).map(function() {
	    return {x: 0.5, y: 0.5, z: 0.5};
	});
	return ret;
    }

    return normalizeXYZArray(ts, min, max);
}

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

// 空間的類似度を求める関数
Distance.spatialDistance = function(ts1, ts2) {
    var ts1_p = spatialPreprocess(ts1);
    var ts2_p = spatialPreprocess(ts2);

    // dtw x-axis
    var xdist = DTW.distance(ts1_p.x, ts2_p.x, distance1D, 30);

    // dtw y-axis
    var ydist = DTW.distance(ts1_p.y, ts2_p.y, distance1D, 30);
    
    return {"x": xdist, "y": ydist};
};


// conbination of temporal and spatial distance
Distance.tsDist = function(ts1, ts2) {
    var tdist = Distance.temporalDistance(ts1, ts2);
    var sdist = Distance.spatialDistance(ts1, ts2);

    var score = tdist * sdist.x * sdist.y;
    return score;
};

module.exports = Distance;
