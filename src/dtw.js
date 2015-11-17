var DTW = {};

function createMatrix(n, m) { //2次元配列を作っているだけ
    var d = new Array(n);
    for (var i = 0; i < d.length; i++) {
	d[i] = new Array(m);
	for (var j = 0; j < d[i].length; j++) {
	    d[i][j] = 0;
	}
    }
    return d;
}

function createDtwMatrix(n, m) { //2次元配列の初期化
    var dtw = createMatrix(n, m);

    // init
    for (var i = 0; i < n; i++) {
	for (var j = 0; j < m; j++) {
	    dtw[i][j] = Number.MAX_VALUE;
	}
    }
    
    dtw[0][0] = 0;

    return dtw;
}

DTW.distance = function(ts1, ts2, distFunc, window) {
    var n = ts1.length;
    var m = ts2.length;
    var w = Math.max(window, Math.abs(n-m));
    var dtw = createDtwMatrix(n, m);

    for (var i = 1; i < n; i++) {
	for (var j = Math.max(1, i-w); j < Math.min(m, i+w); j++) {
	    var cost = distFunc(ts1[i-1], ts2[j-1]);
	    dtw[i][j] = cost + Math.min(dtw[i-1][j], dtw[i][j-1], dtw[i-1][j-1]);
	}
    }

    return dtw[n-1][m-1];
};

module.exports = DTW;
