var DTW = require('dtw');
var dtw = new DTW();
var $ = require('jquery');
var Leap = require('leapjs');
var Sketch = require('./sketch.js');
var showColor = '#87ceeb';
var drawColor = '#000080';
var sketch = new Sketch('sketch');
sketch.setStrokeStyle(showColor);
var point = (0, 0, 0);
var points = [];
var point_x = 0;
var points_x = [];
var points_y = [];
var points_z = [];

var xs =[1,2,3,4,5,6,7,8,9,10];

var isDrawing = false;





Leap.loop({enableGestures: true}, function(frame){
    if(frame.hands.length <= 0){
	return;
    }
    
   
    if(keyTapped(frame)){
	console.log("key tapped!!!");

	if(!isDrawing){
	    console.log("start gesture");
	    points = [];
	    sketch.setStrokeStyle(drawColor);
	   
	}else{
	    console.log("end gesture");
	    console.log(points);
	    console.log(points_x);
	    sketch.setStrokeStyle(showColor);

	    for (var i = 0; i < xs.length; i++) {
		var cost = dtw.compute(points_x[i], xs[i]);
		var path = dtw.path();
		console.log("hey");
	}
	    
	}

	isDrawing = !isDrawing;
	sketch.clear();
    }

    var hand = frame.hands[0];
    var finger = hand.indexFinger;
    point = getFingertip(finger);
    points.push(point);
    point_x = point.x;
    points_x.push(point_x);
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
