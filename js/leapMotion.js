var controller = new Leap.Controller({
    host: '127.0.0.1',
    port: 6437,
    enableGestures: true,
    frameEventName: 'animationFrame',
    useAllPlugins: true
});
controller.connect();


var points = [];
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
	}else{
	    console.log("end gesture");
	}

	isDrawing = !isDrawing;
    }

    var hand = frame.hands[0];
    var finger = hand.indexFinger;
    var point = getFingertip(finger);
    points.push(point);

    
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
    
