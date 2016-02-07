var $ = require('jquery');
var Leap = require('leapjs');

var Distance = require('./distance.js');
var Sketch = require('./sketch.js');

var showColor = '#87ceeb';
var drawColor = '#000080';

var sketch = new Sketch('sketch');
// var samples = require('./samples.json');
var samples = require('./test/data.json');
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
    var point = {
	"x": finger.tipPosition[0],
	"y": finger.tipPosition[1],
	"z": finger.tipPosition[2]
    };
    return point;
}

function searchTimeSeries(tsQuery) {
    // スコアの計算
    // 全データ (db) との類似度を求める
    var n = samples.length;
    var score = [];

    for (var i = 0; i < n; i++){
	var target = samples[i].points;

	// var score = Distance.tsDist(tQuery, target)
	var tdist = Distance.temporalDistance(tsQuery, target);
	var sdist = Distance.spatialDistance(tsQuery, target);

	var td = tdist;
	var sdX = sdist.x;
	var sdY = sdist.y;
	score.push({
	    name: samples[i].name,
	    score: sdX*sdY*td,
	    score_s: sdX*sdY,
	    score_t: td,
	    // parseInt(0.7*(sdX*sdY)+0.3*td)
	    points: samples[i].points
	});
    }
    score.sort(function(a,b){
    	if(a.score < b.score) return -1;
    	if(a.score > b.score) return 1;
    	return 0;
    });    
    // console.log(score);
    return score;
};

function distance(p1, p2) {
    var p = Math.pow(p1 - p2, 2);
    var d = Math.sqrt(p);
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

// 指定した canvas 要素に時系列データをアニメーションで描く
// id: 時系列データを表示したい canvas 要素の id
// points: 時系列データ ([{x: 1, y: 2, z: 3}, ... ] のような配列)
function drawTimeSeriesData(id, points) {
    var cs  = document.getElementById(id);
    var ctx = cs.getContext('2d');

    var w = cs.width;
    var h = cs.height;
    
    // processing の map 関数と同じやつ
    function mapValue(value, start1, stop1, start2, stop2) {
	var ratio = (value - start1) / (stop1 - start1);
	return start2 + ratio * (stop2 - start2);
    }

    // 時系列データ points の i 番目の点を表示するためのカウンタ
    var i = 0;

    function render() {
	var p = points[i];
	var x = mapValue(p.x, -256, 256, 0, w);
	var y = mapValue(p.y, 0, 550, h, 0);

	ctx.clearRect(0, 0, w, h);

	ctx.strokeStyle = drawColor;
	ctx.beginPath();
	ctx.arc(x, y, 5, 0, Math.PI*2, false);
	ctx.stroke();
	// console.log('draw point');
	// console.log(x);
	// console.log(y);

	i++;
	if (points.length <= i) {
	    i = 0;
	}
    }
    setInterval(render, 1000/60.0);
}

function searchData(){
    if(isRecording){
	isRecording = false;
	console.log('search start');
	result = searchTimeSeries(points);
	console.log(result);
	$.each(result, function(index, item){
	    var imgPath = './img/' + item.name + '.png';
	    var img = '<img src="' + imgPath + '">';
  
	    $("#output").append(
		$("<div/>").attr('class', 'view').append(img),
		$("<div/>").attr('class', 'result').
		    append('<p>'+item.name+'</p>').
		    append('<br/>').
		    append("total score").
		    append('<br/>').
		    append(item.score).
		    append('<br/>').
		    append("spatial score").
		    append('<br/>').
		    append(item.score_s).
		    append('<br/>').
		    append("temporal score").
		    append('<br/>').
		    append(item.score_t)
	    ).trigger('create');
	    $('.view').show(img);

	    // 動的にキャンバスを作成
	    var $canvas = $('<canvas>').attr({
		id: 'canvas-' + item.name,
		width: 160,
		height: 160
	    });
	    // 任意の位置にキャンバスを追加
//	    $("#output").append($canvas);
	    $("#output").append(
		$("<div/>").attr('class', 'move').append($canvas)
	    ).trigger('create');
	    // 指定した id のキャンバスに points を描く
	    drawTimeSeriesData('canvas-' + item.name, item.points);
	});
	console.log('search end');
	console.log(points);

    }else{
	console.log("nothing");
    }
}

$('#rec-button').click(recordFinger);
$('#search-button').click(searchData);
