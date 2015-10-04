
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
var points_x = [];
var points_y = [];
var points_z = [];

var xs =[-33.3692,-34.1788,-34.4417,-34.8203,-34.5917,-34.5219,-34.4015,-34.3309,-34.4048,-34.5075,-34.6147,-35.0227,-35.1047,-35.2801,-35.4015,-35.5328,-35.5893,-35.6283,-35.6652,-35.6768,-35.7007,-35.7293,-35.7554,-35.7871,-35.8259,-35.9541,-36.0408,-36.0794,-36.1152,-36.2132,-36.2771,-36.3277,-36.3826,-36.427,-36.4656,-36.514,-36.5559,-36.5745,-36.585,-36.5586,-36.5307,-36.4988,-36.4818,-36.4375,-36.4131,-36.3916,-36.3699,-36.3615,-36.3477,-36.34,-36.3494,-36.3605,-36.3941,-36.4496,-36.6187,-36.6946,-36.7451,-36.7669,-36.8017,-36.8303,-36.8342,-36.832,-36.8082,-36.6283,-36.3038,-35.7529,-34.9079,-31.9454,-29.7313,-28.5739,-24.4652,-21.3266,-19.633,-15.7123,-13.8886,-3.96746,-1.64308,5.23853,11.9302,13.0928,21.3853,21.3853,24.5002,28.3593,3];
	

var isDrawing = false;
var isRecording = false;




Leap.loop({enableGestures: true}, function(frame){
    if(frame.hands.length <= 0){
	return;
    }
    
   
    if(isRecording){
	console.log("key tapped!!!");

	if(!isDrawing){
	    console.log("start gesture");
	    points = [];
	    sketch.setStrokeStyle(drawColor);
	   
	}else{
	    console.log("end gesture");
//	    console.log(points);
	    for (var j in points) {
		var points_time = points[j];
		//console.log(points_time);
//		console.log("points_time.x" + points_time.x);
		points_x.push(points_time.x);
		points_y.push(points_time.y);
		points_z.push(points_time.z);
//		console.log(points_x);
		
	    }
	    sketch.setStrokeStyle(showColor);

//	    console.log("points_x:"+ points_x);
//	    console.log(xs);
	    var cost = dtw.compute(points_x, xs);
	    var path = dtw.path();
	    console.log("cost:"+ cost);
	    console.log("path:"+ path);
	    
	    
	}

	isDrawing = !isDrawing;
	sketch.clear();
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

// function keyTapped(frame){
//     var gestures = frame.gestures;
//     for (var i = 0; i < gestures.length; i++){
// 	if(gestures[i].type == "keyTap"){
// 	    return true;
// 	}
//     }
//     return false;
// }

function recordFinger(){
    isRecording = !isRecording;
}    

$('#rec-button').click(recordFinger);
