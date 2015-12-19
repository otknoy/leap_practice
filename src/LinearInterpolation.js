var LinearInterpolation = {};

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

function sum(arr) {
    var sum = 0;
    for (var i = 0, len = arr.length; i < len; ++i) {
        sum += arr[i];
    };
    return sum;
};

function decidePointZone(data, lineLength, totalLength) {
    var n = data.length - 1;
    var d = [];
    var all_point = 200;

    for (var i = 0; i < n; i++) {
	var insert = (all_point - 1) * lineLength[i]/totalLength;
	if(insert > 0){
	    d.push(parseInt(insert - 1));
	}
    }
    return d;
}

function createPoints(data, addpoint){
    var n = data.length - 1;
    var d = [];
    for(var i = 0; i< n; i++){
	var pointNum = addpoint[i];
	d.push({
	    x: data[i].x,
	    y: data[i].y,
	    z: data[i].z
	});
	for(var j = 0; j < pointNum; j++){
	    d.push({
		x: data[i].x + j*(data[i+1].x - data[i].x)/(pointNum + 1),
		y: data[i].y + j*(data[i+1].y - data[i].y)/(pointNum + 1),
		z: data[i].z + j*(data[i+1].z - data[i].z)/(pointNum + 1)
	    });
	}
    }
    return d;
}

LinearInterpolation.compute = function(points) {
    // 座標間の距離 (points[i] から points[i+1] の線の長さ) を求める
    var lineLength = changeOfDistance(points);
    // 線の長さの合計
    var totalLineLength = sum(lineLength);

    // 補完するための点が何点あるのかを数える
    var addPoints = decidePointZone(points, lineLength, totalLineLength);

    // 線形補間して、配列に格納
    var intPoints = createPoints(points, addPoints);

    return intPoints;
};

module.exports = LinearInterpolation;
