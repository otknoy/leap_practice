var DTW = require('dtw');
var dtw = new DTW();
var $ = require('jquery');
var Leap = require('leapjs');
var Sketch = require('./sketch.js');
var sketch = new Sketch('sketch');
var point = (0, 0, 0);
var points = [];
var isDrawing = false;
var drawColor = '#000080';

var ts = [[1, 0, 0],
	  [2, 0, 0],
	  [3, 0, 0],
	  [4, 0, 0]];


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
	    
	}

	isDrawing = !isDrawing;

    }

    var hand = frame.hands[0];
    var finger = hand.indexFinger;
    point = getFingertip(finger);
    points.push(point);
    sketch.drawCircle(point.x, -point.y);
    useDTW(points);
});

function getFingertip(finger){
    var point = {"x": finger.tipPosition[0],
		 "y": finger.tipPosition[1],
		 "z": finger.tipPosition[2]
		};
    return point;
}

console.log(points);

function keyTapped(frame){
    var gestures = frame.gestures;
    for (var i = 0; i < gestures.length; i++){
	if(gestures[i].type == "keyTap"){
	    return true;
	}
    }
    return false;
}

function useDTW(points){
 for (var i = 0; i < ts.length; i++) {
	var cost = dtw.compute(points[i], ts[i]);
	var path = dtw.path();
	console.log("hey");
    }
    console.log("cost:"+ cost);
    console.log("path:"+ path);

}


