var DTW = require('dtw');
var dtw = new DTW();
var $ = require('jquery');
var Leap = require('leapjs');
var Sketch = require('./sketch.js');
var sketch = new Sketch('sketch');
var point = (0, 0, 0);
var points = [];
var ts =[
	{"x": 1, "y": 0, "z": 0},
	{"x": 2, "y": 0, "z": 0},
	{"x": 3, "y": 0, "z": 0},
	{"x": 4, "y": 0, "z": 0},
	{"x": 5, "y": 0, "z": 0}
];

var isDrawing = false;
var drawColor = '#000080';




Leap.loop({enableGestures: true}, function(frame){
    if(frame.hands.length <= 0){
	return;
    }
    
    
    if(keyTapped(frame)){
	console.log("key tapped!!!");
	if(!isDrawing){
	    console.log("start gesture");
	    points = [];
	   
	}else{
	    console.log("end gesture");
	    console.log(points);

	    for (var i = 0; i < points.length; i++) {
		var cost = dtw.compute(points[i], ts[i]);
		var path = dtw.path();
		console.log("hey");
	}
	    
	}

	isDrawing = !isDrawing;

    }

    var hand = frame.hands[0];
    var finger = hand.indexFinger;
    point = getFingertip(finger);
    points.push(point);
    sketch.drawCircle(point.x, -point.y);
   
});



function getFingertip(finger){
    var point = {"x": finger.tipPosition[0],
		 "y": finger.tipPosition[1],
		 "z": finger.tipPosition[2]
		};
    return point;
}

function keyTapped(frame){
    var gestures = frame.gestures;
    for (var i = 0; i < gestures.length; i++){
	if(gestures[i].type == "keyTap"){
	    return true;
	}
    }
    return false;
}
