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
var result = [];

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

// function changeOfPosition(data) {//ここの関数が要らない
//     var n = data.length - 1;
//     var d = [];
//     for (var i = 0; i < n; i++) {
// 	d.push({
// 	    x: data[i+1].x - data[i].x,
// 	    y: data[i+1].y - data[i].y,
// 	    z: data[i+1].z - data[i].z
// 	});
//     }
//     return d;
// }

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

function timeNormalize(array) {
    var max = Math.max.apply(null, array);
    var min = Math.min.apply(null, array);

    var narray = [];
    for (var i = 0; i < array.length; i++) {
	var nv = (array[i] - min) / (max - min);
	narray.push(nv);
    }
    return narray;
};

function extractAxis(points, axis) {
    return points.map(function(e) { return e[axis]; });
}

function searchTimeSeries(tsQuery) {
    // スコアの計算
    // 全データ (db) との類似度を求める
    var n = samples.length;
    var score = [];

    //時間的類似度を測る
    //座標間の距離を測る
    var ts_Qtd = changeOfDistance(tsQuery);
    var ts_Qtn = timeNormalize(ts_Qtd);
    // var ts_QX = extractAxis(ts_Qn, 'x');
    // var ts_QY = extractAxis(ts_Qn, 'y');
    // var ts_QZ = extractAxis(ts_Qn, 'z');
    // var ts_QZc = clear(ts_QZ);

    // var ts_Q = setNormalizeArray(ts_QX, ts_QY, ts_QZc);
    console.log("ts_Qtn");
    console.log(ts_Qtn);

    for (var i = 0; i < n; i++){

	var ts_Std = changeOfDistance(samples[i].points);
	var ts_Stn = timeNormalize(ts_Std);
	console.log(ts_Stn);
	// var ts_SX = extractAxis(ts_Sn, 'x');
	// var ts_SY = extractAxis(ts_Sn, 'y');
	// var ts_SZ = extractAxis(ts_Sn, 'z');
	// var ts_SZc = clear(ts_SZ);
	
	// var ts_S = setNormalizeArray(ts_SX, ts_SY, ts_SZc);
	//console.log("ts_Stn");
	//console.log(ts_Stn);
	
	var d = DTW.distance(ts_Qtn, ts_Stn, distance, 30);
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
    //console.log(score);
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

    } else {
	console.log('begin');
	$("#output").empty();

    }
    isRecording = !isRecording;
}

function searchData(){
    if(isRecording){
	isRecording = false;
	console.log('search start');
	result =searchTimeSeries(points);
	//console.log(result);
	$.each(result, function(index, item){

	    var imgPath = './img/' + item.name + '.png';
	    var img = '<img src="' + imgPath + '">';
  
	    $("#output").append(
		$("<div/>").attr('class', 'view').append(img),
		$("<div/>").attr('class', 'result').
		    append('<p/>').
		    append(item.name).
		    append('<br/>').
		    append(item.score)
	    ).trigger('create').append('<hr>');
	    $('.view').show(img);
		
	});
	console.log('search end');

    }else{
	console.log("nothing");
    }
}

$('#rec-button').click(recordFinger);
$('#search-button').click(searchData);
