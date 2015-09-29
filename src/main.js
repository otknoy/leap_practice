var Leap = require('leapjs');
var Sketch = require('./sketch.js');
var sketch = new Sketch('sketch');
var point = (0, 0, 0);
var points = [];
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
	    sketch.clear();
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
