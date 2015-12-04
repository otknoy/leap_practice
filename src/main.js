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
var isSearching = false;

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

function clear(data){
    var n = data.length;
    var d = [];
    for (var i = 0; i < n; i++) {
	d.push(0);
    }
    return d;
}



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


function extractAxis(points, axis) {
    return points.map(function(e) { return e[axis]; });
}

function searchTimeSeries(tsQuery) {
    // スコアの計算
    // 全データ (db) との類似度を求める
    var n = samples.length;
    var score = [];

    var ts_Qd = changeOfPosition(tsQuery);
    var ts_Qn = normalizePoints(ts_Qd);
    var ts_QX = extractAxis(ts_Qn, 'x');
    var ts_QY = extractAxis(ts_Qn, 'y');
    var ts_QZ = extractAxis(ts_Qn, 'z');
    var ts_QZc = clear(ts_QZ);

    var ts_Q = setNormalizeArray(ts_QX, ts_QY, ts_QZc);
    console.log(ts_Q);

    for (var i = 0; i < n; i++){

	var ts_Sd = changeOfPosition(samples[i].points);
	var ts_Sn = normalizePoints(ts_Sd);
	var ts_SX = extractAxis(ts_Sn, 'x');
	var ts_SY = extractAxis(ts_Sn, 'y');
	var ts_SZ = extractAxis(ts_Sn, 'z');
	var ts_SZc = clear(ts_SZ);
	
	var ts_S = setNormalizeArray(ts_SX, ts_SY, ts_SZc);
	
	var d = DTW.distance(ts_Q, ts_S, distance, 30);
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
//	searchTimeSeries(points);

    } else {
	console.log('begin');
    }
    isRecording = !isRecording;
}    

$('#rec-button').click(recordFinger);
$('#search-button').click(function(){
    isRecording = false,
    searchTimeSeries(points),
    $('#output').html('検索結果');
});
