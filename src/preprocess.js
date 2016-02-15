var Preprocess = {};

Preprocess.normalize = function(value, min, max) {
    return (value - min) / (max - min);
};

Preprocess.normalizeArray = function(array, min, max) {
    var narray = [];
    for (var i = 0; i < array.length; i++) {
	var nv = Preprocess.normalize(array[i], min, max);
	narray.push(nv);
    }
    return narray;
};

Preprocess.normalizeXYZArray = function(array, min, max) {
    var narray = [];
    for (var i = 0; i < array.length; i++) {
	var p = array[i];
	var np = {
	    x: Preprocess.normalize(p.x, min, max),
	    y: Preprocess.normalize(p.y, min, max),
	    z: Preprocess.normalize(p.z, min, max)
	};
	narray.push(np);
    }
    return narray;
};


// 3次元時系列データの変移を求める関数
// 1次元時系列データを返す
Preprocess.changeOfDistance = function(ts) {
    var n = ts.length - 1;
    var d = [];
    for (var i = 0; i < n; i++) {
	var x = Math.pow(ts[i+1].x - ts[i].x, 2);
	var y = Math.pow(ts[i+1].y - ts[i].y, 2);
	var z = Math.pow(ts[i+1].z - ts[i].z, 2);
	d.push(Math.sqrt(x + y + z));
    }
    return d;
};

// 1次元時系列データをその最小値から最大値の間の値に正規化する
Preprocess.temporalNormalize = function(ts) {
    var max = Math.max.apply(null, ts);
    var min = Math.min.apply(null, ts);
    
    if (min == max) {
	// create a '0.5' filled array
	var ret = Array.apply(null, Array(ts.length)).map(Number.prototype.valueOf, 0.5);
	return ret;
    }

    return Preprocess.normalizeArray(ts, min, max);
};

// 3次元時系列データをその最小値から最大値の間に正規化する
Preprocess.spatialNormalize = function(ts) {
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

    return Preprocess.normalizeXYZArray(ts, min, max);
};

module.exports = Preprocess;
