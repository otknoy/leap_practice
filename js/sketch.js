function sketchProc(processing) {
    var count;
    processing.setup = function(){
	processing.size(600, 600, processing.P3D);
	processing.fill(255);
	processing.stroke(255);
	count = 0;
    };


    processing.draw = function() {
	if (points.length <= 0) {
	    processing.background(0);

	    return;
	}

	drawPoint(points[count++]);
	if(points.length <= count){
	    count = 0;
	    processing.background(0);
	}
    };

    function drawPoint(point){
	processing.pushMatrix();
	processing.translate(point.x, point.y, point.z);
	processing.sphere(12);
	processing.popMatrix();
    }
}

var canvas = document.getElementById("sketch");
// attaching the sketchProc function to the canvas
var p = new Processing(canvas, sketchProc);
// p.exit(); to detach it
