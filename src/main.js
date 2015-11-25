var DTW = require('./dtw.js');
var $ = require('jquery');
var Leap = require('leapjs');
var Sketch = require('./sketch.js');
var showColor = '#87ceeb';
var drawColor = '#000080';
var sketch = new Sketch('sketch');
var samples = require('./samples.json');

var points = [];
var isRecording = false;

Leap.loop({enableGestures: true}, function(frame){
    if(frame.hands.length <= 0){
	return;
    }

    var hand = frame.hands[0];
    var finger = hand.indexFinger;
    var point = getFingertip(finger);

    if (!isRecording) {
	sketch.clear();
	points = [];
	sketch.setStrokeStyle(showColor);
	sketch.drawCircle(point.x, -point.y);

	return;
    }

    sketch.setStrokeStyle(drawColor);
    sketch.drawCircle(point.x, -point.y);

    points.push(point);
});

function getFingertip(finger){
    var point = {"x": finger.tipPosition[0],
		 "y": finger.tipPosition[1],
		 "z": finger.tipPosition[2]
		};
    return point;
}

function changeOfPosition(data) {
    var n = data.length - 1;
    var d = [];
    for (var i = 0; i < n; i++) {
	d.push({
	    x: data[i+1].x - data[i].x,
	    y: data[i+1].y - data[i].y,
	    z: data[i+1].z - data[i].z
	});
    }
    return d;
}

function zClear(data){
    var n = data.length;
    for (var i = 0; i < n; i++) {
	data[i].z = 0;
    }    
}

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

function setNormalizeArray(arrayX,arrayY,arrayZ){
    var arrayN =[];
    for (var i = 0; i < arrayX.length; i++) {
	arrayN.push({
	    x: arrayX[i],
	    y: arrayY[i],
	    z: arrayZ[i]
	});
    }
    return arrayN;
}

function extractAxis(points, axis) {
    return points.map(function(e) { return e[axis]; });
}

function searchTimeSeries(tsQuery) {
    // スコアの計算
    // 全データ (db) との類似度を求める
    var n = samples.length;
    var score = [];
    console.log(tsQuery);
    zClear(tsQuery);
    console.log(tsQuery);
    var ts_Q = changeOfPosition(tsQuery);
    var ts_QX = extractAxis(ts_Q, 'x');
    var ts_QY = extractAxis(ts_Q, 'y');

    normalize(ts_QX);
    normalize(ts_QY);
    
    for (var i = 0; i < n; i++){
	zClear(samples[i].points);
	var ts_S = changeOfPosition(samples[i].points);
	var d = DTW.distance(ts_Q, ts_S, distance, 10);
	score.push({
	    name:samples[i].name,
	    score:d
	});
    }
    score.sort(function(a,b){
	if(a.score < b.score) return -1;
	if(a.score > b.score) return 1;
	return 0;
    });    
    console.log(score);
    return score;
};

function distance(p1, p2) {
    var x = Math.pow(p1.x - p2.x, 2);
    var y = Math.pow(p1.y - p2.y, 2);
    var z = Math.pow(p1.z - p2.z, 2);
    var d = Math.sqrt(x + y + z);
    return d;
};

function recordFinger(){
    if (isRecording) {
	console.log('end');
	searchTimeSeries(points);

    } else {
	console.log('begin');
    }

    isRecording = !isRecording;
}    

$('#rec-button').click(recordFinger);
