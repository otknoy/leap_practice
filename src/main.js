var Leap = require('leapjs');
var Sketch = require('./sketch.js');
var sketch = new Sketch('sketch');
var point = (0, 0, 0);
var points = [];
//var isDrawing = false;

Leap.loop({enableGestures: true}, function(frame){
    if(frame.hands.length <= 0){
	return;
    }

    var hand = frame.hands[0];
    var finger = hand.indexFinger;
    point = getFingertip(finger);
    points.push(point);

    sketch.drawCircle(point.x, point.y);
    
});

function getFingertip(finger){
    var point = {"x": finger.tipPosition[0],
		 "y": finger.tipPosition[1],
		 "z": finger.tipPosition[2]
		};
    return point;
}

console.log(points);
