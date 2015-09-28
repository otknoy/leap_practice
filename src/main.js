var Leap = require('leapjs');
var Sketch = require('./sketch.js');

var sketch = new Sketch('sketch');

Leap.loop({enableGestures: true}, function(frame){
    if(frame.hands.length <= 0){
	return;
    }

    var hand = frame.hands[0];
    var finger = hand.indexFinger;

    var point = {
	x: finger.tipPosition[0],
	y: finger.tipPosition[1],
	z: finger.tipPosition[2]
    };

    sketch.drawCircle(point.x, point.y);
});
